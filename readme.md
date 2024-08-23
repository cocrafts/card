### Required tools

- Node.js (for sure)
- Yarn installed globally (`npm i -g yarn`)
- Metacraft CLI installed globally (`npm i -g @metacraft/cli`)

### Run Landing Page

- Development: run `metacraft` under project root
- Build: `metacraft bundle` (CI will run/deploy using this script, normally we don't use this command)

### Run Game:

- Install [Cocos Dashboard](https://www.cocos.com/en/creator)
- Install Cocos Creator version `3.8.3` or newer
- Install deps for Game by `yarn install` under `game` folder
- Open `game` folder with Cocos creator
- Configure network endpoint under `./game/assets/scripts/network/util.ts` (line 6), either use remove endpoint or local endpoint at [Card Engine](https://github.com/cocrafts/engines)
