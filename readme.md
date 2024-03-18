### Required tools
- Node.js (for sure)
- Yarn installed globally (`npm i -g yarn`)
- Metacraft CLI installed globally (`npm i -g @metacraft/cli`)

### CLI commands 
- Development: run `metacraft` under project root
- Build: `metacraft bundle` (CI will run/deploy using this script, normally we don't use this command)

## Development
- For simulator connect (`engine` repo): change game/assets/scripts/network/util.ts, line 5 websocket url point to localhost
