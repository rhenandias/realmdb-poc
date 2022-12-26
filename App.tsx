import "reflect-metadata";
import "react-native-get-random-values";

import React from "react";

import { NativeBaseProvider, StatusBar } from "native-base";
import { Routes } from "./src/routes";

import { RealmProvider } from "./realm/provider";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <RealmProvider>
        <Routes />
      </RealmProvider>
    </NativeBaseProvider>
  );
}
