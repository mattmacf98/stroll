# Running
1. npx convex dev
2. start up ios simulator
3. in a seperate terminal, run npm run start and then press i

# Development
1. make sure your feature works in expo go by running npm run start
2. build for ios with  npx expo run:ios
3. run xed ios to open project and run in xcode
4. deploy to test flight using EAS and ensure works on physical device npx eas-cli build --platform ios and npx eas-cli submit --platform ios 