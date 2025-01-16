import { createContext } from "react";

import { FruitApi } from "../api";

export const fruitApi = new FruitApi();

const FruitApiContext = createContext(fruitApi);

export default FruitApiContext;
