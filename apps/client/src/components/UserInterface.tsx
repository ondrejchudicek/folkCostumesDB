import { useState } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import {
  type StatusState,
  type FullScreenImageInfo,
  type OpenElements,
  type rightMenuButtonsOnClicks,
} from '../types';
import About from './About';
import {
  openAbout,
  openUploadForm,
  openLeftMenu,
  closeLeftMenu,
  closeAbout,
  openRightMenu,
  closeRightMenu,
  openFullScreenImage,
  closeFullScreenImage,
  closeUploadForm,
  closeGuide,
  openGuide,
  openStatus,
  closeStatus,
} from '../utils/manageOpenComponents';
import FullScreenImage from './FullScreenImage';
import { OpenFullScreenImageContext } from '../Contexts';
import UploadForm from './UploadForm';
import Guide from './Guide';
import Loading from './Loading';
import Status from './Status';

//reads currentCostume and updates itself accordingly, can setCostume

export default function UserInterface({
  isMobileLayout,
  controlsReset,
  isLoading,
}: {
  isMobileLayout: boolean;
  controlsReset: () => void;
  isLoading: boolean;
}) {
  const grid = isMobileLayout
    ? 'grid'
    : 'grid grid-cols-[20rem_1fr_20rem] grid-rows-[100%]';
  const [areOpenElements, setAreOpenElements] = useState<OpenElements>({
    leftMenuOpen: false,
    rightMenuOpen: false,
    leftTriggerOpen: true,
    rightTriggerOpen: true,
    aboutOpen: false,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
    guideOpen: false,
    statusOpen: false,
  });
  const [fullScreenImageInfo, setFullScreenImageInfo] =
    useState<FullScreenImageInfo>({
      src: '',
      title: '',
      next: null,
      prev: null,
    });
  const [status, setStatus] = useState<StatusState>({
    text: 'No text set',
    tailwind: '',
  });

  const rightMenuButtonsOnClicks: rightMenuButtonsOnClicks = {
    about: () => openAbout(areOpenElements, setAreOpenElements, isMobileLayout),
    upload: () =>
      openUploadForm(areOpenElements, setAreOpenElements, isMobileLayout),
    resetCamera: () => controlsReset(),
  };

  return (
    <div
      className={`z-20 fixed p-(--global-padding) ${grid} gap-x-(--global-padding) h-full w-full pointer-events-none`}
    >
      <Loading tw={isLoading ? 'opacity-100' : 'opacity-0'} />
      <Status tw={status.tailwind} isOpen={areOpenElements.statusOpen}>
        {status.text}
      </Status>
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
      <OpenFullScreenImageContext.Provider
        value={{
          openAndSetFullScreenImage(info) {
            openFullScreenImage(areOpenElements, setAreOpenElements);
            setFullScreenImageInfo(info);
          },
        }}
      >
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
      </OpenFullScreenImageContext.Provider>

      <FullScreenImage
        isOpen={areOpenElements.fullScreenImageOpen}
        fullScreenImageInfo={fullScreenImageInfo}
        closeFullScreenImage={() =>
          closeFullScreenImage(areOpenElements, setAreOpenElements)
        }
        next={() =>
          fullScreenImageInfo.next &&
          setFullScreenImageInfo(fullScreenImageInfo.next)
        }
        prev={() =>
          fullScreenImageInfo.prev &&
          setFullScreenImageInfo(fullScreenImageInfo.prev)
        }
      />
      <UploadForm
        isOpen={areOpenElements.uploadFormOpen}
        closeUploadForm={() =>
          closeUploadForm(areOpenElements, setAreOpenElements)
        }
        isMobileLayout={isMobileLayout}
        openGuide={() => openGuide(areOpenElements, setAreOpenElements)}
        openStatus={() => openStatus(areOpenElements, setAreOpenElements)}
        closeStatus={() => closeStatus(areOpenElements, setAreOpenElements)}
        setStatus={setStatus}
      />
      <Guide
        isMobileLayout={isMobileLayout}
        isOpen={areOpenElements.guideOpen}
        closeGuide={() => closeGuide(areOpenElements, setAreOpenElements)}
      />
    </div>
  );
}
