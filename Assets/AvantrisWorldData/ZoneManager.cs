using System;
using System.Collections.Generic;
using UnityEngine;

namespace Avantris
{
    [System.Serializable]
    public class ZoneInfo
    {
        public string zoneId;
        public string zoneName;
        public GameObject zoneContainer;
        public Transform defaultSpawnPoint;
        public string seaName = "Sea of Stars";
        public string description = "An uncharted region of Avantris.";
        public bool isDiscovered = true;
    }

    public class ZoneManager : MonoBehaviour
    {
        [Header("Zones Registration")]
        public List<ZoneInfo> zones = new List<ZoneInfo>();
        public string startingZoneId;

        [Header("Player Reference")]
        public GameObject playerObject;

        private string activeZoneId;

        [Header("Overworld Voyage Settings")]
        public float travelDuration = 3.0f;
        public bool showTravelMenu = false;

        private bool isTraveling = false;
        private float travelTimer = 0f;
        private ZoneInfo targetTravelZone;
        private string targetTravelSpawn;

        void Start()
        {
            if (string.IsNullOrEmpty(activeZoneId) && !string.IsNullOrEmpty(startingZoneId))
            {
                SwitchZone(startingZoneId);
            }
        }

        void Update()
        {
            if (isTraveling)
            {
                travelTimer += Time.deltaTime;
                if (travelTimer >= travelDuration)
                {
                    CompleteTravel();
                }
            }

            // Toggle travel map menu with M key (if not actively in overworld transit or combat)
            if (Input.GetKeyDown(KeyCode.M) && !isTraveling)
            {
                AvantrisUnityBridge bridge = FindObjectOfType<AvantrisUnityBridge>();
                if (bridge != null && bridge.isGridCombatActive) return;

                showTravelMenu = !showTravelMenu;
                Cursor.lockState = showTravelMenu ? CursorLockMode.None : CursorLockMode.Locked;
            }
        }

        public void StartTravel(string destinationZoneId, string spawnPointName = null)
        {
            ZoneInfo targetZone = zones.Find(z => z.zoneId == destinationZoneId);
            if (targetZone == null)
            {
                Debug.LogWarning($"[ZoneManager] Cannot sail to unknown zone {destinationZoneId}");
                return;
            }

            targetTravelZone = targetZone;
            targetTravelSpawn = spawnPointName;
            isTraveling = true;
            travelTimer = 0f;
            showTravelMenu = false;

            // Lock player controls during voyage
            AvantrisUnityBridge bridge = FindObjectOfType<AvantrisUnityBridge>();
            if (bridge != null)
            {
                bridge.SetControlsEnabled(false);
            }
        }

        private void CompleteTravel()
        {
            isTraveling = false;
            SwitchZone(targetTravelZone.zoneId, targetTravelSpawn);

            // Restore player controls and cursor state
            AvantrisUnityBridge bridge = FindObjectOfType<AvantrisUnityBridge>();
            if (bridge != null)
            {
                bridge.SetControlsEnabled(true);
            }
            Cursor.lockState = CursorLockMode.Locked;
        }

        public void SwitchZone(string targetZoneId, string spawnPointName = null)
        {
            ZoneInfo targetZone = zones.Find(z => z.zoneId == targetZoneId);
            if (targetZone == null)
            {
                Debug.LogWarning($"[ZoneManager] Zone {targetZoneId} not found!");
                return;
            }

            // Disable all other zones, enable only active zone
            foreach (var zone in zones)
            {
                if (zone.zoneContainer != null)
                {
                    zone.zoneContainer.SetActive(zone.zoneId == targetZoneId);
                }
            }

            activeZoneId = targetZoneId;
            Debug.Log($"[ZoneManager] Switched map zone to: {targetZone.zoneName}");

            // Relocate player
            if (playerObject != null)
            {
                Transform targetSpawn = targetZone.defaultSpawnPoint;
                if (!string.IsNullOrEmpty(spawnPointName))
                {
                    // Look for custom spawn point under the container
                    Transform customSpawn = targetZone.zoneContainer.transform.Find(spawnPointName);
                    if (customSpawn != null)
                    {
                        targetSpawn = customSpawn;
                    }
                }

                if (targetSpawn != null)
                {
                    // Temporarily disable character controller to allow displacement
                    CharacterController cc = playerObject.GetComponent<CharacterController>();
                    if (cc != null) cc.enabled = false;

                    playerObject.transform.position = targetSpawn.position;
                    playerObject.transform.rotation = targetSpawn.rotation;

                    if (cc != null) cc.enabled = true;
                }
            }
        }

        public string GetActiveZoneId() => activeZoneId;

        // =========================================================================
        // ON-GUI OVERWORLD NAVIGATION BOARD
        // =========================================================================
        void OnGUI()
        {
            float screenWidth = Screen.width;
            float screenHeight = Screen.height;

            // 1. Voyage Progress Transition
            if (isTraveling && targetTravelZone != null)
            {
                // Fullscreen black background overlay
                GUI.Box(new Rect(0, 0, screenWidth, screenHeight), "");
                GUI.Box(new Rect(0, 0, screenWidth, screenHeight), "");

                float panelWidth = 500f;
                float panelHeight = 120f;
                float startX = (screenWidth - panelWidth) / 2f;
                float startY = (screenHeight - panelHeight) / 2f;

                GUI.BeginGroup(new Rect(startX, startY, panelWidth, panelHeight));
                
                GUI.Label(new Rect(20f, 10f, 460f, 25f), $"⛵ <strong>Voyaging:</strong> Crossing the {targetTravelZone.seaName}...");
                GUI.Label(new Rect(20f, 35f, 460f, 25f), $"🗺️ <strong>Heading:</strong> Sailing towards {targetTravelZone.zoneName}...");

                // Progress Bar
                float progressPercent = travelTimer / travelDuration;
                GUI.HorizontalSlider(new Rect(20f, 75f, 460f, 20f), progressPercent, 0f, 1f);

                GUI.EndGroup();
                return;
            }

            // 2. World Travel Map Menu (Press M)
            if (showTravelMenu)
            {
                float panelWidth = 650f;
                float panelHeight = 350f;
                float startX = (screenWidth - panelWidth) / 2f;
                float startY = (screenHeight - panelHeight) / 2f;

                GUI.Box(new Rect(startX, startY, panelWidth, panelHeight), "🗺️ Legends of Avantris: World Navigation Board");

                float startItemY = startY + 40f;
                foreach (var zone in zones)
                {
                    if (!zone.isDiscovered) continue;

                    // If currently here, highlight text
                    bool isCurrentZone = (zone.zoneId == activeZoneId);

                    GUI.Label(new Rect(startX + 20f, startItemY, 200f, 25f), $"<strong>{(isCurrentZone ? "📍 " : "")}{zone.zoneName}</strong>");
                    GUI.Label(new Rect(startX + 230f, startItemY, 280f, 45f), $"<size=11>{zone.description}</size>\n<i><color=silver>{zone.seaName}</color></i>");

                    if (!isCurrentZone)
                    {
                        if (GUI.Button(new Rect(startX + 520f, startItemY, 110f, 22f), "Sail Voyage"))
                        {
                            StartTravel(zone.zoneId);
                        }
                    }
                    else
                    {
                        GUI.Label(new Rect(startX + 520f, startItemY, 110f, 22f), "<color=green>Current Region</color>");
                    }

                    startItemY += 60f;
                }

                if (GUI.Button(new Rect(startX + panelWidth - 100f, startY + panelHeight - 35f, 80f, 25f), "Close"))
                {
                    showTravelMenu = false;
                    Cursor.lockState = CursorLockMode.Locked;
                }
            }
        }
    }
}
