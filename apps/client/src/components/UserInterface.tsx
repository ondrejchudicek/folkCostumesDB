import { useState } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import type { OpenElements, rightMenuButtonsOnClicks } from '../types';
import About from './About';
import {
  openAbout,
  openUploadForm,
  openLeftMenu,
  closeLeftMenu,
  closeAbout,
  openRightMenu,
  closeRightMenu,
} from '../utils/manageOpenComponents';

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
