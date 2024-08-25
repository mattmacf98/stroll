import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import App from "./app";
import { NavigationContainer } from "@react-navigation/native";
import { StrollProvider } from "@/contexts/StrollContext";
import * as SecureStore from "expo-secure-store";

const convex = new ConvexReactClient("https://healthy-anaconda-348.convex.cloud", {
  unsavedChangesWarning: false
})

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
        <ConvexAuthProvider client={convex} storage={secureStorage}>
          <StrollProvider>
            <App/>
          </StrollProvider>
        </ConvexAuthProvider>
    </NavigationContainer>
  );
}
