#!/usr/bin/env python3

import os
import shutil

# Define the source and destination directories
source_dir = os.getcwd()
destination_dir = os.path.join(os.getcwd(), "dist")


def copy_tree(folder_name):
    shutil.copytree(
        os.path.join(source_dir, folder_name),
        os.path.join(destination_dir, folder_name),
        dirs_exist_ok=True,
    )


# Create the destination directory if it doesn't exist
if not os.path.exists(destination_dir):
    os.makedirs(destination_dir)

# Copy the db, public, and src folders to the destination directory
copy_tree("db")
copy_tree("public")
copy_tree("src")


html_files = [f for f in os.listdir(os.path.join(source_dir)) if f.endswith(".html")]


for html_file in html_files:
    shutil.copy2(
        os.path.join(source_dir, html_file), os.path.join(destination_dir, html_file)
    )
