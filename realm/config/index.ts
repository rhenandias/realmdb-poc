import Realm from "realm";

import ClientSchema from "../models/client";

async function initializeDatabase(): Promise<Realm | null> {
  const realm = await Realm.open({
    schema: [ClientSchema],
    schemaVersion: 5,
  });

  return realm;
}

export { initializeDatabase };
