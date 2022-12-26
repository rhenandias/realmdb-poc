import { createContext } from "react";

import Realm from "realm";

export interface DatabaseContextProps {
  realm: Realm;
}

const DatabaseContext = createContext({} as DatabaseContextProps | null);

export { DatabaseContext };
