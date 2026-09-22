import { useState, type Dispatch, type SetStateAction } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import type { OpenElements, rightMenuButtonsOnClicks } from '../types';
import About from './About';

function openLeftMenu(
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

function closeLeftMenu(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.leftMenuOpen = false;
  newAreOpenElements.leftTriggerOpen = true;
  newAreOpenElements.rightTriggerOpen = true;

  setAreOpenElements(newAreOpenElements);
}

function openRightMenu(
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

function closeRightMenu(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.rightMenuOpen = false;
  newAreOpenElements.rightTriggerOpen = true;
  newAreOpenElements.leftTriggerOpen = true;

  setAreOpenElements(newAreOpenElements);
}

function openAbout(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
  isMobileLayout: boolean,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.aboutOpen = true;

  setAreOpenElements(newAreOpenElements);

  if (isMobileLayout) closeRightMenu(newAreOpenElements, setAreOpenElements);
}

function closeAbout(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.aboutOpen = false;

  setAreOpenElements(newAreOpenElements);
}

function openUploadForm(
  areOpenElements: OpenElements,
  setAreOpenElements: Dispatch<SetStateAction<OpenElements>>,
  isMobileLayout: boolean,
) {
  const newAreOpenElements = { ...areOpenElements };
  newAreOpenElements.uploadFormOpen = true;
  setAreOpenElements(newAreOpenElements);

  if (isMobileLayout) closeRightMenu(newAreOpenElements, setAreOpenElements);
}

function resetCamera() {
  return -1;
}

//reads currentCostume and updates itself accordingly, can setCostume

export default function UserInterface({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  const grid = isMobileLayout ? 'grid' : 'grid grid-cols-[20rem_1fr_20rem]';
  const [areOpenElements, setAreOpenElements] = useState<OpenElements>({
    leftMenuOpen: false,
    rightMenuOpen: false,
    leftTriggerOpen: true,
    rightTriggerOpen: true,
    aboutOpen: false,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
  });

  const rightMenuButtonsOnClicks: rightMenuButtonsOnClicks = {
    about: () => openAbout(areOpenElements, setAreOpenElements, isMobileLayout),
    upload: () =>
      openUploadForm(areOpenElements, setAreOpenElements, isMobileLayout),
    resetCamera: () => resetCamera(),
  };

  return (
    <div
      className={`z-20 p-(--global-padding) ${grid} gap-x-(--global-padding) h-full min-h-0 w-full pointer-events-none`}
    >
      <LeftMenu
        isMobileLayout={isMobileLayout}
        areOpenElements={areOpenElements}
        openLeftMenu={() =>
          openLeftMenu(areOpenElements, setAreOpenElements, isMobileLayout)
        }
        closeLeftMenu={() => closeLeftMenu(areOpenElements, setAreOpenElements)}
      />
      <About
        areOpenElements={areOpenElements}
        isMobileLayout={isMobileLayout}
        closeAbout={() => closeAbout(areOpenElements, setAreOpenElements)}
      />
      <RightMenu
        isMobileLayout={isMobileLayout}
        areOpenElements={areOpenElements}
        openRightMenu={() =>
          openRightMenu(areOpenElements, setAreOpenElements, isMobileLayout)
        }
        closeRightMenu={() =>
          closeRightMenu(areOpenElements, setAreOpenElements)
        }
        rightMenuButtonsOnClicks={rightMenuButtonsOnClicks}
      />
    </div>
  );
}
