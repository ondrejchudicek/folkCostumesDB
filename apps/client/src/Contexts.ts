import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ActiveCostume, Costume } from './types.ts';

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
      'useActiveCostume must be used inside ActiveCostumeContext.Provider',
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
      'useAvailableCostumes must be used inside AvailableCostumesContext.Provider',
    );
  }

  return context;
}

interface MobileLayoutContextType {
  isMobileLayout: boolean;
}

export const MobileLayoutContext =
  createContext<MobileLayoutContextType | null>(null);

export function useMobileLayoutContext() {
  const context = useContext(MobileLayoutContext);

  if (context === null) {
    throw new Error(
      'useMobileLayoutContext must be used inside MobileLayoutContext.Provider',
    );
  }

  return context;
}
