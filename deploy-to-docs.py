#!/usr/bin/env python3
# deploy_to_docs.py

import subprocess
import sys
import os


def run_command(cmd, desc="Running command"):
    """Helper function to run a shell command."""
    print(f"\n[INFO] {desc}")
    print(f"[CMD]  {cmd}")
    try:
        result = subprocess.run(
            cmd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )
        print(f"[OK]   {desc} completed successfully.")
        if result.stdout.strip():
            print(f"[OUT]  {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[FAIL] {desc} failed.")
        print(f"[ERR]  {e.stderr}")
        return False


def main():
    print("🚀 Starting deployment to GitHub Pages (docs folder)...")

    # Step 1: Install dependencies
    if not run_command("npm install", "Installing dependencies"):
        print("\n❌ Failed to install dependencies. Exiting.")
        sys.exit(1)

    # Step 2: Build the app
    if not run_command("npm run build", "Building the application"):
        print("\n❌ Build failed. Exiting.")
        sys.exit(1)

    # Step 3: Replace docs folder with new build
    if os.path.exists("docs"):
        print("\n[INFO] Removing old 'docs' folder...")
        if not run_command("rm -rf docs", "Removing old 'docs' folder"):
            print("\n❌ Failed to remove old 'docs' folder. Exiting.")
            sys.exit(1)
    else:
        print("\n[INFO] No existing 'docs' folder found, proceeding...")

    if not run_command("cp -r dist docs", "Copying new build to 'docs' folder"):
        print("\n❌ Failed to copy new build to 'docs' folder. Exiting.")
        sys.exit(1)

    # Step 4: Commit and push
    if not run_command("git add docs", "Adding 'docs' folder to git"):
        print("\n❌ Failed to add 'docs' to git. Exiting.")
        sys.exit(1)

    if not run_command('git commit -m "chore: update production build"', "Committing changes"):
        print("\n⚠️  Nothing to commit or commit failed. This might be okay if no changes were made to 'docs'.")
        # We won't exit here, as sometimes the build output is the same.

    if not run_command("git push origin main", "Pushing changes to GitHub"):
        print("\n❌ Failed to push changes to GitHub. Exiting.")
        sys.exit(1)

    print("\n✅ Deployment completed successfully!")
    print("Your site should update shortly at: https://vijayb-aiops.github.io/cloudscape-devops-glow/")


if __name__ == "__main__":
    main()