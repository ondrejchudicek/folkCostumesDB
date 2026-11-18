import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type {
  ActiveCostume,
  Costume,
  FullScreenImageInfo,
  Preview,
} from './types.ts';

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

interface OpenFullScreenImageContextType {
  openAndSetFullScreenImage: (fullScreenImageInfo: FullScreenImageInfo) => void;
}

export const OpenFullScreenImageContext =
  createContext<OpenFullScreenImageContextType | null>(null);

export function useOpenFullScreenImageContext() {
  const context = useContext(OpenFullScreenImageContext);

  if (context === null) {
    throw new Error(
      'useOpenFullScreenImageContext must be used inside OpenFullScreenImageContext.Provider',
    );
  }

  return context;
}

export const SetIsLoadingContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);

export function useSetIsLoadingContext() {
  const context = useContext(SetIsLoadingContext);

  if (context === null) {
    throw new Error(
      'useSetIsLoadingContext must be used inside SetIsLoadingContext.Provider',
    );
  }

  return context;
}

export interface PreviewContextType {
  preview: Preview;
  setPreview: Dispatch<SetStateAction<Preview>>;
}

export const PreviewContext = createContext<PreviewContextType | null>(null);

export function usePreviewContext() {
  const context = useContext(PreviewContext);

  if (context === null) {
    throw new Error(
      'usePreviewContext must be used inside PreviewContext.Provider',
    );
  }

  return context;
}
