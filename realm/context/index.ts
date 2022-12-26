import { createContext } from "react";

import Realm from "realm";

export interface RealmContextProps {
  realm: Realm;
}

const RealmContext = createContext({} as RealmContextProps | null);

export { RealmContext };
