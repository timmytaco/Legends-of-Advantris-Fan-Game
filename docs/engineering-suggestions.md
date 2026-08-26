# Engineering Suggestions

This project now opens in Unity, which makes this a good time to lock in the known-good state and plan the next cleanup pass. These suggestions are intentionally scoped around maintainability, safer Unity serialization, and easier collaboration.

## 1. Split the Master Player Bridge

`Assets/AvantrisWorldData/AvantrisUnityBridge.cs` is currently the highest-risk file in the project. It owns data models, player movement, camera control, climbing, axe behavior, quest state, combat state, QTE behavior, animator sync, and runtime UI.

Suggested split:

- `PlayerMovementController`
- `PlayerCameraController`
- `PlayerClimbingController`
- `AxeRecallController`
- `CombatInputController`
- `QteController`
- `WorldDatabase`

The goal is not a rewrite. Extract one responsibility at a time while keeping serialized fields stable where possible.

## 2. Remove Duplicate Gameplay Systems

There are standalone scripts for climbing and axe recall:

- `Assets/AvantrisWorldData/BotwClimbingController.cs`
- `Assets/AvantrisWorldData/LeviathanAxeController.cs`

Similar logic also exists inside `AvantrisUnityBridge.cs`. Pick one source of truth before the versions diverge. The cleaner direction is to keep the standalone components and thin down the bridge.

## 3. Cache Scene References

Several gameplay paths use `FindAnyObjectByType` while the game is running. That is fine for prototyping, but serialized references or startup-time caching will be more predictable and easier to debug.

Targets to clean up first:

- `ZoneManager` finding `AvantrisUnityBridge`
- `ZoneTrigger` finding `ZoneManager`
- `AvantrisUnityBridge` finding `GridCombatSystem` and `ZoneManager`

## 4. Validate Serialized References

Many runtime methods assume Unity inspector references are assigned. Add startup validation with clear errors for required fields such as:

- `cameraPivot`
- `axeRigidbody`
- `playerHandSocket`
- `combatSystem`
- zone containers
- default spawn points

This makes broken scene or prefab wiring fail clearly instead of turning into null reference errors during play.

## 5. Replace Runtime IMGUI

`ZoneManager.OnGUI` is useful for debug iteration, but IMGUI is not a great fit for production gameplay UI. Move the travel menu and voyage overlay to UGUI or UI Toolkit once the flow is stable.

Until then, treat the current IMGUI as a prototype/debug interface.

## 6. Add Assembly Definitions

The project does not currently have `.asmdef` files. Once the scripts are split, add a runtime assembly under `Assets/AvantrisWorldData` and separate editor code into an editor-only assembly.

Expected benefits:

- faster script recompiles
- clearer runtime/editor boundaries
- cleaner dependency management as the project grows

## 7. Commit Unity Upgrade and Import State Deliberately

Unity changed package and project settings as part of the working import. Keep those changes grouped in their own checkpoint commit so future gameplay changes are easier to review.

When Unity changes `Packages` or `ProjectSettings`, review those diffs separately from gameplay code.

## 8. Strengthen Git Hygiene

The existing `.gitignore` covers the important Unity-generated folders. This branch also adds a `.gitattributes` file so common Unity text assets use stable line endings and common binary assets are treated as binary by Git.

If the project starts adding large art, music, video, or model files, consider adding Git LFS tracking rules for those asset types.
