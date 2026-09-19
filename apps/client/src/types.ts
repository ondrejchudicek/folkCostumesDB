import { type Group, type Object3DEventMap } from "three";

export interface Costume {
  costumeID: string;
  name: string;
  description: string;
  parts: Part[];
  images: Image[];
}

export interface Part {
  partID: string;
  name: string;
  path: string;
}

export interface Image {
  imageID: string;
  name: string;
  path: string;
}

export interface PartToggle{
  isActive: boolean;
  partID: string;
}

export interface ActiveCostume {
  costume: Costume;
  partToggles: PartToggle[];
}

export type AvailableCostumes = Costume[];

export type Model3D = Group<Object3DEventMap>;

export interface OpenElements {
  leftMenuOpen: boolean;
  rightMenuOpen: boolean;
  leftTriggerOpen: boolean;
  rightTriggerOpen: boolean;
  aboutOpen: boolean;
  uploadFormOpen: boolean;
  fullScreenImageOpen: boolean;
}

export interface rightMenuButtonsOnClicks {
  about: () => void;
  upload: () => void;
  resetCamera: () => void;
}

export interface ToRender{
  model: Model3D;
  key: string;
}
