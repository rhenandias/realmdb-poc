import { useState, useEffect, PropsWithChildren } from "react";

import { Text } from "native-base";

import { DatabaseContext, DatabaseContextProps } from "../context";

import { initializeDatabase } from "../config";

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [realm, setRealm] = useState<DatabaseContextProps | null>(null);

  useEffect(() => {
    async function load() {
      const db = await initializeDatabase();

      if (db) {
        setRealm({ realm: db });
      }
    }

    load();
  }, []);

  return (
    <>
      {realm && (
        <DatabaseContext.Provider value={realm}>
          {children}
        </DatabaseContext.Provider>
      )}

      {!realm && <Text>Loading Database </Text>}
    </>
  );
}
