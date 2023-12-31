#!/bin/bash
# Define the base directory where your JSON files are located
base_dir="json"
# Loop through subdirectories
for subdir in "$base_dir"/*; do
    if [ -d "$subdir" ]; then
        # Extract the subdirectory name
        subdir_name=$(basename "$subdir")

        if [ ! -d "libs/ts/schema/${subdir_name}" ]; then
            mkdir "libs/ts/schema/${subdir_name}"
        fi

        # Loop through each JSON file in the subdirectory
        for json_file in "$subdir"/*.json; do
            # Extract the filename without extension
            file_name=$(basename -- "$json_file")
            file_name_no_extension="${file_name%.*}"
            echo "Generating TypeScript for $subdir_name/$file_name_no_extension"
            quicktype \
            --src-lang schema "$json_file" \
            --out "libs/ts/schema/${subdir_name}/${file_name_no_extension}.ts" \
            --just-types \
            --runtime-typecheck
        done
    fi
done
