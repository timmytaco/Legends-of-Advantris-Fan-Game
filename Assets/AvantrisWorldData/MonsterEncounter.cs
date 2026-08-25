using UnityEngine;
 
namespace Avantris
{
    [RequireComponent(typeof(Collider))]
    public class MonsterEncounter : MonoBehaviour
    {
        [Header("Monster Statistics")]
        public string monsterId = "chuckles";
        public string monsterName = "Chuckles the Clown";
        public int currentHP = 25;
        public int maxHP = 25;
        public int armorClass = 13;
        public int initiativeModifier = 1;
        public CharacterStats stats = new CharacterStats { strength = 12, dexterity = 13, constitution = 14, intelligence = 10, wisdom = 10, charisma = 8 };

        private void Start()
        {
            Collider col = GetComponent<Collider>();
            if (col != null)
            {
                col.isTrigger = true;
            }
        }

        private void OnTriggerEnter(Collider other)
        {
            if (other.CompareTag("Player"))
            {
                AvantrisUnityBridge playerBridge = other.GetComponent<AvantrisUnityBridge>();
                if (playerBridge != null && !playerBridge.isGridCombatActive)
                {
                    Debug.Log($"[Encounter] Collided with {monsterName}! Commencing 3D D&D combat...");
                    playerBridge.Trigger3DGridCombat(this);
                }
            }
        }
    }
}
