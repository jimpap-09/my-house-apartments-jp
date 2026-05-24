#!/bin/bash

tmux new-session -d -s jp-dev

tmux rename-window 'dev'

tmux send-keys -t jp-dev:0 "npm run dev" C-m

tmux split-window -h
tmux send-keys "npm run db:status && npm run db:shell" C-m

tmux split-window -v
tmux send-keys "npm run test:api" C-m

tmux select-pane -t 0

tmux attach -t jp-dev