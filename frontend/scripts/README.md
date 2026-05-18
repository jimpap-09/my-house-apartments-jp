Brief guide for helper scripts in the `scripts/` folder.

Main scripts
- `save-and-push.sh` — stage, commit, and push all changes.
- `install-deps-fresh.sh` — remove `node_modules` and `package-lock.json`, then run `npm install`.
- `start-dev.sh` — run the Vite dev server (`npm run dev`).
- `git-status-remote.sh` — show uncommitted changes (`git status --porcelain`), current branch, and remotes.
- `git-pull-install.sh` — `git pull --rebase` followed by `npm install` (useful when starting work in a new Codespace).
- `check-rolldown-bindings.sh` — check for `@rolldown` native bindings in `node_modules`.
- `set-perms.sh` — set permissions (`+x` or numeric) for all `.sh` files.
- `show-perms.sh` — display filesystem and git permission modes for scripts.
- `set-and-show-perms.sh` — convenience wrapper that runs `set-perms.sh` then `show-perms.sh`.

Quick usage
```bash
# (on the spot) make scripts executable and commit so new clones/Codespaces keep the mode
chmod +x scripts/*.sh
git add scripts/*.sh
git commit -m "Make scripts executable"
git push

# run a script
./scripts/save-and-push.sh "My commit message"
./scripts/set-perms.sh            # set +x or numeric mode for all scripts
./scripts/show-perms.sh           # show current script permissions
./scripts/set-and-show-perms.sh   # set permissions then show them
./scripts/install-deps-fresh.sh
```

Notes
- `save-and-push.sh` uses `git add .` — if you want selective commits, run `git add` manually before.
- Do not commit `node_modules/`; it should be in `.gitignore`.
