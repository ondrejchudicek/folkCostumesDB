import type { Dispatch, SetStateAction } from "react";
import type { OpenElements } from "../types";

export function openLeftMenu(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
  isMobileLayout: boolean,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.leftMenuOpen = true;
  newAreOpenElements.leftTriggerOpen = false;
  if (isMobileLayout) newAreOpenElements.rightTriggerOpen = false;

  setAreOpenElements(newAreOpenElements);
}

export function closeLeftMenu(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.leftMenuOpen = false;
  newAreOpenElements.leftTriggerOpen = true;
  newAreOpenElements.rightTriggerOpen = true;

  setAreOpenElements(newAreOpenElements);
}

export function openRightMenu(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
  isMobileLayout: boolean,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.rightMenuOpen = true;
  newAreOpenElements.rightTriggerOpen = false;
  if (isMobileLayout) newAreOpenElements.leftTriggerOpen = false;

  setAreOpenElements(newAreOpenElements);
}

export function closeRightMenu(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.rightMenuOpen = false;
  newAreOpenElements.rightTriggerOpen = true;
  newAreOpenElements.leftTriggerOpen = true;

  setAreOpenElements(newAreOpenElements);
}

export function openAbout(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
  isMobileLayout: boolean,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.aboutOpen = true;

  setAreOpenElements(newAreOpenElements);

  if (isMobileLayout) closeRightMenu(newAreOpenElements, setAreOpenElements);
}

export function closeAbout(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.aboutOpen = false;

  setAreOpenElements(newAreOpenElements);
}

export function openUploadForm(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
  isMobileLayout: boolean,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.uploadFormOpen = true;
  setAreOpenElements(newAreOpenElements);

  if (isMobileLayout) closeRightMenu(newAreOpenElements, setAreOpenElements);
}