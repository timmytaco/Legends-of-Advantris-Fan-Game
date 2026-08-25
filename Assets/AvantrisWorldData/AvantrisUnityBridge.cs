using System;
using System.Collections.Generic;
using UnityEngine;

namespace Avantris
{
    // =========================================================================
    // 1. DATA MODELS & JSON SERIALIZATION STRUCTURES
    // =========================================================================
    
    [Serializable]
    public class CharacterStats
    {
        public int strength = 10;
        public int dexterity = 10;
        public int constitution = 10;
        public int intelligence = 10;
        public int wisdom = 10;
        public int charisma = 10;
    }

    [Serializable]
    public class CharacterData
    {
        public string id;
        public string name;
        public string campaignId;
        public string race;
        public string charClass;
        public string background;
        public string quote;
        public CharacterStats stats;
        public bool isCustom;
    }

    [Serializable]
    public class LocationData
    {
        public string id;
        public string name;
        public string campaignId;
        public string description;
        public bool isCustom;
    }

    [Serializable]
    public class CampaignData
    {
        public string id;
        public string name;
        public string era;
        public string summary;
        public bool isCustom;
    }

    [Serializable]
    public class AvantrisWorldDatabase
    {
        public List<CampaignData> campaigns = new List<CampaignData>();
        public List<CharacterData> characters = new List<CharacterData>();
        public List<LocationData> locations = new List<LocationData>();
    }

    // =========================================================================
    // 2. DIALOGUE & D&D QUEST ENGINE DATA TYPES
    // =========================================================================
    
    public enum AbilityType { Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, None }
    public enum RollResult { CriticalFailure, Failure, Success, CriticalSuccess }

    [Serializable]
    public class QuestChoice
    {
        public string choiceText;
        public string targetNodeId;
        public AbilityType requiredCheck = AbilityType.None;
        public int difficultyClass = 10;
        public string successNodeId;
        public string failureNodeId;
    }

    [Serializable]
    public class QuestNode
    {
        public string id;
        public string title;
        public string dialogueText;
        public List<QuestChoice> choices = new List<QuestChoice>();
    }

    // =========================================================================
    // 3. MASTER CONTROLLER (MOVEMENT, COLLISION, ANIMATION, COMBAT, CLIMBING)
    // =========================================================================
    
    [RequireComponent(typeof(CharacterController))]
    public class AvantrisUnityBridge : MonoBehaviour
    {
        [Header("Data References")]
        public TextAsset worldJsonFile;
        public TextAsset episodesJsonFile;

        [Header("Movement & Physics")]
        public float walkSpeed = 3f;
        public float runSpeed = 6f;
        public float gravity = -9.81f;
        public float jumpHeight = 1.5f;
        public Transform cameraPivot;
        public float mouseSensitivity = 2f;

        [Header("Zelda Climbing Settings")]
        public float climbSpeed = 2f;
        public float climbCheckDistance = 0.5f;
        public float sphereRadius = 0.3f;
        public LayerMask climbableLayers;
        public float staminaMax = 100f;
        public float staminaClimbDrain = 12f;

        [Header("God of War Axe Settings")]
        public float throwForce = 35f;
        public float recallTime = 0.8f;
        public float axeRotationSpeed = 600f;
        public Rigidbody axeRigidbody;
        public Transform playerHandSocket;
        public Transform curveControlPoint;

        [Header("Animator Bindings")]
        public Animator animator;

        // Private movement states
        private CharacterController controller;
        private Vector3 velocity;
        private bool isGrounded;
        private float currentSpeed;
        private float cameraPitch = 0f;
        private bool controlsEnabled = true;

        // Private climbing states
        private bool isClimbing = false;
        private Vector3 wallNormal;
        private float currentStamina;

        // Private axe states
        private bool axeIsFlying = false;
        private bool axeIsRecalling = false;
        private float recallProgress = 0f;
        private Vector3 recallStartPos;

        // Private quest engine states
        private AvantrisWorldDatabase worldDatabase;
        private Dictionary<string, List<QuestNode>> campaignQuestTrees = new Dictionary<string, List<QuestNode>>();
        private QuestNode currentNode;
        private MonsterEncounter activeMonsterEncounter;

        [Header("3D D&D Turn-Based Grid Settings")]
        public GridCombatSystem combatSystem;
        public Transform monsterTransform;
        public bool isGridCombatActive = false;
        public int movementLimitPerTurn = 6;
        public string activeCharacterId = "gideon-coal";

        // Private 3D Grid states
        private Vector3 targetGridWorldPos;
        private bool isMovingToGridTile = false;
        private CharacterCombatState playerCombatState;
        private CharacterCombatState monsterCombatState;
        private int playerRemainingMovement = 6;
        private bool playerHasAction = true;
        private bool playerHasBonusAction = true;
        private bool playerHasFreeInteract = true;
        private bool playerHasReaction = true;
        private bool monsterHasReaction = true;
        private bool playerIsDodging = false;
        private bool playerIsDisengaged = false;
        private bool monsterIsDisengaged = false;

        [Header("Active Skill QTE System")]
        public QteType activeQteType = QteType.None;
        public float qteDuration = 1.5f;
        public float qteTimer = 0f;

        // Precision timing fields
        private float timingBarValue = 0f; // 0 to 1
        private float timingBarDirection = 1f;
        private float timingSweetSpotMin = 0.65f;
        private float timingSweetSpotMax = 0.85f;
        private float timingPerfectSpotMin = 0.72f;
        private float timingPerfectSpotMax = 0.78f;

        // Combo / Rune fields
        private string qteTargetSequence = "";
        private int qteSequenceIndex = 0;
        private string qteComboCurrent = "";

        // QTE results
        private enum PendingActionType { None, Strike, CastSpell, MonsterClaw, CastBuff, Taunt }
        private PendingActionType pendingQteAction = PendingActionType.None;
        private QteResult currentQteResult = QteResult.None;
        private bool isQteResolutionPending = false;
        private bool isParryCounterTriggered = false;

        // Defensive QTE target
        private float defenseWindowStart = 0.4f;
        private float defenseWindowEnd = 0.9f;
        private float defensePerfectStart = 0.6f;
        private float defensePerfectEnd = 0.75f;

        // Rhythm and Mashing fields
        private float rhythmPulseScale = 2.0f;
        private float rhythmPulseTargetMin = 0.8f;
        private float rhythmPulseTargetMax = 1.2f;
        private float rhythmPulsePerfectMin = 0.9f;
        private float rhythmPulsePerfectMax = 1.1f;
        private int qteMashesCount = 0;
        private bool monsterEnraged = false;
        private float qteTimeSpent = 0f;
        private int qteBounceCount = 0;
        private float qteDecayMultiplier = 1.0f;

        // Spell Combo & Multi-Beat Rhythm fields
        private bool inComboPhase = false;
        private string expectedCombo = "";
        private string currentComboInput = "";
        private int currentBeatIndex = 0;
        private int successfulBeatsCount = 0;
        private float beatScale = 2.0f;
        private float beatDirection = -1.0f; // negative means shrinking, positive means expanding

        // Timed Taunt Rhythm fields
        private int currentTauntNode = 0;
        private int tauntSuccessHits = 0;
        private float tauntAccuracyPct = 1.0f;

        // Rune Drawing and Decryption Puzzle variables
        private Vector2[] qteTracePoints = new Vector2[3];
        private int currentTraceIndex = 0;
        // Randomized Key Sequence variables
        private string qteTargetPattern = "";
        private int qtePatternProgress = 0;
        private int qtePatternErrors = 0;
        private int qtePatternMaxKeys = 8;
        // Rune Recognition variables
        private string[] qteRuneRequired;
        private string[] qteRuneOptions = new string[] { "ᚠ", "ᛁ", "ᚦ", "ᛒ", "ᚢ" };
        private List<string> qteRuneSelected = new List<string>();

        // Osu weak point variables
        private Vector2[] qteOsuNodes = new Vector2[3];
        private float[] qteOsuApproachScale = new float[3];
        private int qteOsuCurrentNode = 0;
        private int qteOsuSuccessHits = 0;
        private float qteOsuAccuracySum = 0f;

        public enum GridVisibilityMode { All, InteractionOnly, None }

        [Header("Aiming & Visual Toggles")]
        public GridVisibilityMode currentGridMode = GridVisibilityMode.All;
        private bool isAimingAttack = false;
        private string aimingType = "";
        private List<Vector3Int> highlightedCells = new List<Vector3Int>();

        void Start()
        {
            controller = GetComponent<CharacterController>();
            currentSpeed = walkSpeed;
            currentStamina = staminaMax;

            // Cursor lock
            Cursor.lockState = CursorLockMode.Locked;

            // Load data
            LoadWorldDatabase();
            InitializeQuestTrees();

            if (combatSystem == null) combatSystem = FindObjectOfType<GridCombatSystem>();
        }

        void Update()
        {
            // 1. If active QTE is running, update it and skip other player movement
            if (activeQteType != QteType.None)
            {
                UpdateActiveQte();
                return;
            }

            // 2. Handle QTE resolution callbacks
            CheckQteResolution();

            // Toggle grid cubes visibility mode
            if (Input.GetKeyDown(KeyCode.G))
            {
                currentGridMode = (GridVisibilityMode)(((int)currentGridMode + 1) % 3);
                Debug.Log($"[Grid Overlay] Cycle grid visibility mode: {currentGridMode}");
            }

            // Ground check
            isGrounded = controller.isGrounded;
            if (isGrounded && velocity.y < 0)
            {
                velocity.y = -2f;
            }

            if (controlsEnabled)
            {
                if (!isGridCombatActive)
                {
                    HandleCameraLook();
                }

                if (isClimbing)
                {
                    HandleClimbingMovement();
                }
                else if (isGridCombatActive)
                {
                    Handle3DGridCombat();
                }
                else
                {
                    HandleStandardMovement();
                    CheckForClimbWall();
                    HandleAxeActions();
                }
            }

            // Apply gravity (if not climbing and not in active turn-based combat)
            if (!isClimbing && !isGridCombatActive)
            {
                velocity.y += gravity * Time.deltaTime;
                controller.Move(velocity * Time.deltaTime);
            }

            // Sync States with Animator Parameters
            UpdateAnimatorParameters();
        }

        // =========================================================================
        // 4. THIRD-PERSON MOVEMENT & CAMERA LOOK
        // =========================================================================
        
        private void HandleStandardMovement()
        {
            float horizontal = Input.GetAxis("Horizontal");
            float vertical = Input.GetAxis("Vertical");

            // Sprint check
            currentSpeed = Input.GetKey(KeyCode.LeftShift) ? runSpeed : walkSpeed;

            Vector3 moveDirection = transform.forward * vertical + transform.right * horizontal;
            if (moveDirection.magnitude > 0.1f)
            {
                controller.Move(moveDirection.normalized * currentSpeed * Time.deltaTime);
            }

            // Jump
            if (Input.GetButtonDown("Jump") && isGrounded)
            {
                velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
                if (animator != null) animator.SetTrigger("JumpTrigger");
            }
        }

        private void HandleCameraLook()
        {
            float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
            float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity;

            // Rotate player body left-right
            transform.Rotate(Vector3.up * mouseX);

            // Rotate camera pivot up-down
            cameraPitch -= mouseY;
            cameraPitch = Mathf.Clamp(cameraPitch, -45f, 60f);
            if (cameraPivot != null)
            {
                cameraPivot.localRotation = Quaternion.Euler(cameraPitch, 0f, 0f);
            }
        }

        // =========================================================================
        // 5. ZELDA BOTW CLIMBING LOGIC
        // =========================================================================
        
        private void CheckForClimbWall()
        {
            RaycastHit hit;
            if (Physics.SphereCast(transform.position, sphereRadius, transform.forward, out hit, climbCheckDistance, climbableLayers))
            {
                // Enter climbing state on wall contact + jump button hold
                if (Input.GetButton("Jump") && currentStamina > 0)
                {
                    isClimbing = true;
                    wallNormal = hit.normal;
                    transform.rotation = Quaternion.LookRotation(-wallNormal);
                    velocity = Vector3.zero;
                }
            }
        }

        private void HandleClimbingMovement()
        {
            float horiz = Input.GetAxis("Horizontal");
            float vert = Input.GetAxis("Vertical");

            Vector3 climbDir = transform.up * vert + transform.right * horiz;
            if (climbDir.magnitude > 0.1f)
            {
                controller.Move(climbDir * climbSpeed * Time.deltaTime);
                currentStamina -= staminaClimbDrain * Time.deltaTime;
            }

            // Idle stamina drain
            currentStamina -= (staminaClimbDrain * 0.15f) * Time.deltaTime;

            // Check if still on the wall
            RaycastHit hit;
            if (!Physics.SphereCast(transform.position, sphereRadius, transform.forward, out hit, climbCheckDistance, climbableLayers) || currentStamina <= 0)
            {
                isClimbing = false;
            }
        }

        // =========================================================================
        // 6. GOD OF WAR AXE MECHANICS (THROW & RECALL)
        // =========================================================================
        
        private void HandleAxeActions()
        {
            // Throw Axe (Left Click)
            if (Input.GetMouseButtonDown(0) && !axeIsFlying && !axeIsRecalling)
            {
                ThrowAxe();
            }
            // Recall Axe (Right Click)
            else if (Input.GetMouseButtonDown(1) && axeIsFlying && !axeIsRecalling)
            {
                StartRecall();
            }

            if (axeIsFlying && !axeIsRecalling)
            {
                axeRigidbody.transform.Rotate(Vector3.right, axeRotationSpeed * Time.deltaTime);
            }

            if (axeIsRecalling)
            {
                HandleAxeRecall();
            }
        }

        private void ThrowAxe()
        {
            if (animator != null) animator.SetTrigger("ThrowTrigger");
            axeIsFlying = true;
            axeRigidbody.isKinematic = false;
            axeRigidbody.transform.parent = null;
            
            Vector3 throwDirection = cameraPivot != null ? cameraPivot.forward : transform.forward;
            axeRigidbody.AddForce(throwDirection * throwForce, ForceMode.Impulse);
        }

        private void StartRecall()
        {
            axeIsRecalling = true;
            axeRigidbody.isKinematic = true;
            recallProgress = 0f;
            recallStartPos = axeRigidbody.position;
        }

        private void HandleAxeRecall()
        {
            recallProgress += Time.deltaTime / recallTime;
            
            if (recallProgress >= 1.0f)
            {
                FinishAxeRecall();
            }
            else
            {
                // Quadratic Bezier Curve calculation
                Vector3 p0 = recallStartPos;
                Vector3 p1 = curveControlPoint != null ? curveControlPoint.position : (recallStartPos + playerHandSocket.position) / 2f + Vector3.up * 3f;
                Vector3 p2 = playerHandSocket.position;

                float t = recallProgress;
                Vector3 targetPos = Mathf.Pow(1 - t, 2) * p0 + 2 * (1 - t) * t * p1 + Mathf.Pow(t, 2) * p2;

                axeRigidbody.transform.position = targetPos;
                axeRigidbody.transform.Rotate(Vector3.right, -axeRotationSpeed * Time.deltaTime);
            }
        }

        private void FinishAxeRecall()
        {
            axeIsRecalling = false;
            axeIsFlying = false;
            axeRigidbody.transform.position = playerHandSocket.position;
            axeRigidbody.transform.rotation = playerHandSocket.rotation;
            axeRigidbody.transform.parent = playerHandSocket;
        }

        // Called by trigger collider on the Axe object script
        public void RegisterAxeCollision(Collision collision)
        {
            if (axeIsFlying && !axeIsRecalling)
            {
                axeIsFlying = false;
                axeRigidbody.isKinematic = true;
                axeRigidbody.transform.parent = collision.transform;
            }
        }

        // =========================================================================
        // 7. ANIMATOR INTERFACE
        // =========================================================================
        
        private void UpdateAnimatorParameters()
        {
            if (animator == null) return;

            // Speed calculation for blend trees
            float moveInputMagnitude = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical")).magnitude;
            float targetAnimSpeed = moveInputMagnitude * (currentSpeed / runSpeed);
            animator.SetFloat("Speed", targetAnimSpeed, 0.1f, Time.deltaTime);

            animator.SetBool("IsGrounded", isGrounded);
            animator.SetBool("IsClimbing", isClimbing);
            animator.SetBool("HasAxe", !axeIsFlying && !axeIsRecalling);
            animator.SetFloat("ClimbSpeed", isClimbing ? moveInputMagnitude : 0f);
        }

        // =========================================================================
        // 8. DATABASE LOADER & D&D STAT ENGINE
        // =========================================================================
        
        public void LoadWorldDatabase()
        {
            if (worldJsonFile != null)
            {
                worldDatabase = JsonUtility.FromJson<AvantrisWorldDatabase>(worldJsonFile.text);
                Debug.Log($"[AvantrisEngine] Scanned {worldDatabase.characters.Count} characters, {worldDatabase.campaigns.Count} campaigns.");
            }
        }

        public RollResult PerformDnDCheck(CharacterData character, AbilityType checkType, int targetDC)
        {
            int naturalRoll = UnityEngine.Random.Range(1, 21);
            int statVal = 10;

            if (character != null && character.stats != null)
            {
                switch (checkType)
                {
                    case AbilityType.Strength: statVal = character.stats.strength; break;
                    case AbilityType.Dexterity: statVal = character.stats.dexterity; break;
                    case AbilityType.Constitution: statVal = character.stats.constitution; break;
                    case AbilityType.Intelligence: statVal = character.stats.intelligence; break;
                    case AbilityType.Wisdom: statVal = character.stats.wisdom; break;
                    case AbilityType.Charisma: statVal = character.stats.charisma; break;
                }
            }

            int modifier = Mathf.FloorToInt((statVal - 10) / 2f);
            int finalValue = naturalRoll + modifier;

            Debug.Log($"[D&D Roll] rolled {naturalRoll} (+{modifier}) = {finalValue} vs DC {targetDC}");

            if (naturalRoll == 20) return RollResult.CriticalSuccess;
            if (naturalRoll == 1) return RollResult.CriticalFailure;

            return (finalValue >= targetDC) ? RollResult.Success : RollResult.Failure;
        }

        public void SetControlsEnabled(bool isEnabled)
        {
            controlsEnabled = isEnabled;
            if (!isEnabled)
            {
                // Reset animator movement parameters when controls locked
                if (animator != null) animator.SetFloat("Speed", 0f);
            }
        }

        private void InitializeQuestTrees()
        {
            // Initializing seed quest trees
            List<QuestNode> witchlightTree = new List<QuestNode>();
            
            QuestNode intro = new QuestNode
            {
                id = "witchlight_start",
                title = "Witchlight Carnivàle Escapade",
                dialogueText = "You hear the sirens. The guards are tracking morning frost! What will you do?"
            };

            QuestChoice runChoice = new QuestChoice
            {
                choiceText = "Vault the ticket stand (DEX Check)",
                requiredCheck = AbilityType.Dexterity,
                difficultyClass = 10,
                successNodeId = "witchlight_run_win",
                failureNodeId = "witchlight_run_fail"
            };

            intro.choices.Add(runChoice);
            witchlightTree.Add(intro);
            campaignQuestTrees.Add("once-upon-a-witchlight", witchlightTree);
        }

        // =========================================================================
        // 9. D&D 3D TURN-BASED GRID COMBAT STATE MACHINE & GUI
        // =========================================================================
        
        private enum CombatStep
        {
            Idle,
            MovingToTarget,
            Striking,
            ReturningToHome,
            MovingToTile
        }
        private CombatStep currentCombatStep = CombatStep.Idle;
        private Vector3 homePosition;
        private Vector3 targetPosition;
        private float combatTimer = 0f;
        private bool isMonsterAttacking = false;

        public void Trigger3DGridCombat(MonsterEncounter encounter = null)
        {
            if (combatSystem == null)
            {
                Debug.LogError("[D&D Combat] GridCombatSystem component not found!");
                return;
            }

            // Create Player combatant
            string pId = "gideon-coal";
            string pName = "Gideon Coal";
            int pHP = 25;
            int pMaxHP = 25;
            int pAC = 16;
            int pInitMod = 2;
            CharacterStats pStats = new CharacterStats { strength = 16, dexterity = 14, constitution = 15, intelligence = 10, wisdom = 12, charisma = 8 };

            if (worldDatabase != null && worldDatabase.characters != null)
            {
                CharacterData foundHero = worldDatabase.characters.Find(ch => ch.id == activeCharacterId);
                if (foundHero != null)
                {
                    pId = foundHero.id;
                    pName = foundHero.name;
                    pStats = foundHero.stats;
                    pInitMod = Mathf.FloorToInt((foundHero.stats.dexterity - 10) / 2f);
                    pAC = 10 + pInitMod + 4;
                    pHP = 20 + Mathf.FloorToInt((foundHero.stats.constitution - 10) / 2f) * 2;
                    pMaxHP = pHP;
                }
            }

            playerCombatState = new CharacterCombatState
            {
                characterId = pId,
                name = pName,
                gridPosition = new Vector3Int(1, 0, 1),
                currentHP = pHP,
                maxHP = pMaxHP,
                armorClass = pAC,
                initiativeModifier = pInitMod,
                isPlayerControlled = true,
                stats = pStats,
                canFly = true,
                canBurrow = true,
                landSpeed = 6,
                flySpeed = 6,
                burrowSpeed = 3
            };

            // Set monster defaults or load from encounter trigger
            string mId = "chuckles";
            string mName = "Chuckles the Clown";
            int mHP = 25;
            int mAC = 13;
            int mInitMod = 1;
            CharacterStats mStats = new CharacterStats { strength = 12, dexterity = 13, constitution = 14, intelligence = 10, wisdom = 10, charisma = 8 };

            activeMonsterEncounter = encounter;

            if (encounter != null)
            {
                mId = encounter.monsterId;
                mName = encounter.monsterName;
                mHP = encounter.currentHP;
                mAC = encounter.armorClass;
                mInitMod = encounter.initiativeModifier;
                mStats = encounter.stats;
                monsterTransform = encounter.transform;
            }

            // Create Monster combatant
            monsterCombatState = new CharacterCombatState
            {
                characterId = mId,
                name = mName,
                gridPosition = new Vector3Int(4, 0, 4),
                currentHP = mHP,
                maxHP = mHP,
                armorClass = mAC,
                initiativeModifier = mInitMod,
                isPlayerControlled = false,
                stats = mStats,
                canFly = false,
                canBurrow = false,
                landSpeed = 4,
                flySpeed = 0,
                burrowSpeed = 0
            };

            List<CharacterCombatState> participants = new List<CharacterCombatState> { playerCombatState, monsterCombatState };
            
            // Reposition characters in 3D Space
            transform.position = combatSystem.GridToWorld(playerCombatState.gridPosition);
            if (monsterTransform != null)
            {
                monsterTransform.position = combatSystem.GridToWorld(monsterCombatState.gridPosition);
            }

            isGridCombatActive = true;
            SetControlsEnabled(false);
            
            // Reset player turn pools
            ResetPlayerTurnPools();

            // Start system combat turns
            combatSystem.StartCombat(participants);
        }

        private void ResetPlayerTurnPools()
        {
            int maxMove = playerCombatState.landSpeed;
            if (playerCombatState.canFly && playerCombatState.flySpeed > maxMove) maxMove = playerCombatState.flySpeed;
            if (playerCombatState.canBurrow && playerCombatState.burrowSpeed > maxMove) maxMove = playerCombatState.burrowSpeed;

            playerRemainingMovement = maxMove;
            playerHasAction = true;
            playerHasBonusAction = true;
            playerHasFreeInteract = true;
            playerHasReaction = true;
            playerIsDodging = false;
            playerIsDisengaged = false;

            if (playerCombatState.isStaggered)
            {
                playerCombatState.isStaggered = false;
                playerHasAction = false;
                Debug.LogWarning("[Stagger Penalty] Caster is Staggered! Lost major Action this turn.");
            }
        }

        private void Handle3DGridCombat()
        {
            // 1. Handle animated lerps
            if (isMovingToGridTile)
            {
                transform.position = Vector3.MoveTowards(transform.position, targetGridWorldPos, walkSpeed * 2f * Time.deltaTime);
                Vector3 lookDir = (targetGridWorldPos - transform.position);
                lookDir.y = 0;
                if (lookDir.magnitude > 0.05f)
                {
                    transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(lookDir), Time.deltaTime * 10f);
                }

                if (animator != null) animator.SetFloat("Speed", 0.5f);

                if (Vector3.Distance(transform.position, targetGridWorldPos) < 0.02f)
                {
                    transform.position = targetGridWorldPos;
                    isMovingToGridTile = false;
                    if (animator != null) animator.SetFloat("Speed", 0f);
                }
                return;
            }

            // FF4 style combat animations: run forward -> strike -> run back
            if (currentCombatStep == CombatStep.MovingToTarget)
            {
                transform.position = Vector3.MoveTowards(transform.position, targetPosition, runSpeed * Time.deltaTime);
                Vector3 look = (targetPosition - transform.position);
                look.y = 0;
                if (look.magnitude > 0.05f) transform.rotation = Quaternion.LookRotation(look);
                if (animator != null) animator.SetFloat("Speed", 1.0f);

                if (Vector3.Distance(transform.position, targetPosition) < 0.05f)
                {
                    currentCombatStep = CombatStep.Striking;
                    combatTimer = 0.8f; // duration of animation
                    if (animator != null) animator.SetTrigger("ThrowTrigger");
                    
                    // Attack roll calculation in 3D with QTE modifiers
                    int roll = 0;
                    bool isCrit = false;
                    int bonus = Mathf.FloorToInt((playerCombatState.stats.strength - 10) / 2f);
                    bool hit = false;

                    if (currentQteResult == QteResult.Perfect)
                    {
                        hit = true;
                        isCrit = true;
                        Debug.Log("🎯 PERFECT TIMING! Slashing strike is a guaranteed Critical Hit!");
                    }
                    else if (currentQteResult == QteResult.NormalSuccess)
                    {
                        bonus += 2;
                        hit = combatSystem.PerformAttackRoll(playerCombatState, monsterCombatState, bonus, RollModifiers.None, out roll, out isCrit);
                        Debug.Log($"[QTE Attack Boost] Timing check succeeded! +2 to hit. Hit? {hit}");
                    }
                    else // QteResult.Fail
                    {
                        hit = false;
                        playerHasReaction = false; // lost reaction balance
                        Debug.LogWarning("💥 [QTE Ruthless Fail] Mistimed Slash! Auto-miss and lost Reaction balance until next turn!");
                    }

                    if (hit)
                    {
                        // 1d8 weapon damage (double dice count if critical hit)
                        int diceCount = isCrit ? 2 : 1;
                        int dmg = 0;
                        for (int i = 0; i < diceCount; i++) dmg += UnityEngine.Random.Range(1, 9);
                        dmg += bonus;

                        // Apply QTE decay factor (less reward for hesitating) and speed bonus multiplier (Osu critical hit precision)
                        dmg = Mathf.Max(1, Mathf.RoundToInt(dmg * qteDecayMultiplier * qteSpeedBonusMultiplier));

                        monsterCombatState.currentHP = Mathf.Max(0, monsterCombatState.currentHP - dmg);
                        Debug.Log($"[Strike] {(isCrit ? "CRITICAL HIT! " : "")}Dealt {dmg} damage to Chuckles (Time-Decay: {qteDecayMultiplier:F2}x)! (HP: {monsterCombatState.currentHP}/{monsterCombatState.maxHP})");
                        
                        if (monsterCombatState.currentHP <= 0)
                        {
                            ResolveCombatVictory();
                        }
                    }
                    else
                    {
                        Debug.Log("[Strike] MISS! Chuckles dodges.");
                    }
                }
                return;
            }

            if (currentCombatStep == CombatStep.Striking)
            {
                combatTimer -= Time.deltaTime;
                if (combatTimer <= 0)
                {
                    currentCombatStep = CombatStep.ReturningToHome;
                }
                return;
            }

            if (currentCombatStep == CombatStep.ReturningToHome)
            {
                transform.position = Vector3.MoveTowards(transform.position, homePosition, runSpeed * Time.deltaTime);
                Vector3 look = (homePosition - transform.position);
                look.y = 0;
                if (look.magnitude > 0.05f) transform.rotation = Quaternion.LookRotation(look);
                if (animator != null) animator.SetFloat("Speed", 1.0f);

                if (Vector3.Distance(transform.position, homePosition) < 0.05f)
                {
                    transform.position = homePosition;
                    // Face the monster again
                    if (monsterTransform != null)
                    {
                        Vector3 face = (monsterTransform.position - transform.position);
                        face.y = 0;
                        if (face.magnitude > 0.05f) transform.rotation = Quaternion.LookRotation(face);
                    }
                    currentCombatStep = CombatStep.Idle;
                    if (animator != null) animator.SetFloat("Speed", 0f);

                    if (monsterCombatState.currentHP <= 0)
                    {
                        ResolveCombatVictory();
                    }
                }
                return;
            }

            // Check turn
            var active = combatSystem.GetActiveCombatant();
            if (active == null) return;

            if (active.isPlayerControlled)
            {
                if (active.isDying)
                {
                    // Unconscious and dying, cannot move. Must roll death saves via GUI.
                    return;
                }
                if (active.isStable)
                {
                    // Stable but unconscious. Automatically pass turn.
                    Debug.Log($"[Turn] {active.name} is stable but unconscious. Automatically passing turn.");
                    EndPlayerTurn();
                    return;
                }

                // Let player move via WASD tile-by-tile
                HandlePlayerGridMovement();
            }
            else
            {
                // Run monster turn AI step-by-step
                ExecuteMonsterTurnAI();
            }
        }

        private void HandlePlayerGridMovement()
        {
            Vector3Int step = Vector3Int.zero;
            if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow)) step = new Vector3Int(0, 0, 1);
            else if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow)) step = new Vector3Int(0, 0, -1);
            else if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow)) step = new Vector3Int(-1, 0, 0);
            else if (Input.GetKeyDown(KeyCode.D) || Input.GetKeyDown(KeyCode.RightArrow)) step = new Vector3Int(1, 0, 0);
            else if (Input.GetKeyDown(KeyCode.Q)) step = new Vector3Int(0, 1, 0);   // Ascend voxel grid
            else if (Input.GetKeyDown(KeyCode.E)) step = new Vector3Int(0, -1, 0);  // Descend voxel grid

            if (step != Vector3Int.zero)
            {
                if (playerRemainingMovement <= 0)
                {
                    Debug.LogWarning("[Movement] Out of movement points! Use Dash to get more.");
                    return;
                }

                Vector3Int oldPos = playerCombatState.gridPosition;
                Vector3Int targetPos = playerCombatState.gridPosition + step;
                if (targetPos.x >= 0 && targetPos.x < combatSystem.gridWidth && 
                    targetPos.y >= -10 && targetPos.y < 20 && 
                    targetPos.z >= 0 && targetPos.z < combatSystem.gridHeight)
                {
                    if (targetPos == monsterCombatState.gridPosition && monsterCombatState.currentHP > 0)
                    {
                        Debug.LogWarning("[Movement] Cannot enter monster's cell!");
                        return;
                    }

                    // Enforce checks for flight and burrowing capabilities
                    if (targetPos.y > 0 && !playerCombatState.canFly)
                    {
                        Debug.LogWarning("[Movement] Cannot enter air! Character does not have flying capability.");
                        return;
                    }
                    if (targetPos.y < 0 && !playerCombatState.canBurrow)
                    {
                        Debug.LogWarning("[Movement] Cannot enter ground! Character does not have burrowing capability.");
                        return;
                    }

                    // Opportunity Attack Check in 3D
                    int oldDist = Mathf.Max(
                        Mathf.Abs(oldPos.x - monsterCombatState.gridPosition.x),
                        Mathf.Max(
                            Mathf.Abs(oldPos.y - monsterCombatState.gridPosition.y),
                            Mathf.Abs(oldPos.z - monsterCombatState.gridPosition.z)
                        )
                    );
                    int newDist = Mathf.Max(
                        Mathf.Abs(targetPos.x - monsterCombatState.gridPosition.x),
                        Mathf.Max(
                            Mathf.Abs(targetPos.y - monsterCombatState.gridPosition.y),
                            Mathf.Abs(targetPos.z - monsterCombatState.gridPosition.z)
                        )
                    );

                    if (oldDist <= 1 && newDist > 1 && monsterCombatState.currentHP > 0)
                    {
                        if (!playerIsDisengaged && monsterHasReaction)
                        {
                            monsterHasReaction = false;
                            Debug.Log("⚔️ [Opportunity Attack] You provoke an Opportunity Attack by leaving the monster's reach!");
                            
                            int roll;
                            bool isCrit;
                            RollModifiers rollMod = playerIsDodging ? RollModifiers.Disadvantage : RollModifiers.None;
                            bool hit = combatSystem.PerformAttackRoll(monsterCombatState, playerCombatState, 3, rollMod, out roll, out isCrit);

                            if (hit)
                            {
                                int diceCount = isCrit ? 2 : 1;
                                int dmg = 0;
                                for (int i = 0; i < diceCount; i++) dmg += UnityEngine.Random.Range(1, 7);
                                dmg += 2;

                                playerCombatState.currentHP = Mathf.Max(0, playerCombatState.currentHP - dmg);
                                Debug.Log($"💥 {(isCrit ? "CRITICAL " : "")}HIT! Chuckles hits you for {dmg} damage! (Your HP: {playerCombatState.currentHP}/{playerCombatState.maxHP})");
                                if (playerCombatState.currentHP <= 0)
                                {
                                    playerCombatState.isDying = true;
                                    playerCombatState.deathSaveSuccesses = 0;
                                    playerCombatState.deathSaveFailures = 0;
                                    Debug.LogWarning($"💥 {playerCombatState.name} has dropped to 0 HP and is DYING! Must roll Death Saving Throws.");
                                }
                            }
                            else
                            {
                                Debug.Log("💨 MISS! You successfully dodge the swipe.");
                            }
                        }
                    }

                    playerRemainingMovement--;
                    playerCombatState.gridPosition = targetPos;
                    targetGridWorldPos = combatSystem.GridToWorld(targetPos);
                    isMovingToGridTile = true;
                }
            }
        }

        private void TryPlayerStrike()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }

            int dist = Mathf.Max(
                Mathf.Abs(playerCombatState.gridPosition.x - monsterCombatState.gridPosition.x),
                Mathf.Max(
                    Mathf.Abs(playerCombatState.gridPosition.y - monsterCombatState.gridPosition.y),
                    Mathf.Abs(playerCombatState.gridPosition.z - monsterCombatState.gridPosition.z)
                )
            );

            if (dist > 1)
            {
                Debug.LogWarning("[Combat] Target is too far for melee strike!");
                return;
            }

            playerHasAction = false;
            homePosition = transform.position;
            // Target position is closest adjacent spot in 3D
            targetPosition = combatSystem.GridToWorld(monsterCombatState.gridPosition + new Vector3Int(
                Mathf.Clamp(playerCombatState.gridPosition.x - monsterCombatState.gridPosition.x, -1, 1),
                Mathf.Clamp(playerCombatState.gridPosition.y - monsterCombatState.gridPosition.y, -1, 1),
                Mathf.Clamp(playerCombatState.gridPosition.z - monsterCombatState.gridPosition.z, -1, 1)
            ));
            
            currentCombatStep = CombatStep.MovingToTarget;
        }

        private void TryPlayerCastSpell()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }

            playerHasAction = false;
            if (animator != null) animator.SetTrigger("ThrowTrigger"); // play casting animation

            // Spell Range Check: Blast spell with range 6, DC 13
            int dist = Mathf.Max(
                Mathf.Abs(playerCombatState.gridPosition.x - monsterCombatState.gridPosition.x),
                Mathf.Max(
                    Mathf.Abs(playerCombatState.gridPosition.y - monsterCombatState.gridPosition.y),
                    Mathf.Abs(playerCombatState.gridPosition.z - monsterCombatState.gridPosition.z)
                )
            );

            if (dist <= 6)
            {
                // Check 3D Line of Sight
                if (!combatSystem.HasLineOfSight(playerCombatState.gridPosition, monsterCombatState.gridPosition))
                {
                    Debug.LogWarning("[Spell] No Line of Sight! Obstacles block the path to the monster.");
                    return;
                }

                // Apply QTE modifiers to spell save DC (Standard DC is 13)
                int saveDC = 13;
                if (currentQteResult == QteResult.Perfect)
                {
                    saveDC = 16;
                    Debug.Log("[QTE Spell Boost] Perfect Rune glyph trace! Spell Save DC increased to 16!");
                }
                else if (currentQteResult == QteResult.NormalSuccess)
                {
                    saveDC = 14;
                    Debug.Log("[QTE Spell Boost] Success drawing glyph! Spell Save DC increased to 14.");
                }
                else if (currentQteResult == QteResult.Fail)
                {
                    saveDC = 11;
                    Debug.Log("[QTE Spell Penalty] Failed drawing glyph! Spell Save DC reduced to 11.");
                }

                int saveRoll;
                bool saved = combatSystem.PerformSavingThrow(monsterCombatState, SavingThrowType.Dexterity, saveDC, RollModifiers.None, out saveRoll);
                
                // Base damage 3d6
                int damage = UnityEngine.Random.Range(1, 7) + UnityEngine.Random.Range(1, 7) + UnityEngine.Random.Range(1, 7);
                
                // Perfect QTE adds +1d6 extra flame damage
                if (currentQteResult == QteResult.Perfect)
                {
                    int extraDmg = UnityEngine.Random.Range(1, 7);
                    damage += extraDmg;
                    Debug.Log($"🔥 [Rune Fire] Perfect casting adds {extraDmg} extra fire damage!");
                }

                if (saved)
                {
                    damage = Mathf.FloorToInt(damage / 2f);
                    Debug.Log($"[Spell] Chuckles succeeded Dexterity save (rolled {saveRoll})! Takes half damage: {damage}");
                }
                else
                {
                    Debug.Log($"[Spell] Chuckles failed save! Takes full damage: {damage}");
                }

                // Apply QTE decay factor (less reward for hesitating) and speed bonus multiplier
                damage = Mathf.Max(1, Mathf.RoundToInt(damage * qteDecayMultiplier * qteSpeedBonusMultiplier));

                monsterCombatState.currentHP = Mathf.Max(0, monsterCombatState.currentHP - damage);

                if (monsterCombatState.currentHP <= 0)
                {
                    ResolveCombatVictory();
                }
            }
            else
            {
                Debug.LogWarning("[Spell] Spell went wide! Target out of range.");
            }
        }

        private void TryPlayerDash()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining to Dash!");
                return;
            }
            playerHasAction = false;
            playerRemainingMovement += movementLimitPerTurn;
            Debug.Log($"[Action] Cast Dash! Added {movementLimitPerTurn} movement points.");
        }

        private void TryPlayerInteract()
        {
            if (!playerHasFreeInteract)
            {
                Debug.LogWarning("[Combat] Already used object interaction this turn.");
                return;
            }
            playerHasFreeInteract = false;
            Debug.Log("[Action] Interacted with local surroundings.");
        }

        private void TryPlayerDodge()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining to Dodge!");
                return;
            }
            playerHasAction = false;
            playerIsDodging = true;
            Debug.Log("🛡️ DODGE! You take a defensive stance. Attacks against you have disadvantage.");
        }

        private void TryPlayerDisengage()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining to Disengage!");
                return;
            }
            playerHasAction = false;
            playerIsDisengaged = true;
            Debug.Log("💨 DISENGAGE! Your movement won't provoke opportunity attacks this turn.");
        }

        private void EndPlayerTurn()
        {
            combatSystem.NextTurn();
        }

        private void ExecuteMonsterTurnAI()
        {
            // Monster moves closer in 3D
            Vector3Int monsterPos = monsterCombatState.gridPosition;
            Vector3Int playerPos = playerCombatState.gridPosition;

            int stepX = Mathf.Clamp(playerPos.x - monsterPos.x, -1, 1);
            int stepY = Mathf.Clamp(playerPos.y - monsterPos.y, -1, 1);
            int stepZ = Mathf.Clamp(playerPos.z - monsterPos.z, -1, 1);

            int dist = Mathf.Max(
                Mathf.Abs(playerPos.x - monsterPos.x),
                Mathf.Max(
                    Mathf.Abs(playerPos.y - monsterPos.y),
                    Mathf.Abs(playerPos.z - monsterPos.z)
                )
            );

            if (dist > 1)
            {
                // Move 1 step closer
                monsterCombatState.gridPosition += new Vector3Int(stepX, stepY, stepZ);
                if (monsterTransform != null)
                {
                    monsterTransform.position = combatSystem.GridToWorld(monsterCombatState.gridPosition);
                }
                Debug.Log($"[Monster AI] Chuckles moves to grid coordinates [{monsterCombatState.gridPosition.x}, {monsterCombatState.gridPosition.y}, {monsterCombatState.gridPosition.z}].");
            }
            else
            {
                // Launch defensive QTE (Active Block/Parry) for the player
                StartMonsterClawDefensiveQte();
            }
        }

        private void ResolveCombatVictory()
        {
            isGridCombatActive = false;
            SetControlsEnabled(true);
            Cursor.lockState = CursorLockMode.Locked; // Restore standard locked cursor
            Debug.Log($"🏆 VICTORY! {monsterCombatState.name} has been defeated on the 3D grid!");
            
            if (activeMonsterEncounter != null)
            {
                activeMonsterEncounter.gameObject.SetActive(false); // Disable defeated monster
            }
        }
 
        private void ResolveCombatDefeat()
        {
            isGridCombatActive = false;
            SetControlsEnabled(true);
            Cursor.lockState = CursorLockMode.Locked; // Restore standard locked cursor
            Debug.LogWarning("💀 DEFEAT! You have fallen in 3D combat.");
            
            // Teleport player back to the beginning starting zone
            ZoneManager zm = FindObjectOfType<ZoneManager>();
            if (zm != null)
            {
                zm.SwitchZone(zm.startingZoneId);
            }
        }

        // =========================================================================
        // 10. ON-GUI HUD (FINAL FANTASY STYLE OVERLAY)
        // =========================================================================
        
        void OnGUI()
        {
            if (!isGridCombatActive) return;

            // Draw QTE overlay if active
            if (activeQteType != QteType.None)
            {
                DrawActiveQteInterface();
            }

            // Draw Target Aiming overlay if active
            if (isAimingAttack)
            {
                DrawAimingOverlayInterface();
            }

            // Display RPG combat stats panel at the bottom center of the screen
            float screenWidth = Screen.width;
            float screenHeight = Screen.height;
            float panelWidth = 600f;
            float panelHeight = 175f;
            float startX = (screenWidth - panelWidth) / 2f;
            float startY = screenHeight - panelHeight - 20f;

            GUI.Box(new Rect(startX, startY, panelWidth, panelHeight), "🛡️ Legends of Avantris: D&D Grid Combat");
            if (GUI.Button(new Rect(startX + panelWidth - 165f, startY + 2f, 160f, 20f), $"Grid Mode: {currentGridMode} (G)"))
            {
                currentGridMode = (GridVisibilityMode)(((int)currentGridMode + 1) % 3);
            }

            // Player Stats Area
            GUI.Label(new Rect(startX + 20f, startY + 30f, 250f, 25f), $"<strong>Hero:</strong> {playerCombatState.name}");
            if (playerCombatState.isDying)
            {
                GUI.Label(new Rect(startX + 20f, startY + 55f, 250f, 25f), $"❤️ <strong>HP:</strong> 0 / {playerCombatState.maxHP} <color=red>[DYING]</color>");
                GUI.Label(new Rect(startX + 20f, startY + 80f, 290f, 25f), $"💀 <strong>Death Saves:</strong> Succ: {playerCombatState.deathSaveSuccesses}/3 | Fail: {playerCombatState.deathSaveFailures}/3");
            }
            else if (playerCombatState.isStable)
            {
                GUI.Label(new Rect(startX + 20f, startY + 55f, 250f, 25f), $"❤️ <strong>HP:</strong> 0 / {playerCombatState.maxHP} <color=yellow>[STABLE]</color>");
                GUI.Label(new Rect(startX + 20f, startY + 80f, 290f, 25f), $"💤 <strong>Stable & Unconscious</strong>");
            }
            else
            {
                GUI.Label(new Rect(startX + 20f, startY + 55f, 250f, 25f), $"❤️ <strong>HP:</strong> {playerCombatState.currentHP} / {playerCombatState.maxHP}");
                GUI.Label(new Rect(startX + 20f, startY + 80f, 250f, 25f), $"🏃 <strong>Movement:</strong> {playerRemainingMovement} tiles");
            }
            GUI.Label(new Rect(startX + 20f, startY + 105f, 250f, 25f), $"⚡ <strong>Action:</strong> {(playerHasAction ? "Available" : "Used")} | <strong>Reaction:</strong> {(playerHasReaction ? "Avail" : "Used")}");

            // Opponent Stats Area
            GUI.Label(new Rect(startX + 320f, startY + 30f, 250f, 25f), $"<strong>Target:</strong> {monsterCombatState.name}");
            GUI.Label(new Rect(startX + 320f, startY + 55f, 250f, 25f), $"❤️ <strong>HP:</strong> {monsterCombatState.currentHP} / {monsterCombatState.maxHP}");
            GUI.Label(new Rect(startX + 320f, startY + 80f, 250f, 25f), $"🛡️ <strong>Armor Class:</strong> {monsterCombatState.armorClass}");

            // Active Turn & State Notifications
            var activeUnit = combatSystem.GetActiveCombatant();
            if (activeUnit != null)
            {
                GUI.color = activeUnit.isPlayerControlled ? Color.green : Color.red;
                string statusFlags = "";
                if (playerIsDodging) statusFlags += " [DODGING]";
                if (playerIsDisengaged) statusFlags += " [DISENGAGED]";
                GUI.Label(new Rect(startX + 320f, startY + 105f, 250f, 25f), $"📣 <strong>Active Turn:</strong> {activeUnit.name}{statusFlags}");
                GUI.color = Color.white;
            }

            // Clickable Action Buttons (D&D 5e Combat Turn menu)
            if (activeUnit != null && activeUnit.isPlayerControlled && currentCombatStep == CombatStep.Idle && !isMovingToGridTile)
            {
                if (activeUnit.isDying)
                {
                    if (GUI.Button(new Rect(startX + 15f, startY + 135f, 150f, 22f), "💀 Roll Death Save"))
                    {
                        int rolledDeathSave;
                        combatSystem.PerformDeathSavingThrow(activeUnit, out rolledDeathSave);
                        if (activeUnit.isDead)
                        {
                            ResolveCombatDefeat();
                        }
                        else
                        {
                            EndPlayerTurn();
                        }
                    }
                }
                else if (activeUnit.isStable)
                {
                    if (GUI.Button(new Rect(startX + 15f, startY + 135f, 150f, 22f), "💤 Pass Turn (Stable)"))
                    {
                        EndPlayerTurn();
                    }
                }
                else
                {
                    if (GUI.Button(new Rect(startX + 15f, startY + 135f, 70f, 22f), "Strike"))
                    {
                        EnterAimingMode("Strike");
                    }
                    if (GUI.Button(new Rect(startX + 90f, startY + 135f, 80f, 22f), "Cast Spell"))
                    {
                        EnterAimingMode("Spell");
                    }
                    if (GUI.Button(new Rect(startX + 175f, startY + 135f, 75f, 22f), "Cast Buff"))
                    {
                        EnterAimingMode("Buff");
                    }
                    if (GUI.Button(new Rect(startX + 255f, startY + 135f, 65f, 22f), "Taunt"))
                    {
                        EnterAimingMode("Taunt");
                    }
                    if (GUI.Button(new Rect(startX + 325f, startY + 135f, 50f, 22f), "Dash"))
                    {
                        TryPlayerDash();
                    }
                    if (GUI.Button(new Rect(startX + 380f, startY + 135f, 55f, 22f), "Dodge"))
                    {
                        TryPlayerDodge();
                    }
                    if (GUI.Button(new Rect(startX + 440f, startY + 135f, 80f, 22f), "Disengage"))
                    {
                        TryPlayerDisengage();
                    }
                    if (GUI.Button(new Rect(startX + 525f, startY + 135f, 65f, 22f), "End Turn"))
                    {
                        EndPlayerTurn();
                    }
                }
            }
        }

        private void UpdateActiveQte()
        {
            if (activeQteType == QteType.None) return;

            // 1. Check timer rules (PrecisionTiming and ActiveDefense run indefinitely with decay)
            if (activeQteType != QteType.PrecisionTiming && activeQteType != QteType.ActiveDefense)
            {
                qteTimer -= Time.deltaTime;
                if (qteTimer <= 0f)
                {
                    if (activeQteType == QteType.ButtonMash)
                    {
                        if (qteMashesCount >= 15) ResolveQte(QteResult.Perfect);
                        else if (qteMashesCount >= 8) ResolveQte(QteResult.NormalSuccess);
                        else ResolveQte(QteResult.Fail);
                    }
                    else if (pendingQteAction == PendingActionType.CastBuff)
                    {
                        // Check Rune Recognition selections on timeout
                        if (qteRuneSelected.Count >= qteRuneRequired.Length)
                        {
                            ResolveQte(QteResult.Perfect);
                        }
                        else if (qteRuneSelected.Count > 0)
                        {
                            qteSpeedBonusMultiplier = 0.5f; // half efficacy
                            Debug.Log($"⏳ [QTE Buff Timeout] Partially solved! ({qteRuneSelected.Count}/{qteRuneRequired.Length})");
                            ResolveQte(QteResult.NormalSuccess);
                        }
                        else
                        {
                            ResolveQte(QteResult.Fail);
                        }
                    }
                    else
                    {
                        ResolveQte(QteResult.Fail);
                    }
                    return;
                }
            }
            else
            {
                qteTimeSpent += Time.deltaTime;
                qteDecayMultiplier = Mathf.Max(0.3f, 1.0f - qteTimeSpent / 4.0f);
            }

            switch (activeQteType)
            {
                case QteType.PrecisionTiming:
                    {
                        float speed = 2.0f * (1.0f + qteBounceCount * 0.4f);
                        timingBarValue += Time.deltaTime * speed * timingBarDirection;
                        if (timingBarValue >= 1f) { timingBarValue = 1f; timingBarDirection = -1f; qteBounceCount++; }
                        else if (timingBarValue <= 0f) { timingBarValue = 0f; timingBarDirection = 1f; qteBounceCount++; }

                        // Press Space to check timing
                        if (Input.GetKeyDown(KeyCode.Space))
                        {
                            EvaluateTimingCheck(timingBarValue);
                        }
                    }
                    break;

                case QteType.ActiveDefense:
                    {
                        float speedDef = 1.5f * (1.0f + qteBounceCount * 0.4f);
                        timingBarValue += Time.deltaTime * speedDef * timingBarDirection;
                        if (timingBarValue >= 1f) { timingBarValue = 1f; timingBarDirection = -1f; qteBounceCount++; }
                        else if (timingBarValue <= 0f) { timingBarValue = 0f; timingBarDirection = 1f; qteBounceCount++; }

                        // Block (Shift) or Parry (F)
                        if (Input.GetKeyDown(KeyCode.LeftShift))
                        {
                            EvaluateDefenseCheck(timingBarValue, false);
                        }
                        else if (Input.GetKeyDown(KeyCode.F))
                        {
                            EvaluateDefenseCheck(timingBarValue, true);
                        }
                    }
                    break;

                case QteType.RuneSequence:
                    {
                        if (pendingQteAction == PendingActionType.CastBuff)
                        {
                            // Rune Recognition choices are clicked via GUI.Buttons in DrawActiveQteInterface
                        }
                        else if (inComboPhase)
                        {
                            // Combo Phase checks (Tekken/Street Fighter inputs)
                            string inputString = Input.inputString.ToUpper();
                            if (!string.IsNullOrEmpty(inputString))
                            {
                                char pressedChar = inputString[0];
                                char nextExpected = expectedCombo[currentComboInput.Length];
                                if (pressedChar == nextExpected)
                                {
                                    currentComboInput += pressedChar;
                                    Debug.Log($"[Combo Spell] Correct combo key: {currentComboInput}");
                                    if (currentComboInput == expectedCombo)
                                    {
                                        // Transition to Rhythm Beats phase
                                        inComboPhase = false;
                                        activeQteType = QteType.RhythmTempo;
                                        currentBeatIndex = 0;
                                        successfulBeatsCount = 0;
                                        beatScale = 2.0f;
                                        beatDirection = -1.0f; // shrinking
                                        qteDuration = 1.2f;
                                        qteTimer = qteDuration;
                                        Debug.Log("[Combo Spell] Combo Successful! Rhythmic casts activated! Press SPACE as the pulsing rings align!");
                                    }
                                }
                                else
                                {
                                    Debug.LogWarning($"[Combo Spell] Mistyped combo! Expected: {nextExpected}, Pressed: {pressedChar}. SPELL FIZZLE!");
                                    ResolveQte(QteResult.Fail);
                                }
                            }
                        }
                        else
                        {
                            // Randomized Pattern Matcher checks (QE / QER keys sequence)
                            string inputString = Input.inputString.ToUpper();
                            if (!string.IsNullOrEmpty(inputString))
                            {
                                char pressedChar = inputString[0];
                                char nextExpected = qteTargetPattern[qtePatternProgress];
                                if (pressedChar == nextExpected)
                                {
                                    qtePatternProgress++;
                                    Debug.Log($"[Sequence Match] Correct key: {pressedChar} (Progress: {qtePatternProgress}/{qtePatternMaxKeys})");
                                    if (qtePatternProgress >= qtePatternMaxKeys)
                                    {
                                        // Successfully solved! Calculate accuracy based on errors count
                                        float accuracy = Mathf.Max(0.1f, 1.0f - qtePatternErrors * 0.15f);
                                        float speedBonus = Mathf.Max(1.0f, 1.0f + qteTimer * 0.25f) * accuracy;
                                        qteSpeedBonusMultiplier = speedBonus;
                                        
                                        if (pendingQteAction == PendingActionType.Taunt)
                                        {
                                            tauntAccuracyPct = accuracy;
                                        }

                                        Debug.Log($"[Sequence Match] Solved! Accuracy: {accuracy:P0}. Speed bonus: {speedBonus:F2}x!");
                                        ResolveQte(accuracy >= 0.85f ? QteResult.Perfect : (accuracy >= 0.4f ? QteResult.NormalSuccess : QteResult.Fail));
                                    }
                                }
                                else
                                {
                                    qtePatternErrors++;
                                    Debug.LogWarning($"[Sequence Match] Wrong key! Expected: {nextExpected}, Pressed: {pressedChar}. Error count: {qtePatternErrors}");
                                }
                            }
                        }
                    }
                    break;

                case QteType.RhythmTempo:
                    {
                        // Beat scale collapses or expands
                        beatScale += Time.deltaTime * 1.5f * beatDirection;

                        if (beatDirection < 0f && beatScale <= 0.5f)
                        {
                            Debug.LogWarning($"[Rhythm] Beat {currentBeatIndex + 1} missed (shrank too far)!");
                            NextRhythmBeat(false);
                        }
                        else if (beatDirection > 0f && beatScale >= 2.0f)
                        {
                            Debug.LogWarning($"[Rhythm] Beat {currentBeatIndex + 1} missed (expanded too far)!");
                            NextRhythmBeat(false);
                        }
                        else if (Input.GetKeyDown(KeyCode.Space))
                        {
                            // Target bounds (Perfect: 0.9 to 1.1, Success: 0.8 to 1.2)
                            if (beatScale >= 0.9f && beatScale <= 1.1f)
                            {
                                Debug.Log($"[Rhythm] Beat {currentBeatIndex + 1} PERFECT HIT!");
                                NextRhythmBeat(true);
                            }
                            else if (beatScale >= 0.8f && beatScale <= 1.2f)
                            {
                                Debug.Log($"[Rhythm] Beat {currentBeatIndex + 1} SUCCESSFUL HIT!");
                                NextRhythmBeat(true);
                            }
                            else
                            {
                                Debug.LogWarning($"[Rhythm] Beat {currentBeatIndex + 1} BAD TIMING missed!");
                                NextRhythmBeat(false);
                            }
                        }
                    }
                    break;

                case QteType.ButtonMash:
                    {
                        // Time sweep for the taunt rhythm timeline
                        timingBarValue += Time.deltaTime * 0.66f;
                        if (timingBarValue >= 1.0f)
                        {
                            // Finished the timeline sweep, evaluate results
                            timingBarValue = 1.0f;
                            ResolveQte(EvaluateTauntAccuracy());
                            break;
                        }

                        // Listen to E and Q keys
                        if (Input.GetKeyDown(KeyCode.E) || Input.GetKeyDown(KeyCode.Q))
                        {
                            char pressedKey = Input.GetKeyDown(KeyCode.E) ? 'E' : 'Q';
                            EvaluateTauntRhythmTap(pressedKey);
                        }
                    }
                    break;

                case QteType.RuneDrawing:
                    {
                        // Mouse-Gesture Tracing click evaluation
                        if (Input.GetMouseButtonDown(0))
                        {
                            Vector2 targetPos = qteTracePoints[currentTraceIndex];
                            // Translate Unity Screen coordinates to GUI coordinates
                            Vector2 mouseGUI = new Vector2(Input.mousePosition.x, Screen.height - Input.mousePosition.y);
                            float dist = Vector2.Distance(mouseGUI, targetPos);
                            if (dist <= 30.0f) // 30 pixel click radius
                            {
                                currentTraceIndex++;
                                Debug.Log($"🎯 [Rune Trace] Hit Point {currentTraceIndex - 1}! Distance: {dist:F2}");
                                if (currentTraceIndex >= 3)
                                {
                                    // Successfully completed! Calculate speed factor
                                    float speedFactor = Mathf.Max(0.5f, 1.5f - qteTimeSpent / qteDuration);
                                    qteSpeedBonusMultiplier = speedFactor;
                                    Debug.Log($"🎯 [Rune Trace] Glyphs connected! Accuracy multiplier: {speedFactor:F2}x!");
                                    ResolveQte(QteResult.Perfect);
                                }
                            }
                            else
                            {
                                Debug.LogWarning($"💥 [Rune Trace] Clicked outside target point {currentTraceIndex}! Distance: {dist:F2}");
                            }
                        }
                    }
                    break;

                case QteType.OsuTarget:
                    {
                        if (qteOsuCurrentNode < 3)
                        {
                            // Shrink the active node approach ring
                            qteOsuApproachScale[qteOsuCurrentNode] -= Time.deltaTime * 1.25f;

                            // If scale falls below 0.5f, it auto-misses and advances
                            if (qteOsuApproachScale[qteOsuCurrentNode] <= 0.5f)
                            {
                                Debug.LogWarning($"[Osu Target] Spot {qteOsuCurrentNode + 1} missed (shrank past threshold)!");
                                qteOsuCurrentNode++;
                                if (qteOsuCurrentNode >= 3)
                                {
                                    ResolveOsuQteResult();
                                }
                            }
                            else if (Input.GetMouseButtonDown(0))
                            {
                                Vector2 targetPos = qteOsuNodes[qteOsuCurrentNode];
                                Vector2 mouseGUI = new Vector2(Input.mousePosition.x, Screen.height - Input.mousePosition.y);
                                float dist = Vector2.Distance(mouseGUI, targetPos);

                                if (dist <= 30.0f)
                                {
                                    float timingDiff = Mathf.Abs(qteOsuApproachScale[qteOsuCurrentNode] - 1.0f);
                                    if (timingDiff <= 0.15f)
                                    {
                                        qteOsuSuccessHits++;
                                        qteOsuAccuracySum += 1.0f;
                                        Debug.Log($"🎯 [Osu Target] Spot {qteOsuCurrentNode + 1} PERFECT HIT! Timing diff: {timingDiff:F2}");
                                    }
                                    else if (timingDiff <= 0.35f)
                                    {
                                        qteOsuSuccessHits++;
                                        qteOsuAccuracySum += 0.5f;
                                        Debug.Log($"🎯 [Osu Target] Spot {qteOsuCurrentNode + 1} GOOD HIT! Timing diff: {timingDiff:F2}");
                                    }
                                    else
                                    {
                                        Debug.LogWarning($"[Osu Target] Spot {qteOsuCurrentNode + 1} BAD TIMING hit! Timing diff: {timingDiff:F2}");
                                    }

                                    qteOsuCurrentNode++;
                                    if (qteOsuCurrentNode >= 3)
                                    {
                                        ResolveOsuQteResult();
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        }

        private void EvaluateTimingCheck(float value)
        {
            if (value >= timingPerfectSpotMin && value <= timingPerfectSpotMax)
            {
                ResolveQte(QteResult.Perfect);
            }
            else if (value >= timingSweetSpotMin && value <= timingSweetSpotMax)
            {
                ResolveQte(QteResult.NormalSuccess);
            }
            else
            {
                ResolveQte(QteResult.Fail);
            }
        }

        private void EvaluateDefenseCheck(float value, bool isParryAttempt)
        {
            if (isParryAttempt)
            {
                if (value >= defensePerfectStart && value <= defensePerfectEnd)
                {
                    ResolveQte(QteResult.Perfect);
                }
                else
                {
                    ResolveQte(QteResult.Fail);
                }
            }
            else // Block
            {
                if (value >= defenseWindowStart && value <= defenseWindowEnd)
                {
                    ResolveQte(QteResult.NormalSuccess);
                }
                else
                {
                    ResolveQte(QteResult.Fail);
                }
            }
        }

        private void CheckSequenceInputs()
        {
            if (qteSequenceIndex >= qteTargetSequence.Length) return;

            char targetKey = qteTargetSequence[qteSequenceIndex];
            string inputString = Input.inputString.ToUpper();
            if (!string.IsNullOrEmpty(inputString))
            {
                char pressedChar = inputString[0];
                if (pressedChar == targetKey)
                {
                    qteSequenceIndex++;
                    qteComboCurrent += pressedChar;
                    Debug.Log($"[QTE Sequence] Correct key! Progress: {qteComboCurrent}");

                    if (qteSequenceIndex >= qteTargetSequence.Length)
                    {
                        if (qteTimer >= qteDuration * 0.4f)
                        {
                            ResolveQte(QteResult.Perfect);
                        }
                        else
                        {
                            ResolveQte(QteResult.NormalSuccess);
                        }
                    }
                }
                else
                {
                    Debug.LogWarning($"[QTE Sequence] Wrong key! Pressed: {pressedChar}, Target: {targetKey}");
                    ResolveQte(QteResult.Fail);
                }
            }
        }

        private void CheckQteResolution()
        {
            if (!isQteResolutionPending) return;
            isQteResolutionPending = false;

            switch (pendingQteAction)
            {
                case PendingActionType.Strike:
                    ExecuteQteStrike();
                    break;
                case PendingActionType.CastSpell:
                    ExecuteQteCastSpell();
                    break;
                case PendingActionType.MonsterClaw:
                    ExecuteQteMonsterClaw();
                    break;
                case PendingActionType.CastBuff:
                    ExecuteQteCastBuff();
                    break;
                case PendingActionType.Taunt:
                    ExecuteQteTaunt();
                    break;
            }
            pendingQteAction = PendingActionType.None;
        }

        private void StartOffensiveStrikeQte()
        {
            Cursor.lockState = CursorLockMode.Locked;
            activeQteType = QteType.PrecisionTiming;
            qteDuration = 1.5f;
            qteTimer = qteDuration;
            timingBarValue = 0f;
            timingBarDirection = 1f;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.Strike;
            qteTimeSpent = 0f;
            qteBounceCount = 0;
            qteDecayMultiplier = 1.0f;
            Debug.Log("[QTE] Slashing timing QTE started! Press Space inside the sweet spot!");
        }

        private void ExecuteQteStrike()
        {
            TryPlayerStrike();
        }

        private void StartSpellCastQte()
        {
            Cursor.lockState = CursorLockMode.Locked;
            activeQteType = QteType.RuneSequence;
            expectedCombo = "SDF";
            currentComboInput = "";
            inComboPhase = true;
            currentBeatIndex = 0;
            successfulBeatsCount = 0;
            qteDuration = 2.0f;
            qteTimer = qteDuration;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.CastSpell;
            qteTimeSpent = 0f;
            qteBounceCount = 0;
            qteDecayMultiplier = 1.0f;
            Debug.Log("[QTE] Spell Combo Phase started! Press 'S', 'D', 'F' in quick succession!");
        }

        private void ExecuteQteCastSpell()
        {
            TryPlayerCastSpell();
        }

        private void StartMonsterClawDefensiveQte()
        {
            Cursor.lockState = CursorLockMode.Locked;
            activeQteType = QteType.ActiveDefense;
            qteDuration = 1.2f;
            qteTimer = qteDuration;
            timingBarValue = 0f;
            timingBarDirection = 1f;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.MonsterClaw;
            qteTimeSpent = 0f;
            qteBounceCount = 0;
            qteDecayMultiplier = 1.0f;
            Debug.Log("[QTE] Defensive trigger! Press Shift to Block, F to Parry!");
        }

        private void ExecuteQteMonsterClaw()
        {
            int roll;
            bool isCrit;
            RollModifiers rollMod = playerIsDodging ? RollModifiers.Disadvantage : RollModifiers.None;
            if (monsterEnraged)
            {
                monsterEnraged = false;
                rollMod = RollModifiers.Advantage;
                Debug.Log("[Monster Attack] Chuckles attacks with ADVANTAGE due to Enraged state!");
            }
            bool hit = combatSystem.PerformAttackRoll(monsterCombatState, playerCombatState, 3, rollMod, out roll, out isCrit);

            if (hit)
            {
                int diceCount = isCrit ? 2 : 1;
                int dmg = 0;
                for (int i = 0; i < diceCount; i++) dmg += UnityEngine.Random.Range(1, 7);
                dmg += 2;

                if (currentQteResult == QteResult.Perfect)
                {
                    dmg = 0;
                    isParryCounterTriggered = true;
                    Debug.Log("✨ PERFECT PARRY! Negated all incoming damage and triggered a Counter-Strike Reaction!");
                }
                else if (currentQteResult == QteResult.NormalSuccess)
                {
                    dmg = Mathf.FloorToInt(dmg / 2f);
                    Debug.Log($"🛡️ BLOCKED! Damage reduced by 50%. You take {dmg} damage.");
                }
                else
                {
                    dmg = Mathf.FloorToInt(dmg * 1.25f);
                    playerCombatState.isStaggered = true;
                    Debug.LogWarning($"💥 FAILED BLOCK! Taken ruthless off-guard hit for {dmg} damage! Staggered for next turn.");
                }

                if (dmg > 0)
                {
                    playerCombatState.currentHP = Mathf.Max(0, playerCombatState.currentHP - dmg);
                    Debug.Log($"[Monster AI] Chuckles deals {dmg} damage! (Your HP: {playerCombatState.currentHP}/{playerCombatState.maxHP})");

                    if (playerCombatState.currentHP <= 0)
                    {
                        playerCombatState.isDying = true;
                        playerCombatState.deathSaveSuccesses = 0;
                        playerCombatState.deathSaveFailures = 0;
                        Debug.LogWarning($"💥 {playerCombatState.name} has dropped to 0 HP and is DYING!");
                    }
                }
            }
            else
            {
                Debug.Log("[Monster AI] Chuckles missed his claw swipe.");
            }

            if (isParryCounterTriggered && playerHasReaction && playerCombatState.currentHP > 0)
            {
                playerHasReaction = false;
                isParryCounterTriggered = false;
                Debug.Log("⚔️ [Reaction Counter-Attack] Launching immediate parry strike!");
                TryPlayerStrike();
            }

            combatSystem.NextTurn();
            ResetPlayerTurnPools();

            monsterHasReaction = true;
            monsterIsDisengaged = false;
            monsterIsDodging = false;
        }

        private void ResolveQte(QteResult result)
        {
            currentQteResult = result;
            activeQteType = QteType.None;
            isQteResolutionPending = true;
            Debug.Log($"[QTE Resolution] Result: {result}");
            Cursor.lockState = CursorLockMode.None;
        }

        private void ResolveOsuQteResult()
        {
            float avgAccuracy = qteOsuAccuracySum / 3f;
            qteSpeedBonusMultiplier = avgAccuracy * 1.5f; // Up to 1.5x critical boost multiplier!
            
            QteResult res = QteResult.Fail;
            if (avgAccuracy >= 0.85f) res = QteResult.Perfect;
            else if (avgAccuracy >= 0.4f) res = QteResult.NormalSuccess;
            
            Debug.Log($"🎯 [Osu Target] Finished. Average Accuracy: {avgAccuracy:P0}. Hits: {qteOsuSuccessHits}/3. Speed bonus multiplier: {qteSpeedBonusMultiplier:F2}x!");
            ResolveQte(res);
        }

        private void DrawActiveQteInterface()
        {
            if (playerCombatState == null) return;

            // Project screen-space timing bars directly over the active character's head
            Vector3 targetWorldPos = transform.position;
            Vector3 screenPos = Camera.main.WorldToScreenPoint(targetWorldPos);
            if (screenPos.z < 0) return; // Behind camera

            float qteWidth = 240f;
            float qteHeight = 90f;
            float qteX = screenPos.x - qteWidth / 2f;
            float qteY = Screen.height - screenPos.y - 75f; // Float 75px above head

            // Draw mini-overlay container box
            GUI.Box(new Rect(qteX - 10f, qteY - 20f, qteWidth + 20f, qteHeight + 25f), "");

            // Draw timer bar inside the container
            float timerPercent = qteTimer / qteDuration;
            GUI.color = Color.yellow;
            GUI.Label(new Rect(qteX, qteY - 20f, qteWidth, 20f), $"⏱️ QTE: {qteTimer:F1}s remaining");
            GUI.color = Color.white;

            if (activeQteType == QteType.PrecisionTiming || activeQteType == QteType.ActiveDefense)
            {
                float barWidth = qteWidth;
                float barHeight = 14f;
                float barY = qteY + 25f;

                // Draw title with dynamic decay power indicator
                string title = activeQteType == QteType.PrecisionTiming ? $"Strike! Space ({qteDecayMultiplier:F2}x)" : $"Defend! Shift/F ({qteDecayMultiplier:F2}x)";
                GUI.Label(new Rect(qteX, qteY + 5f, barWidth, 20f), title);

                // Draw bar outline
                GUI.Box(new Rect(qteX, barY, barWidth, barHeight), "");

                if (activeQteType == QteType.PrecisionTiming)
                {
                    // Draw Sweet Spot (Green Zone)
                    float sweetX = qteX + timingSweetSpotMin * barWidth;
                    float sweetW = (timingSweetSpotMax - timingSweetSpotMin) * barWidth;
                    GUI.color = Color.green;
                    GUI.Box(new Rect(sweetX, barY, sweetW, barHeight), "");

                    // Draw Perfect Spot (Cyan Zone)
                    float perfectX = qteX + timingPerfectSpotMin * barWidth;
                    float perfectW = (timingPerfectSpotMax - timingPerfectSpotMin) * barWidth;
                    GUI.color = Color.cyan;
                    GUI.Box(new Rect(perfectX, barY, perfectW, barHeight), "");
                    GUI.color = Color.white;
                }
                else // ActiveDefense
                {
                    // Draw Block Window (Green Zone)
                    float blockX = qteX + defenseWindowStart * barWidth;
                    float blockW = (defenseWindowEnd - defenseWindowStart) * barWidth;
                    GUI.color = Color.green;
                    GUI.Box(new Rect(blockX, barY, blockW, barHeight), "");

                    // Draw Parry Window (Cyan Zone)
                    float parryX = qteX + defensePerfectStart * barWidth;
                    float parryW = (defensePerfectEnd - defensePerfectStart) * barWidth;
                    GUI.color = Color.cyan;
                    GUI.Box(new Rect(parryX, barY, parryW, barHeight), "");
                    GUI.color = Color.white;
                }

                // Draw current cursor tick (Red line)
                float cursorX = qteX + timingBarValue * barWidth;
                GUI.color = Color.red;
                GUI.Box(new Rect(cursorX - 2f, barY - 2f, 4f, barHeight + 4f), "");
                GUI.color = Color.white;
            }
            else if (activeQteType == QteType.RuneSequence)
            {
                if (pendingQteAction == PendingActionType.CastBuff)
                {
                    GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), "🪄 <strong>Rune Selection:</strong> Life + Shield!");
                    
                    // Show prompt and selection count
                    GUIStyle promptStyle = new GUIStyle();
                    promptStyle.richText = true;
                    promptStyle.alignment = TextAnchor.MiddleCenter;
                    promptStyle.normal.textColor = Color.white;
                    promptStyle.fontSize = 11;
                    
                    string selectedStr = string.Join(", ", qteRuneSelected.ToArray());
                    string promptText = $"Required: <color=yellow><strong>ᛒ (Life)</strong></color> and <color=cyan><strong>ᚦ (Shield)</strong></color>\nSelected: <color=green><strong>{selectedStr}</strong></color>";
                    GUI.Label(new Rect(qteX, qteY + 25f, qteWidth, 30f), promptText, promptStyle);

                    // Draw 5 clickable rune buttons in a row
                    float btnW = 32f;
                    float btnH = 24f;
                    float startP = qteX + (qteWidth - 5 * 38f) / 2f + 3f;
                    for (int i = 0; i < qteRuneOptions.Length; i++)
                    {
                        string rune = qteRuneOptions[i];
                        Rect r = new Rect(startP + i * 38f, qteY + 60f, btnW, btnH);
                        
                        // Set colors: Green if already selected correctly, white/default otherwise
                        if (qteRuneSelected.Contains(rune))
                        {
                            GUI.color = Color.green;
                        }
                        else
                        {
                            GUI.color = Color.white;
                        }

                        if (GUI.Button(r, rune))
                        {
                            // Process selection click
                            SelectRune(rune);
                        }
                    }
                    GUI.color = Color.white;
                }
                else if (inComboPhase)
                {
                    GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), "🕹️ <strong>Combo Input:</strong> Spell combo!");

                    // Draw combo sequence guide
                    string guide = "";
                    for (int i = 0; i < expectedCombo.Length; i++)
                    {
                        if (i < currentComboInput.Length)
                        {
                            guide += $"<color=green><strong>{expectedCombo[i]}</strong></color> ";
                        }
                        else if (i == currentComboInput.Length)
                        {
                            guide += $"<color=yellow><strong>[{expectedCombo[i]}]</strong></color> ";
                        }
                        else
                        {
                            guide += $"<color=silver>{expectedCombo[i]}</color> ";
                        }
                    }

                    GUIStyle style = new GUIStyle();
                    style.richText = true;
                    style.fontSize = 18;
                    style.alignment = TextAnchor.MiddleCenter;
                    style.normal.textColor = Color.white;

                    GUI.Label(new Rect(qteX, qteY + 35f, qteWidth, 35f), guide, style);
                }
                else
                {
                    GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), $"🧩 <strong>Pattern Match:</strong> (Errors: {qtePatternErrors})");
                    
                    float itemW = 16f;
                    float gap = 22f;
                    float startP = qteX + (qteWidth - qtePatternMaxKeys * gap) / 2f + 3f;
                    for (int i = 0; i < qtePatternMaxKeys; i++)
                    {
                        char ch = qteTargetPattern[i];
                        Rect r = new Rect(startP + i * gap, qteY + 38f, itemW, 20f);
                        
                        if (i < qtePatternProgress)
                        {
                            GUI.color = Color.green; // Completed key
                        }
                        else
                        {
                            if (ch == 'Q') GUI.color = new Color(1.0f, 0.3f, 0.3f);      // Red Q
                            else if (ch == 'E') GUI.color = new Color(0.3f, 0.8f, 1.0f); // Cyan E
                            else GUI.color = new Color(1.0f, 0.9f, 0.2f);                // Yellow R
                        }

                        GUI.Box(r, ch.ToString());
                    }
                    GUI.color = Color.white;
                    
                    GUIStyle style = new GUIStyle();
                    style.richText = true;
                    style.fontSize = 12;
                    style.alignment = TextAnchor.MiddleCenter;
                    style.normal.textColor = Color.white;
                    GUI.Label(new Rect(qteX, qteY + 65f, qteWidth, 20f), $"Type pattern from left to right!", style);
                }
            }
            else if (activeQteType == QteType.RhythmTempo)
            {
                string ringDir = beatDirection > 0 ? "EXPANDING" : "COLLAPSING";
                GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), $"✨ <strong>Rhythm Beat {currentBeatIndex + 1}/3:</strong>");
                
                float barWidth = qteWidth;
                float barHeight = 16f;
                float barY = qteY + 35f;
                GUI.Box(new Rect(qteX, barY, barWidth, barHeight), "");

                // Draw Sweet Zone
                float sweetX = qteX + ((rhythmPulseTargetMin - 0.5f) / 1.5f) * barWidth;
                float sweetW = ((rhythmPulseTargetMax - rhythmPulseTargetMin) / 1.5f) * barWidth;
                GUI.color = Color.green;
                GUI.Box(new Rect(sweetX, barY, sweetW, barHeight), "ALIGN");
                GUI.color = Color.white;

                // Draw Perfect Zone
                float perfectX = qteX + ((rhythmPulsePerfectMin - 0.5f) / 1.5f) * barWidth;
                float perfectW = ((rhythmPulsePerfectMax - rhythmPulsePerfectMin) / 1.5f) * barWidth;
                GUI.color = Color.cyan;
                GUI.Box(new Rect(perfectX, barY, perfectW, barHeight), "");
                GUI.color = Color.white;

                // Draw collapsing/expanding ring cursor
                float cursorX = qteX + ((beatScale - 0.5f) / 1.5f) * barWidth;
                GUI.color = Color.red;
                GUI.Box(new Rect(cursorX - 2f, barY - 2f, 4f, barHeight + 4f), "");
                GUI.color = Color.white;
            }
            else if (activeQteType == QteType.ButtonMash)
            {
                GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), $"🗣️ <strong>Timed Taunt:</strong> Node: {tauntSuccessHits}/3");
                
                float barWidth = qteWidth;
                float barHeight = 16f;
                float barY = qteY + 35f;
                GUI.Box(new Rect(qteX, barY, barWidth, barHeight), "");

                float nodeW = 16f;
                float nodeH = barHeight;

                GUI.color = currentTauntNode <= 0 ? Color.yellow : Color.green;
                GUI.Box(new Rect(qteX + 0.25f * barWidth - nodeW / 2f, barY, nodeW, nodeH), "E");

                GUI.color = currentTauntNode == 1 ? Color.yellow : (currentTauntNode > 1 ? Color.green : Color.white);
                GUI.Box(new Rect(qteX + 0.55f * barWidth - nodeW / 2f, barY, nodeW, nodeH), "Q");

                GUI.color = currentTauntNode == 2 ? Color.yellow : (currentTauntNode > 2 ? Color.green : Color.white);
                GUI.Box(new Rect(qteX + 0.85f * barWidth - nodeW / 2f, barY, nodeW, nodeH), "E");

                GUI.color = Color.white;

                // Draw sweeping red timeline cursor
                float cursorX = qteX + timingBarValue * barWidth;
                GUI.color = Color.red;
                GUI.Box(new Rect(cursorX - 2f, barY - 2f, 4f, barHeight + 4f), "");
                GUI.color = Color.white;
            }
            else if (activeQteType == QteType.RuneDrawing)
            {
                // Update click checkpoints to float dynamically around the character's head!
                float headX = screenPos.x;
                float headY = Screen.height - screenPos.y - 50f;
                qteTracePoints[0] = new Vector2(headX - 45f, headY + 25f); // bottom left
                qteTracePoints[1] = new Vector2(headX, headY - 40f);      // top peak
                qteTracePoints[2] = new Vector2(headX + 45f, headY + 25f); // bottom right

                GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), "🪄 <strong>Trace Glyphs:</strong> 1 -> 2 -> 3");

                for (int i = 0; i < 3; i++)
                {
                    Vector2 pt = qteTracePoints[i];
                    Rect r = new Rect(pt.x - 12f, pt.y - 12f, 24f, 24f);

                    if (i == currentTraceIndex)
                    {
                        GUI.color = Color.green; // Active target
                    }
                    else if (i < currentTraceIndex)
                    {
                        GUI.color = Color.cyan; // Already hit
                    }
                    else
                    {
                        GUI.color = Color.white; // Pending
                    }

                    GUI.Box(r, (i + 1).ToString());
                }
                GUI.color = Color.white;
            }
            else if (activeQteType == QteType.OsuTarget)
            {
                GUI.Label(new Rect(qteX, qteY + 5f, qteWidth, 20f), "🎯 <strong>Assassinate:</strong> Weak spot!");
                GUI.Label(new Rect(qteX, qteY + 30f, qteWidth, 25f), $"Target: {qteOsuCurrentNode + 1}/3 (Hits: {qteOsuSuccessHits})");

                if (qteOsuCurrentNode < 3)
                {
                    // Draw approach spots dynamically over the scene
                    for (int i = 0; i < 3; i++)
                    {
                        Vector2 pt = qteOsuNodes[i];
                        if (i == qteOsuCurrentNode)
                        {
                            // Active core target circle
                            Rect coreRect = new Rect(pt.x - 12f, pt.y - 12f, 24f, 24f);
                            GUI.color = Color.green;
                            GUI.Box(coreRect, "🎯");

                            // Shrinking approach ring
                            float currentScale = qteOsuApproachScale[i];
                            float size = 24f * currentScale;
                            Rect approachRect = new Rect(pt.x - size / 2f, pt.y - size / 2f, size, size);
                            
                            float timingDiff = Mathf.Abs(currentScale - 1.0f);
                            GUI.color = timingDiff <= 0.15f ? Color.cyan : (timingDiff <= 0.35f ? Color.green : Color.yellow);
                            GUI.Box(approachRect, "");
                        }
                        else
                        {
                            // Inactive targets
                            Rect r = new Rect(pt.x - 8f, pt.y - 8f, 16f, 16f);
                            GUI.color = i < qteOsuCurrentNode ? Color.cyan : Color.gray;
                            GUI.Box(r, "");
                        }
                    }
                    GUI.color = Color.white;
                }
            }
        }

        private void StartCastBuffQte()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }
            playerHasAction = false;

            Cursor.lockState = CursorLockMode.None; // Unlock cursor for rune clicking!
            activeQteType = QteType.RuneSequence;
            qteRuneRequired = new string[] { "ᛒ", "ᚦ" }; // Blessing: Life (ᛒ) + Shield (ᚦ)
            qteRuneSelected.Clear();
            
            qteDuration = 4.0f; // 4 seconds to solve
            qteTimer = qteDuration;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.CastBuff;
            qteTimeSpent = 0f;
            qteBounceCount = 0;
            qteDecayMultiplier = 1.0f;
            qtePatternErrors = 0;
            Debug.Log("[QTE] Rune Symbol Recognition Puzzle started! Select runes: Life + Shield!");
        }

        private void SelectRune(string rune)
        {
            if (qteRuneSelected.Contains(rune)) return; // already selected

            bool isCorrect = false;
            foreach (var req in qteRuneRequired)
            {
                if (req == rune) isCorrect = true;
            }

            if (isCorrect)
            {
                qteRuneSelected.Add(rune);
                Debug.Log($"🎯 [Rune Choice] Correct rune selected: {rune} ({qteRuneSelected.Count}/{qteRuneRequired.Length})");
                if (qteRuneSelected.Count >= qteRuneRequired.Length)
                {
                    // Full success!
                    qteSpeedBonusMultiplier = 1.0f;
                    ResolveQte(QteResult.Perfect);
                }
            }
            else
            {
                qtePatternErrors++;
                Debug.LogWarning($"💥 [Rune Choice] Incorrect rune selected: {rune}! Errors: {qtePatternErrors}");
            }
        }

        private void ExecuteQteCastBuff()
        {
            if (currentQteResult == QteResult.Perfect)
            {
                Debug.Log("✨ PERFECT BLESSING! Casting adds +1d4 to all rolls for 3 turns, and heals you for 1d8 HP!");
                int heal = UnityEngine.Random.Range(1, 9);
                playerCombatState.currentHP = Mathf.Min(playerCombatState.maxHP, playerCombatState.currentHP + heal);
                Debug.Log($"[Spell] Healed for {heal} HP! Current HP: {playerCombatState.currentHP}/{playerCombatState.maxHP}");
            }
            else if (currentQteResult == QteResult.NormalSuccess)
            {
                Debug.Log("✨ BLESSING SUCCESS! Cast blessing adds +1d4 to all rolls for 3 turns.");
            }
            else // QteResult.Fail
            {
                int backlash = UnityEngine.Random.Range(1, 5);
                playerCombatState.currentHP = Mathf.Max(0, playerCombatState.currentHP - backlash);
                playerCombatState.isStaggered = true;
                Debug.LogError($"💥 RUTHLESS SPELL BACKFIRE! Took {backlash} psychic damage and got Staggered next turn!");

                if (playerCombatState.currentHP <= 0)
                {
                    playerCombatState.isDying = true;
                    playerCombatState.deathSaveSuccesses = 0;
                    playerCombatState.deathSaveFailures = 0;
                    Debug.LogWarning("💥 Caster has dropped to 0 HP from psychic backlash!");
                }
            }
        }

        private void StartOsuClickQte()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }
            playerHasAction = false;

            Cursor.lockState = CursorLockMode.None; // Free cursor for clicking!
            activeQteType = QteType.OsuTarget;
            qteOsuCurrentNode = 0;
            qteOsuSuccessHits = 0;
            qteOsuAccuracySum = 0f;
            qteDuration = 3.6f; // 1.2s per weak spot target
            qteTimer = qteDuration;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.Strike; // Ranger sniper strike!
            qteTimeSpent = 0f;
            qteBounceCount = 0;
            qteDecayMultiplier = 1.0f;
            qteSpeedBonusMultiplier = 1.0f;

            // Define 3 weak point click positions on screen relative to monster position
            Vector3 monsterWorldPos = new Vector3(3f, 0.5f, 3f); // average monster height/coord
            Vector3 monsterScreen = Camera.main.WorldToScreenPoint(monsterWorldPos);
            float screenH = Screen.height;

            // Spot 1: Head (slightly above center)
            qteOsuNodes[0] = new Vector2(monsterScreen.x - 20f, screenH - monsterScreen.y - 65f);
            qteOsuApproachScale[0] = 2.0f;

            // Spot 2: Chest (center)
            qteOsuNodes[1] = new Vector2(monsterScreen.x, screenH - monsterScreen.y - 15f);
            qteOsuApproachScale[1] = 2.0f;

            // Spot 3: Limb (bottom right leg)
            qteOsuNodes[2] = new Vector2(monsterScreen.x + 35f, screenH - monsterScreen.y + 35f);
            qteOsuApproachScale[2] = 2.0f;

            Debug.Log("[QTE] Osu Target Weak Point clicker started! Move cursor and click the shrinking rings on the monster!");
        }

        private void StartRuneDrawingQte()
        {
            Cursor.lockState = CursorLockMode.None; // Require free cursor to trace!
            activeQteType = QteType.RuneDrawing;
            qteDuration = 2.0f;
            qteTimer = qteDuration;
            currentTraceIndex = 0;
            qteTimeSpent = 0f;
            qteSpeedBonusMultiplier = 1.0f;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.CastSpell; // resolves to spell cast!
            
            // Define 3 triangular screen-space coordinates for tracing relative to screen center
            float cenX = Screen.width / 2f;
            float cenY = Screen.height / 2f - 40f;
            qteTracePoints[0] = new Vector2(cenX - 50f, cenY + 30f); // bottom left
            qteTracePoints[1] = new Vector2(cenX, cenY - 50f);      // top peak
            qteTracePoints[2] = new Vector2(cenX + 50f, cenY + 30f); // bottom right
            
            Debug.Log("[QTE] Rune Drawing Trace QTE started! Move mouse and CLICK on the 3 vertices in numerical order!");
        }

        private string GenerateRandomPattern(string pool, int length)
        {
            string res = "";
            for (int i = 0; i < length; i++)
            {
                res += pool[UnityEngine.Random.Range(0, pool.Length)];
            }
            return res;
        }

        private void StartTauntPatternQte()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }
            playerHasAction = false;

            Cursor.lockState = CursorLockMode.Locked;
            activeQteType = QteType.RuneSequence;
            inComboPhase = false;
            qtePatternMaxKeys = 8;
            qteTargetPattern = GenerateRandomPattern("QE", qtePatternMaxKeys);
            qtePatternProgress = 0;
            qtePatternErrors = 0;
            qteDuration = 3.5f;
            qteTimer = qteDuration;
            qteTimeSpent = 0f;
            qteSpeedBonusMultiplier = 1.0f;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.Taunt; // resolves to Taunt!
            
            Debug.Log($"[QTE] 2-Key Taunt Pattern started! Target: {qteTargetPattern}");
        }

        private void StartRuneSequencePatternQte()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }
            playerHasAction = false;

            Cursor.lockState = CursorLockMode.Locked;
            activeQteType = QteType.RuneSequence;
            inComboPhase = false;
            qtePatternMaxKeys = 10;
            qteTargetPattern = GenerateRandomPattern("QER", qtePatternMaxKeys);
            qtePatternProgress = 0;
            qtePatternErrors = 0;
            qteDuration = 4.0f;
            qteTimer = qteDuration;
            qteTimeSpent = 0f;
            qteSpeedBonusMultiplier = 1.0f;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.CastSpell; // resolves to Spell!
            
            Debug.Log($"[QTE] 3-Key Rune Sequence Pattern started! Target: {qteTargetPattern}");
        }

        private void StartTauntQte()
        {
            if (!playerHasAction)
            {
                Debug.LogWarning("[Combat] No Action remaining this turn!");
                return;
            }
            playerHasAction = false;

            Cursor.lockState = CursorLockMode.Locked;
            activeQteType = QteType.ButtonMash; // reuse to run rhythm sweep
            qteDuration = 1.5f;
            qteTimer = qteDuration;
            timingBarValue = 0f;
            currentTauntNode = 0;
            tauntSuccessHits = 0;
            tauntAccuracyPct = 1.0f;
            currentQteResult = QteResult.None;
            isQteResolutionPending = false;
            pendingQteAction = PendingActionType.Taunt;
            Debug.Log("[QTE] Timed Taunt sweep timeline started!");
        }

        private void ExecuteQteTaunt()
        {
            if (currentQteResult == QteResult.Perfect)
            {
                monsterCombatState.isTaunted = true;
                Debug.Log($"⚔️ PERFECT ROAR! Timed Taunt rhythm succeeded with 100% accuracy! Chuckles is TAUNTED (Wisdom DC 16). Attacks against anyone else have disadvantage!");
            }
            else if (currentQteResult == QteResult.NormalSuccess)
            {
                monsterCombatState.isTaunted = true;
                Debug.Log($"⚔️ TAUNT SUCCESS! Timed Taunt rhythm succeeded with {tauntAccuracyPct:P0} accuracy! Chuckles is taunted (Wisdom DC 13).");
            }
            else // QteResult.Fail
            {
                monsterEnraged = true;
                Debug.LogWarning($"💥 TAUNT RHYTHM FAILED! Accuracy: {tauntAccuracyPct:P0}. Chuckles is ENRAGED and gets Advantage on its next attack!");
            }
        }

        private void EnterAimingMode(string type)
        {
            isAimingAttack = true;
            aimingType = type;
            highlightedCells.Clear();

            switch (type)
            {
                case "Strike":
                    highlightedCells.Add(monsterCombatState.gridPosition);
                    break;
                case "Spell":
                    highlightedCells = combatSystem.CalculateAoE(AbilityAoEShape.Blast, monsterCombatState.gridPosition, 2);
                    break;
                case "Buff":
                    highlightedCells = combatSystem.CalculateAoE(AbilityAoEShape.Blast, playerCombatState.gridPosition, 1);
                    break;
                case "Taunt":
                    Vector3Int dir = monsterCombatState.gridPosition - playerCombatState.gridPosition;
                    highlightedCells = combatSystem.CalculateAoE(AbilityAoEShape.Cone, playerCombatState.gridPosition, 3, dir);
                    break;
            }
            
            // Clear and scan collateral targets in the prepped aiming voxels
            collateralWarnings.Clear();
            foreach (var cell in highlightedCells)
            {
                // Self damage threat check
                if (cell == playerCombatState.gridPosition && type != "Buff")
                {
                    collateralWarnings.Add($"⚠️ PLAYER at [{cell.x}, {cell.y}, {cell.z}] (SELF DAMAGE danger!)");
                }
                
                // Simulated destructibles inside specific voxel nodes
                if (cell == new Vector3Int(2, 0, 2))
                {
                    collateralWarnings.Add($"💥 BARRELS at [2, 0, 2] (Explosive Hazard!)");
                }
                if (cell == new Vector3Int(4, 0, 3))
                {
                    collateralWarnings.Add($"💥 BARRICADE at [4, 0, 3] (Destructible Obstacle)");
                }
            }

            Debug.Log($"[Aiming] prepped target aiming for {type}. Highlighting {highlightedCells.Count} cells with {collateralWarnings.Count} collateral warnings.");
        }

        private void DrawAimingOverlayInterface()
        {
            float screenWidth = Screen.width;
            float screenHeight = Screen.height;
            float aimWidth = 400f;
            float aimHeight = 250f;
            float aimX = (screenWidth - aimWidth) / 2f;
            float aimY = (screenHeight - aimHeight) / 2f - 30f;

            GUI.Box(new Rect(aimX, aimY, aimWidth, aimHeight), $"🎯 TARGET AIMING PREVIEW: {aimingType.ToUpper()} 🎯");

            string cellsText = "Targeted 3D Voxel Cells:\n";
            if (currentGridMode != GridVisibilityMode.None)
            {
                string prefix = currentGridMode == GridVisibilityMode.InteractionOnly ? "[Interact-Only] " : "";
                for (int i = 0; i < Mathf.Min(highlightedCells.Count, 4); i++)
                {
                    Vector3Int cell = highlightedCells[i];
                    cellsText += $"  * {prefix}Cube at [{cell.x}, {cell.y}, {cell.z}]\n";
                }
                if (highlightedCells.Count > 4)
                {
                    cellsText += $"  * ... and {highlightedCells.Count - 4} more cells.\n";
                }
            }
            else
            {
                cellsText += "  * [Grid cubes hidden via Mode Cycle/G key] *\n";
            }

            GUI.Label(new Rect(aimX + 20f, aimY + 25f, 360f, 75f), cellsText);

            // Display Collateral warnings in light orangish-red if scan detected any
            if (collateralWarnings.Count > 0)
            {
                GUI.color = new Color(1.0f, 0.45f, 0.2f); // Light Orangish-Red
                string warningText = "COLLATERAL DANGER WARNINGS:\n" + string.Join("\n", collateralWarnings.ToArray());
                GUI.Label(new Rect(aimX + 20f, aimY + 105f, 360f, 60f), warningText);
                GUI.color = Color.white;
            }

            // Draw confirmations based on targeted action type to select the QTE style
            if (aimingType == "Spell")
            {
                if (GUI.Button(new Rect(aimX + 15f, aimY + 175f, 115f, 25f), "Confirm (Combo)"))
                {
                    isAimingAttack = false;
                    StartSpellCastQte();
                }
                if (GUI.Button(new Rect(aimX + 135f, aimY + 175f, 115f, 25f), "Confirm (Trace)"))
                {
                    isAimingAttack = false;
                    StartRuneDrawingQte();
                }
                if (GUI.Button(new Rect(aimX + 255f, aimY + 175f, 130f, 25f), "Confirm (3-Key QER)"))
                {
                    isAimingAttack = false;
                    StartRuneSequencePatternQte();
                }
            }
            else if (aimingType == "Taunt")
            {
                if (GUI.Button(new Rect(aimX + 20f, aimY + 175f, 170f, 25f), "Confirm (Sweep)"))
                {
                    isAimingAttack = false;
                    StartTauntQte();
                }
                if (GUI.Button(new Rect(aimX + 210f, aimY + 175f, 170f, 25f), "Confirm (2-Key QE)"))
                {
                    isAimingAttack = false;
                    StartTauntPatternQte();
                }
            }
            else if (aimingType == "Strike")
            {
                if (GUI.Button(new Rect(aimX + 20f, aimY + 175f, 170f, 25f), "Confirm (Slash Timing)"))
                {
                    isAimingAttack = false;
                    StartOffensiveStrikeQte();
                }
                if (GUI.Button(new Rect(aimX + 210f, aimY + 175f, 170f, 25f), "Confirm (Precision Shot)"))
                {
                    isAimingAttack = false;
                    StartOsuClickQte();
                }
            }
            else // Buff
            {
                if (GUI.Button(new Rect(aimX + 20f, aimY + 175f, 360f, 25f), "Confirm Action"))
                {
                    isAimingAttack = false;
                    StartCastBuffQte();
                }
            }

            if (GUI.Button(new Rect(aimX + 20f, aimY + 210f, 360f, 25f), "Cancel"))
            {
                isAimingAttack = false;
                highlightedCells.Clear();
                collateralWarnings.Clear();
                playerHasAction = true;
                Debug.Log("[Aiming] Canceled attack aiming.");
            }
        }

        private void EvaluateTauntRhythmTap(char pressedKey)
        {
            if (currentTauntNode >= 3) return;

            char expectedKey = currentTauntNode == 1 ? 'Q' : 'E';
            float targetCenter = currentTauntNode == 0 ? 0.25f : (currentTauntNode == 1 ? 0.55f : 0.85f);
            
            // Check if cursor is inside the timing window
            float diff = Mathf.Abs(timingBarValue - targetCenter);
            bool isCorrectKey = pressedKey == expectedKey;

            if (isCorrectKey && diff <= 0.08f)
            {
                tauntSuccessHits++;
                Debug.Log($"🎯 [Taunt Rhythm] Hit Node {currentTauntNode} ({pressedKey})! Timing Diff: {diff:F3}");
            }
            else
            {
                // Penalty: degrades accuracy
                tauntAccuracyPct -= 0.25f;
                Debug.LogWarning($"💥 [Taunt Rhythm] Missed Node {currentTauntNode}! Expected: {expectedKey} at {targetCenter}, Pressed: {pressedKey} at {timingBarValue:F2}");
            }
            
            currentTauntNode++;
        }

        private QteResult EvaluateTauntAccuracy()
        {
            float finalScore = (tauntSuccessHits / 3.0f) * tauntAccuracyPct;
            Debug.Log($"[Taunt QTE] Completed. Hits: {tauntSuccessHits}/3, Accuracy: {tauntAccuracyPct:P0}, Final Score: {finalScore:F2}");

            if (tauntSuccessHits == 3 && tauntAccuracyPct >= 0.9f)
            {
                return QteResult.Perfect;
            }
            else if (tauntSuccessHits >= 1 && tauntAccuracyPct >= 0.4f)
            {
                return QteResult.NormalSuccess;
            }
            else
            {
                return QteResult.Fail;
            }
        }

        private void NextRhythmBeat(bool success)
        {
            if (success) successfulBeatsCount++;
            currentBeatIndex++;

            if (currentBeatIndex >= 3)
            {
                if (successfulBeatsCount == 3) ResolveQte(QteResult.Perfect);
                else if (successfulBeatsCount >= 1) ResolveQte(QteResult.NormalSuccess);
                else ResolveQte(QteResult.Fail);
            }
            else
            {
                // Set up next beat pattern (alternate shrinking/growing)
                qteDuration = 1.2f;
                qteTimer = qteDuration;
                
                if (currentBeatIndex == 1)
                {
                    // Beat 1: Expanding from center (0.5 to 2.0)
                    beatScale = 0.5f;
                    beatDirection = 1.0f;
                }
                else
                {
                    // Beat 2: Shrinking from outside (2.0 to 0.5)
                    beatScale = 2.0f;
                    beatDirection = -1.0f;
                }
                Debug.Log($"[QTE Rhythm] Beat {currentBeatIndex + 1} started! {(beatDirection > 0 ? "EXPANDING" : "SHRINKING")} ring!");
            }
        }
    }
}
