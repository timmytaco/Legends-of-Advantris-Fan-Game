#!/usr/bin/env bash

TARGET_DIR="${1:-Assets}"

if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Directory '$TARGET_DIR' not found."
    exit 1
fi

echo "Scanning '$TARGET_DIR' for .meta file mismatches..."
echo "----------------------------------------------------"

MISSING_COUNT=0
ORPHAN_COUNT=0

# 1. Check for files and folders missing .meta companions (skipping root directory and hidden paths)
while IFS= read -r item; do
    [ -z "$item" ] && continue
    meta_file="${item}.meta"
    if [ ! -f "$meta_file" ]; then
        echo "[MISSING META] $item -> Missing: $meta_file"
        ((MISSING_COUNT++))
    fi
done < <(find "$TARGET_DIR" -mindepth 1 ! -name "*.meta" ! -path "*/.*" | sort -u)

# 2. Check for orphaned .meta files
while IFS= read -r meta_file; do
    [ -z "$meta_file" ] && continue
    original_item="${meta_file%.meta}"
    if [ ! -e "$original_item" ]; then
        echo "[ORPHAN META]  $meta_file -> Missing target: $original_item"
        ((ORPHAN_COUNT++))
    fi
done < <(find "$TARGET_DIR" -type f -name "*.meta" ! -path "*/.*" | sort -u)

echo "----------------------------------------------------"
echo "Scan complete."
echo "Missing .meta files:  $MISSING_COUNT"
echo "Orphaned .meta files: $ORPHAN_COUNT"

if [ "$MISSING_COUNT" -gt 0 ] || [ "$ORPHAN_COUNT" -gt 0 ]; then
    exit 1
else
    echo "All assets and .meta files are in sync!"
    exit 0
fi

