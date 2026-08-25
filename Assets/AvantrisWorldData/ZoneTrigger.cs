using UnityEngine;

namespace Avantris
{
    [RequireComponent(typeof(Collider))]
    public class ZoneTrigger : MonoBehaviour
    {
        [Header("Transition Config")]
        public string targetZoneId;
        public string targetSpawnName;

        private void Start()
        {
            // Ensure collider is set to trigger
            Collider col = GetComponent<Collider>();
            if (col != null)
            {
                col.isTrigger = true;
            }
        }

        private void OnTriggerEnter(Collider other)
        {
            // Check if player collided
            if (other.CompareTag("Player"))
            {
                ZoneManager manager = FindObjectOfType<ZoneManager>();
                if (manager != null)
                {
                    manager.SwitchZone(targetZoneId, targetSpawnName);
                }
            }
        }
    }
}
