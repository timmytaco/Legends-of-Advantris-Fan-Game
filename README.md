# Legends of Avantris Fan Game

Unity fan game project for Legends of Avantris.

## Required Software

- Windows 10 or Windows 11
- Git for Windows: https://git-scm.com/download/win
- Unity Hub: https://unity.com/download
- Unity Editor `6000.5.9f1`
- Visual Studio 2022 or another Unity-compatible C# editor

This project should be cloned onto the Windows filesystem, not inside WSL. Windows Unity does not support opening a project from a case-sensitive WSL path such as `\\wsl.localhost\Ubuntu\...`.

Recommended location:

```text
C:\Users\<your-user>\source\Legends-of-Advantris-Fan-Game
```

## Clone the Repository

1. Open PowerShell or Git Bash on Windows.
2. Create a source directory if you do not already have one:

   ```powershell
   mkdir C:\Users\$env:USERNAME\source
   cd C:\Users\$env:USERNAME\source
   ```

3. Clone the repository:

   ```powershell
   git clone https://github.com/timmytaco/Legends-of-Advantris-Fan-Game.git Legends-of-Advantris-Fan-Game
   cd Legends-of-Advantris-Fan-Game
   ```

4. Verify the Unity project files are present:

   ```powershell
   dir Assets
   dir Packages
   dir ProjectSettings
   ```

## Install the Unity Version

1. Open Unity Hub.
2. Go to `Installs`.
3. Install Unity Editor `6000.5.9f1`.
4. Include these modules if prompted:
   - Microsoft Visual Studio Community, unless you already have a C# editor
   - Windows Build Support, if you plan to make Windows builds

The exact editor version is recorded in:

```text
ProjectSettings\ProjectVersion.txt
```

## Open the Project

1. Open Unity Hub.
2. Select `Projects`.
3. Select `Add` or `Add project from disk`.
4. Choose the cloned repo folder:

   ```text
   C:\Users\<your-user>\source\Legends-of-Advantris-Fan-Game
   ```

5. Open the project with Unity `6000.5.9f1`.
6. Wait for Unity to finish importing packages and assets.

The first import can take several minutes. Unity will create ignored local folders such as `Library`, `Temp`, `Logs`, and `UserSettings`.

## Verify the Project Imported Correctly

After Unity finishes opening the project:

1. Confirm there are no missing package errors in the Console.
2. Open the scene:

   ```text
   Assets\Scenes\SampleScene.unity
   ```

3. Press `Play` in the Unity Editor.
4. Confirm Play Mode starts without compile errors.
5. Open `Window > Package Manager` and confirm these project packages resolve:
   - Universal Render Pipeline
   - Input System
   - AI Navigation
   - Unity UI
   - Timeline
   - Visual Scripting

## Verify Git After Unity Opens

After the first Unity import, check what Unity changed:

```powershell
git status --short
```

Expected local-only generated folders should not appear because they are ignored:

```text
Library/
Temp/
Obj/
Build/
Builds/
Logs/
UserSettings/
```

Files under `Assets`, `Packages`, or `ProjectSettings` may be legitimate project changes. Review them before committing:

```powershell
git diff
```

## Working From WSL

You can still use WSL tools against the Windows clone:

```bash
cd /mnt/c/Users/<your-user>/source/Legends-of-Advantris-Fan-Game
git status --short
```

Keep Unity pointed at the Windows path, not the WSL UNC path.

Use this:

```text
C:\Users\<your-user>\source\Legends-of-Advantris-Fan-Game
```

Do not use this in Unity Hub:

```text
\\wsl.localhost\Ubuntu\home\...
```

## Common Problems

### Unity says the project is on a case-sensitive file system

The project is probably being opened from WSL. Move or clone the repository to `C:\...` and open that copy from Unity Hub.

### Package import errors on first open

Close Unity, reopen the project, and let package resolution finish. If errors remain, check `Packages\manifest.json` and `Packages\packages-lock.json` for accidental edits.

### Scripts do not compile

Open the Unity Console and fix the first compile error listed. Later errors are often caused by the first one.

### Git shows many generated files

Make sure the repo `.gitignore` is present and that Unity is opening the repository root, not a nested folder.

## Repository Hygiene

- Commit `.meta` files with their matching assets.
- Do not commit `Library`, `Temp`, `Obj`, `Build`, `Builds`, `Logs`, or `UserSettings`.
- Avoid moving or renaming assets outside Unity unless you also keep the matching `.meta` files intact.
- Prefer opening and moving assets through Unity Editor so references and GUIDs stay stable.
