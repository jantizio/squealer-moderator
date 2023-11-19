#!/usr/bin/env python3

import os
import re
import paramiko
from dotenv import load_dotenv

load_dotenv()
load_dotenv(".env.production")
load_dotenv(".env.local")

# Define the local and remote paths
local_path = os.path.join(os.getcwd(), "dist")
remote_path = "/home/web/site222315/html/mod"
config_path = os.path.join(local_path, "src", "config", "index.mjs")

# check if local_path exists
if not os.path.exists(local_path):
    print(f"Build path {local_path} does not exist")
    exit(1)

# Read the remote machine details from environment variables
hostname = os.environ.get("REMOTE_HOSTNAME")
username = os.environ.get("REMOTE_USERNAME")
password = os.environ.get("REMOTE_PASSWORD")


if not hostname or not username or not password:
    print(
        "Please set the REMOTE_HOSTNAME, REMOTE_USERNAME, and REMOTE_PASSWORD environment variables"
    )
    exit(1)

# Read app config from environment variables
config = {"apiUrl": os.environ.get("API_URL"), "appUrl": os.environ.get("APP_URL")}
if not config["apiUrl"] or not config["appUrl"]:
    print(
        "Please set the API_URL and APP_URL environment variables to the API and APP URLs respectively"
    )
    exit(1)

# Update the app config file
with open(config_path, "r") as f:
    content = f.read()
    for key, value in config.items():
        content = re.sub(f"{key} = ('|\").*('|\")", f"{key} = '{value}'", content)

with open(config_path, "w") as f:
    f.write(content)


# Create an SSH client
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    # Connect to the remote machine
    client.connect(hostname, username=username, password=password)
    sftp = client.open_sftp()

    # Iterate the folders inside the local_path recursively and create them remotely
    for root, dirs, files in os.walk(local_path):
        for dir in dirs:
            remote_dir_path = os.path.join(
                remote_path, os.path.relpath(os.path.join(root, dir), local_path)
            ).replace("\\", "/")
            try:
                sftp.mkdir(remote_dir_path)
            except IOError:
                pass

    # Iterate over the files in the local directory
    for root, dirs, files in os.walk(local_path):
        for file in files:
            local_file_path = os.path.join(root, file)
            remote_file_path = os.path.join(
                remote_path, os.path.relpath(local_file_path, local_path)
            ).replace("\\", "/")
            print(f"Copying {local_file_path} to {remote_file_path}")

            sftp.put(local_file_path, remote_file_path)

    print("Files copied successfully!")

finally:
    # Close the SFTP session and SSH client
    sftp.close()
    client.close()
