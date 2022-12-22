import "reflect-metadata";
import "react-native-get-random-values";

import React from "react";

import { NativeBaseProvider, StatusBar } from "native-base";
import { Routes } from "./src/routes";

import { DatabaseProvider } from "./realm/provider";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <DatabaseProvider>
        <Routes />
      </DatabaseProvider>
    </NativeBaseProvider>
  );
}
