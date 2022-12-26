import { useState, useEffect, PropsWithChildren } from "react";

import { Text } from "native-base";

import { RealmContext, RealmContextProps } from "../context";

import { initializeRealm } from "../config";

export function RealmProvider({ children }: PropsWithChildren) {
  const [realm, setRealm] = useState<RealmContextProps | null>(null);

  useEffect(() => {
    async function load() {
      const db = await initializeRealm();

      if (db) {
        setRealm({ realm: db });
      }
    }

    load();
  }, []);

  return (
    <>
      {realm && (
        <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
      )}

      {!realm && <Text>Loading Database </Text>}
    </>
  );
}
