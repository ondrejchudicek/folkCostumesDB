import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ActiveCostume, Costume } from "./types.ts";

interface ActiveCostumeContextType {
  activeCostume: ActiveCostume;
  setActiveCostume: Dispatch<SetStateAction<ActiveCostume>>;
}

export const ActiveCostumeContext =
  createContext<ActiveCostumeContextType | null>(null);

export function useActiveCostume() {
  const context = useContext(ActiveCostumeContext);

  if (context === null) {
    throw new Error(
      "useActiveCostume must be used inside ActiveCostumeContext.Provider",
    );
  }

  return context;
}

interface AvailableCostumesContextType {
  availableCostumes: Costume[];
}

export const AvailableCostumesContext =
  createContext<AvailableCostumesContextType | null>(null);

export function useAvailableCostumes() {
  const context = useContext(AvailableCostumesContext);

  if (context === null) {
    throw new Error(
      "useAvailableCostumes must be used inside AvailableCostumesContext.Provider",
    );
  }

  return context;
}
