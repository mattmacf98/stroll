import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./app";
import { NavigationContainer } from "@react-navigation/native";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false
})

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
        <ConvexProvider  client={convex}>
          <App/>
        </ConvexProvider>
    </NavigationContainer>
  );
}
