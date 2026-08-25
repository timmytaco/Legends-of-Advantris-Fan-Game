using System;
using System.Collections.Generic;
using UnityEngine;

namespace Avantris
{
    public enum AbilityAoEShape { Single, Line, Cone, Blast }
    public enum SavingThrowType { Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, None }
    public enum RollModifiers { None, Advantage, Disadvantage }
    public enum QteType { None, PrecisionTiming, InputCombo, RuneSequence, ActiveDefense, RhythmTempo, ButtonMash, RuneDrawing, OsuTarget }
    public enum QteResult { None, Fail, NormalSuccess, Perfect }

    [System.Serializable]
    public class CombatAbility
    {
        public string name;
        public AbilityAoEShape shape;
        public int rangeInSpaces = 6;      // Range / Reach
        public int lengthInSpaces = 3;     // For lines/cones
        public int radiusInSpaces = 2;     // For blast/radius
        public int damageDiceCount = 2;
        public int damageDiceSides = 6;
        public int damageModifier = 2;
        public SavingThrowType saveRequired = SavingThrowType.None;
        public int saveDC = 12;
        public bool isInitiativeModifier = false; // For spells like "First Strike"
    }

    [System.Serializable]
    public class CharacterCombatState
    {
        public string characterId;
        public string name;
        public Vector3Int gridPosition;
        public int currentHP;
        public int maxHP;
        public int armorClass = 15;        // D&D AC
        public int initiativeRoll;
        public int initiativeModifier;      // Usually Dex modifier
        public CharacterStats stats;        // D&D Stats reference
        public bool isPlayerControlled;
        public int deathSaveSuccesses = 0;
        public int deathSaveFailures = 0;
        public bool isDying = false;
        public bool isDead = false;
        public bool isStable = false;
        public bool canFly = false;
        public bool canBurrow = false;
        public int landSpeed = 6;
        public int flySpeed = 6;
        public int burrowSpeed = 3;
        public bool isStaggered = false;
        public bool isSilenced = false;
        public bool isTaunted = false;
    }

    public class GridCombatSystem : MonoBehaviour
    {
        [Header("Grid Config")]
        public float cellSize = 1.5f;       // Size of each grid tile (5 ft in D&D)
        public int gridWidth = 10;
        public int gridHeight = 10;
        public Vector3 gridOrigin = Vector3.zero;

        [Header("Combat Queue")]
        public List<CharacterCombatState> combatants = new List<CharacterCombatState>();
        private int currentTurnIndex = 0;
        private bool combatActive = false;

        // Start combat: rolls initiative and sorts turn order
        public void StartCombat(List<CharacterCombatState> participants)
        {
            combatants = new List<CharacterCombatState>(participants);
            RollInitiativeForCombatants();
            SortTurnOrder();
            currentTurnIndex = 0;
            combatActive = true;
            
            Debug.Log($"[CombatEngine] Combat started! Turn order: {GetTurnOrderString()}");
        }

        private void RollInitiativeForCombatants()
        {
            foreach (var c in combatants)
            {
                int roll = UnityEngine.Random.Range(1, 21); // d20
                c.initiativeRoll = roll + c.initiativeModifier;
                Debug.Log($"[Initiative] {c.name} rolled d20 ({roll}) + {c.initiativeModifier} = {c.initiativeRoll}");
            }
        }

        private void SortTurnOrder()
        {
            // Sort descending by initiative roll
            combatants.Sort((a, b) => b.initiativeRoll.CompareTo(a.initiativeRoll));
        }

        private string GetTurnOrderString()
        {
            List<string> names = new List<string>();
            foreach (var c in combatants)
            {
                names.Add($"{c.name} ({c.initiativeRoll})");
            }
            return string.Join(" -> ", names);
        }

        // Apply "First Strike" spell to increase initiative
        public void CastFirstStrike(CharacterCombatState caster, CombatAbility ability)
        {
            if (ability.isInitiativeModifier)
            {
                caster.initiativeRoll += 5; // Add +5 initiative bonus
                SortTurnOrder();
                Debug.Log($"[Spell] {caster.name} cast First Strike! New Initiative: {caster.initiativeRoll}. Turn order updated.");
            }
        }

        // D&D Combat checks: rolls d20 + modifier vs target Armor Class (AC) with advantage/disadvantage and critical support
        public bool PerformAttackRoll(CharacterCombatState attacker, CharacterCombatState defender, int attackBonus, RollModifiers rollMod, out int rolledVal, out bool isCritical)
        {
            int d20 = UnityEngine.Random.Range(1, 21);
            if (rollMod == RollModifiers.Advantage)
            {
                int d20Alt = UnityEngine.Random.Range(1, 21);
                d20 = Mathf.Max(d20, d20Alt);
                Debug.Log($"[Attack Roll] Rolled with Advantage: {d20} vs {d20Alt} -> Final d20: {d20}");
            }
            else if (rollMod == RollModifiers.Disadvantage)
            {
                int d20Alt = UnityEngine.Random.Range(1, 21);
                d20 = Mathf.Min(d20, d20Alt);
                Debug.Log($"[Attack Roll] Rolled with Disadvantage: {d20} vs {d20Alt} -> Final d20: {d20}");
            }

            rolledVal = d20;
            isCritical = false;

            if (d20 == 20)
            {
                isCritical = true;
                Debug.Log($"🎯 CRITICAL HIT! {attacker.name} rolled a natural 20!");
                return true; // Natural 20 is always a hit
            }
            if (d20 == 1)
            {
                Debug.Log($"❌ CRITICAL FAILURE! {attacker.name} rolled a natural 1!");
                return false; // Natural 1 is always a miss
            }

            int total = d20 + attackBonus;
            bool hit = total >= defender.armorClass;
            Debug.Log($"[Attack Roll] {attacker.name} vs {defender.name}: d20 ({d20}) + bonus ({attackBonus}) = {total} vs AC {defender.armorClass} -> {(hit ? "HIT" : "MISS")}");
            return hit;
        }

        // D&D Saving throw checks: target rolls d20 + stat modifier vs spell save DC with advantage/disadvantage support
        public bool PerformSavingThrow(CharacterCombatState defender, SavingThrowType saveType, int dc, RollModifiers rollMod, out int rolledVal)
        {
            int d20 = UnityEngine.Random.Range(1, 21);
            if (rollMod == RollModifiers.Advantage)
            {
                int d20Alt = UnityEngine.Random.Range(1, 21);
                d20 = Mathf.Max(d20, d20Alt);
                Debug.Log($"[Save Throw] Rolled with Advantage: {d20} vs {d20Alt} -> Final d20: {d20}");
            }
            else if (rollMod == RollModifiers.Disadvantage)
            {
                int d20Alt = UnityEngine.Random.Range(1, 21);
                d20 = Mathf.Min(d20, d20Alt);
                Debug.Log($"[Save Throw] Rolled with Disadvantage: {d20} vs {d20Alt} -> Final d20: {d20}");
            }

            rolledVal = d20;
            
            int statVal = 10;
            if (defender.stats != null)
            {
                switch (saveType)
                {
                    case SavingThrowType.Strength: statVal = defender.stats.strength; break;
                    case SavingThrowType.Dexterity: statVal = defender.stats.dexterity; break;
                    case SavingThrowType.Constitution: statVal = defender.stats.constitution; break;
                    case SavingThrowType.Intelligence: statVal = defender.stats.intelligence; break;
                    case SavingThrowType.Wisdom: statVal = defender.stats.wisdom; break;
                    case SavingThrowType.Charisma: statVal = defender.stats.charisma; break;
                }
            }

            int modifier = Mathf.FloorToInt((statVal - 10) / 2f);
            int total = d20 + modifier;
            bool success = total >= dc;

            Debug.Log($"[Save Throw] {defender.name} rolls {saveType} Save: d20 ({d20}) + mod ({modifier}) = {total} vs DC {dc} -> {(success ? "SUCCESS" : "FAIL")}");
            return success;
        }

        // Roll damage dice (doubling damage dice for critical hits)
        public int RollDamage(CombatAbility ability, bool isCritical)
        {
            int total = 0;
            int diceCount = isCritical ? ability.damageDiceCount * 2 : ability.damageDiceCount;
            
            for (int i = 0; i < diceCount; i++)
            {
                total += UnityEngine.Random.Range(1, ability.damageDiceSides + 1);
            }
            
            int finalDamage = total + ability.damageModifier;
            Debug.Log($"[Damage Roll] Rolled {diceCount}d{ability.damageDiceSides} + {ability.damageModifier} = {finalDamage}{(isCritical ? " (CRITICAL DAMAGE!)" : "")}");
            return finalDamage;
        }

        // D&D Death Saving Throw: rolls a d20 with no modifiers. Accumulates 3 successes/failures.
        public void PerformDeathSavingThrow(CharacterCombatState character, out int rolledVal)
        {
            int d20 = UnityEngine.Random.Range(1, 21);
            rolledVal = d20;

            if (d20 == 20)
            {
                character.currentHP = 1;
                character.isDying = false;
                character.isStable = false;
                character.deathSaveSuccesses = 0;
                character.deathSaveFailures = 0;
                Debug.Log($"❤️ [Death Save] {character.name} rolled a natural 20! Regained 1 HP and woke up stable!");
                return;
            }
            if (d20 == 1)
            {
                character.deathSaveFailures += 2;
                Debug.Log($"💀 [Death Save] {character.name} rolled a natural 1! Accumulated 2 failures (Total: {character.deathSaveFailures}/3).");
            }
            else if (d20 >= 10)
            {
                character.deathSaveSuccesses++;
                Debug.Log($"🟢 [Death Save] {character.name} rolled {d20} (Success). Total successes: {character.deathSaveSuccesses}/3.");
            }
            else
            {
                character.deathSaveFailures++;
                Debug.Log($"🔴 [Death Save] {character.name} rolled {d20} (Failure). Total failures: {character.deathSaveFailures}/3.");
            }

            if (character.deathSaveSuccesses >= 3)
            {
                character.isDying = false;
                character.isStable = true;
                character.deathSaveSuccesses = 0;
                character.deathSaveFailures = 0;
                Debug.Log($"✨ [Death Save] {character.name} has stabilized (3 successes)!");
            }
            else if (character.deathSaveFailures >= 3)
            {
                character.isDying = false;
                character.isDead = true;
                character.deathSaveSuccesses = 0;
                character.deathSaveFailures = 0;
                Debug.LogWarning($"💀 [Death Save] {character.name} has died (3 failures)!");
            }
        }

        public CharacterCombatState GetActiveCombatant()
        {
            if (combatants.Count == 0) return null;
            return combatants[currentTurnIndex];
        }

        public void NextTurn()
        {
            currentTurnIndex = (currentTurnIndex + 1) % combatants.Count;
            var active = GetActiveCombatant();
            Debug.Log($"[CombatEngine] It is now {active.name}'s turn.");
        }

        // Returns the list of grid offsets affected by a specific shape/direction in 3D
        public List<Vector3Int> CalculateAoE(Vector3Int origin, Vector3Int direction, CombatAbility ability)
        {
            List<Vector3Int> affectedCells = new List<Vector3Int>();

            switch (ability.shape)
            {
                case AbilityAoEShape.Single:
                    affectedCells.Add(origin + direction);
                    break;

                case AbilityAoEShape.Line:
                    Vector3Int step = new Vector3Int(
                        Mathf.Clamp(direction.x, -1, 1),
                        Mathf.Clamp(direction.y, -1, 1),
                        Mathf.Clamp(direction.z, -1, 1)
                    );
                    for (int i = 1; i <= ability.lengthInSpaces; i++)
                    {
                        affectedCells.Add(origin + (step * i));
                    }
                    break;

                case AbilityAoEShape.Cone:
                    Vector3 dirFloat = new Vector3(direction.x, direction.y, direction.z).normalized;
                    int length = ability.lengthInSpaces;
                    // Scan a 3D bounding box around the origin for cells in the cone
                    for (int x = -length; x <= length; x++)
                    {
                        for (int y = -length; y <= length; y++)
                        {
                            for (int z = -length; z <= length; z++)
                            {
                                Vector3Int offset = new Vector3Int(x, y, z);
                                if (offset == Vector3Int.zero) continue;

                                float dist = offset.magnitude;
                                if (dist <= length)
                                {
                                    Vector3 offsetFloat = new Vector3(offset.x, offset.y, offset.z).normalized;
                                    float dot = Vector3.Dot(offsetFloat, dirFloat);
                                    // dot >= 0.707 corresponds to a cone angle of <= 45 degrees
                                    if (dot >= 0.707f)
                                    {
                                        affectedCells.Add(origin + offset);
                                    }
                                }
                            }
                        }
                    }
                    break;

                case AbilityAoEShape.Blast:
                    Vector3Int center = origin + direction;
                    int r = ability.radiusInSpaces;
                    for (int x = -r; x <= r; x++)
                    {
                        for (int y = -r; y <= r; y++)
                        {
                            for (int z = -r; z <= r; z++)
                            {
                                if (x*x + y*y + z*z <= r*r)
                                {
                                    affectedCells.Add(new Vector3Int(center.x + x, center.y + y, center.z + z));
                                }
                            }
                        }
                    }
                    break;
            }

            return affectedCells;
        }

        public bool HasLineOfSight(Vector3Int start, Vector3Int end)
        {
            Vector3 startWorld = GridToWorld(start);
            Vector3 endWorld = GridToWorld(end);
            Vector3 direction = endWorld - startWorld;
            float distance = direction.magnitude;

            int layerMask = LayerMask.GetMask("Obstacle", "Terrain");
            if (layerMask == 0) layerMask = ~0; // Fallback to all layers

            bool hit = Physics.Raycast(startWorld, direction.normalized, distance, layerMask);
            return !hit;
        }

        public Vector3 GridToWorld(Vector3Int gridPos)
        {
            return gridOrigin + new Vector3(
                gridPos.x * cellSize + cellSize / 2f,
                gridPos.y * cellSize + cellSize / 2f,
                gridPos.z * cellSize + cellSize / 2f
            );
        }

        public Vector3Int WorldToGrid(Vector3 worldPos)
        {
            Vector3 local = worldPos - gridOrigin;
            return new Vector3Int(
                Mathf.FloorToInt(local.x / cellSize),
                Mathf.FloorToInt(local.y / cellSize),
                Mathf.FloorToInt(local.z / cellSize)
            );
        }
    }
}
