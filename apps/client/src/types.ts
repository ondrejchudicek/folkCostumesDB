import {type Group, type Object3DEventMap} from "three";

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

export interface ActiveCostume{
  costume: Costume;
  parts: boolean[]; // will need key
}

export type AvailableCostumes = Costume[];

export type Model3D = Group<Object3DEventMap>;
