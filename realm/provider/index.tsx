import { useState, useEffect, PropsWithChildren } from "react";

import { Text } from "native-base";

import { DatabaseContext, DatabaseContextProps } from "../context";

import { initializeDatabase } from "../config";

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [database, setDatabase] = useState<DatabaseContextProps | null>(null);

  useEffect(() => {
    async function load() {
      const db = await initializeDatabase();

      if (db) {
        setDatabase({ database: db });
      }
    }

    load();
  }, []);

  return (
    <>
      {database && (
        <DatabaseContext.Provider value={database}>
          {children}
        </DatabaseContext.Provider>
      )}

      {!database && <Text>Loading Database </Text>}
    </>
  );
}
