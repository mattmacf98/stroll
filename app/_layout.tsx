import { ConvexAuthProvider } from "@convex-dev/auth/dist/react";
import { ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import React from "react";
import * as SecureStore from "expo-secure-store";

const convex = new ConvexReactClient("https://healthy-anaconda-348.convex.cloud", {
  unsavedChangesWarning: false
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};


export default function RootLayout() {
  
  return (
    <ConvexAuthProvider client={convex} storage={secureStorage}>
      <Stack/>
    </ConvexAuthProvider>
  );
}
