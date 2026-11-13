import { type Group, type Object3DEventMap } from 'three';

export interface Costume {
  costumeID: number;
  name: string;
  description: string;
  thumbnailImageID: number | null;
}

export interface Part {
  partID: number;
  name: string;
}

export interface Image {
  imageID: number;
  name: string;
}

export interface PartToggle {
  isActive: boolean;
  partID: number;
}

export interface ActiveCostume {
  costume: Costume;
  partToggles: PartToggle[];
  parts: Part[];
  images: Image[];
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
  guideOpen: boolean;
  statusOpen: boolean;
}

export interface rightMenuButtonsOnClicks {
  about: () => void;
  upload: () => void;
  resetCamera: () => void;
}

export interface ToRender {
  model: Model3D;
  key: string;
}

export interface FullScreenImageInfo {
  src: string;
  title: string;
  prev: FullScreenImageInfo | null;
  next: FullScreenImageInfo | null;
}

export interface CostumeFormElements extends HTMLFormControlsCollection {
  partFiles: HTMLInputElement;
  images: HTMLInputElement;
}

export interface CostumeFormElement extends HTMLFormElement {
  readonly elements: CostumeFormElements;
}

export interface StatusState {
  text: string;
  tailwind: string;
}
