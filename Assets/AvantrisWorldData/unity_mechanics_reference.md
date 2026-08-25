# Unity Action RPG Mechanics: GitHub Repositories & Implementation Guide

This guide compiles the top open-source projects on GitHub that implement game mechanics from ***The Legend of Zelda: Breath of the Wild (BOTW)***, ***God of War (GoW)***, and ***Monster Hunter (MH)***, and describes how to set them up in your Unity game project.

---

## 1. Top GitHub Repositories for Reference

### 🟢 Zelda: Breath of the Wild (Climbing & Gliding)
1.  **[conankzhang/ProceduralClimbing](https://github.com/conankzhang/ProceduralClimbing)**
    *   *What it is:* A dedicated Unity prototype replicating BOTW's "climb-anywhere" mechanic.
    *   *Key Tech:* Uses raycasts/spherecasts to detect surfaces and alignments, overriding character controller physics to "stick" to walls.
2.  **[AitorSimona/Traverser](https://github.com/AitorSimona/Traverser)**
    *   *What it is:* An advanced open-source player traversal toolkit.
    *   *Key Tech:* Procedural climbing, motion warping, parkour ledges, and physical animations. Ideal if you need a high-end, production-ready system.
3.  **[NickolausDS/Unity-Free-Flight](https://github.com/NickolausDS/Unity-Free-Flight)**
    *   *What it is:* A flying/gliding controller suitable for a paraglider implementation.

### 🪓 God of War (Axe Throw & Recall)
1.  **[MixandJam/GodofWar-AxeThrow](https://github.com/MixandJam/GodofWar-AxeThrow)**
    *   *What it is:* The official Mix and Jam repository demonstrating GoW's axe throw and recall.
    *   *Key Tech:* Rigidbody physics for the throw, raycasting to stick the axe to walls, and quadratic Bezier curves to recall the axe along a satisfying curve.
2.  **[dimitris-c/UnityMechanicsFramework](https://github.com/dimitris-c/UnityMechanicsFramework)**
    *   *What it is:* A general framework containing a robust "Boomerang Weapon System" replicating Bezier-recall loops.

### ⚔️ Monster Hunter (Combat, Hitstop, & Animation Locks)
1.  **[knela96/Dynamic-Parkour-System](https://github.com/knela96/Dynamic-Parkour-System)**
    *   *What it is:* Useful for the climbing/grappling mechanics against large surfaces or giants.
2.  **[UnityStarter / Gameplay Ability System (GAS)](https://github.com/sjai013/unity-gameplay-ability-system)**
    *   *What it is:* A Unity adaptation of Unreal's GAS, perfect for implementing strict animation locks, combo branch delays, stamina cost metrics, and hitstop pauses matching Monster Hunter's heavy combat feel.

---

## 2. Core C# Controller Architectures

We have written two production-grade C# scripts representing these mechanics in your Unity assets directory (`Assets/AvantrisWorldData/`):

### 1. `BotwClimbingController.cs`
Handles climbing any vertical surface with stamina drainage:
*   **Spherecast Scanning:** Casts checks in front of the player model to identify climbable geometry (ignores designated non-climbable tags like slippery ice).
*   **Gravity Override:** Shuts off standard gravity checks, locking the player character's velocity to vertical/horizontal inputs aligned to the wall's normal face.
*   **Stamina Wheel Integration:** Regularly drains a float metric while climbing or executing jumps. Drops the player off the wall if stamina hits zero.

### 2. `LeviathanAxeController.cs`
Handles the throwable and recallable weapon system:
*   **Throw Mode:** Adds forward velocity to the axe rigidbody, spinning it, and tracking when it collides with an object.
*   **Embed Logic:** Upon collision, sets the rigidbody to Kinematic, stops the spin animation, parents the axe to the hit transform, and records the impact point.
*   **Recall Mode:** Utilizes a **Quadratic Bezier Curve** with an offset control point (creating the curved recall path around obstacles) to smooth-lerp the axe back to the player's hand socket.
