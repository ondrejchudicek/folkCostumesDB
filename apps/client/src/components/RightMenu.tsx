import { useActiveCostume, useAvailableCostumes } from '../Contexts.ts';
import { useState, type ReactNode } from 'react';
import MenuTrigger from './MenuTrigger.tsx';
import type { OpenElements, rightMenuButtonsOnClicks } from '../types.ts';
import CloseButton from './CloseButton.tsx';

const SelectedTab = {
  Images: 'Images',
  Parts: 'Parts',
  Costumes: 'Costumes',
};

function RightMenuMainContent({ selectedTab }: { selectedTab: string }) {
  let content: ReactNode;
  const { activeCostume, setActiveCostume } = useActiveCostume();
  const { availableCostumes } = useAvailableCostumes();

  switch (selectedTab) {
    case SelectedTab.Images: {
      content = activeCostume.costume.images.map((image) => (
        <div className="h-10 w-full bg-(--bg) flex justify-center items-center text-center text-(--font-col) text-xl font-(family-name:--default-font)">
          {image.name}
        </div>
      ));

      break;
    }
    case SelectedTab.Parts: {
      const partButtons: ReactNode[] = [];

      for (let i = 0; i < activeCostume.costume.parts.length; i++) {
        partButtons.push(
          <div
            className="h-10 w-full bg-(--bg) flex justify-center items-center text-center text-(--font-col) text-xl font-(family-name:--default-font)"
            /*onClick={() => {
              let newActiveCostume = { ...activeCostume };
              newActiveCostume.partToggles[i].isActive =
                !newActiveCostume.partToggles[i].isActive;

              setActiveCostume(newActiveCostume);
            }}*/

            onClick={() => {
              setActiveCostume((prev) => ({
                ...prev,
                partToggles: prev.partToggles.map((toggle, index) =>
                  index === i
                    ? {
                        ...toggle,
                        isActive: !toggle.isActive,
                      }
                    : toggle,
                ),
              }));
            }}
          >
            {activeCostume.costume.parts[i].name}
          </div>,
        );
      }

      content = partButtons.map((button) => button);

      break;
    }
    case SelectedTab.Costumes: {
      const costumeButtons: ReactNode[] = [];

      for (let i = 0; i < availableCostumes.length; i++) {
        costumeButtons.push(
          <div
            className="h-20 w-full bg-(--bg) flex justify-center items-center text-center text-(--font-col) text-xl font-(family-name:--default-font)"
            onClick={() =>
              setActiveCostume({
                costume: availableCostumes[i],
                partToggles: availableCostumes[i].parts.map((part) => ({
                  isActive: true,
                  partID: part.partID,
                })),
              })
            }
          >
            {availableCostumes[i].name}
          </div>,
        );
      }

      content = costumeButtons.map((button) => button);

      break;
    }
    default: {
      content = <div>Wrong tab name</div>;
    }
  }

  return (
    <div className="h-full w-full flex flex-col gap-y-(--global-padding) overflow-y-scroll scrollbar-none">
      {content}
    </div>
  );
}

function RightMenuMain({
  isMobileLayout,
  closeRightMenu,
}: {
  isMobileLayout: boolean;
  closeRightMenu: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<string>(SelectedTab.Images);

  return (
    <div
      className={`h-full min-h-0 w-full p-(--global-padding) bg-(--bg) rounded-(--corner-radius) grid grid-rows-[5rem_1fr] gap-y-(--global-padding)`}
    >
      <div className="h-full w-full flex flex-row justify-between items-center">
        <button
          className="text-(--font-col) font-(family-name:--default-font) text-xl"
          onClick={() => setSelectedTab(SelectedTab.Images)}
        >
          Fotky
        </button>
        <button
          className="text-(--font-col) font-(family-name:--default-font) text-xl"
          onClick={() => setSelectedTab(SelectedTab.Parts)}
        >
          Casti
        </button>
        <button
          className="text-(--font-col) font-(family-name:--default-font) text-xl"
          onClick={() => setSelectedTab(SelectedTab.Costumes)}
        >
          Kroje
        </button>
        {isMobileLayout && <CloseButton handleClick={closeRightMenu} />}
      </div>
      <RightMenuMainContent selectedTab={selectedTab} />
    </div>
  );
}

function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="h-full w-full flex justify-center items-center text-center p-(--global-padding) bg-(--bg) rounded-(--corner-radius) text-(--font-col) text-base font-(family-name:--default-font)"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function RightMenuButtons({
  rightMenuButtonsOnClicks,
}: {
  rightMenuButtonsOnClicks: rightMenuButtonsOnClicks;
}) {
  return (
    <div
      className={`h-full w-full flex flex-row justify-between gap-x-(--global-padding)`}
    >
      <Button onClick={rightMenuButtonsOnClicks.resetCamera}>
        Reset Camera
      </Button>
      <Button onClick={rightMenuButtonsOnClicks.upload}>Upload Costume</Button>
      <Button onClick={rightMenuButtonsOnClicks.about}>About</Button>
    </div>
  );
}

export default function RightMenu({
  isMobileLayout,
  areOpenElements,
  openRightMenu,
  closeRightMenu,
  rightMenuButtonsOnClicks,
}: {
  isMobileLayout: boolean;
  areOpenElements: OpenElements;
  openRightMenu: () => void;
  closeRightMenu: () => void;
  rightMenuButtonsOnClicks: rightMenuButtonsOnClicks;
}) {
  const layout = isMobileLayout ? 'col-start-1 row-start-1' : 'col-start-3';
  const visibility = areOpenElements.rightMenuOpen
    ? 'opacity-100'
    : 'opacity-0';
  const pointer =
    isMobileLayout && !areOpenElements.rightMenuOpen
      ? 'pointer-events-none'
      : 'pointer-events-auto';

  return (
    <>
      <div
        className={`h-full min-h-0 w-full relative grid grid-rows-[1fr_5rem] gap-y-(--global-padding) transition-opacity duration-300 ${layout} ${visibility} ${pointer}`}
        onMouseEnter={() => !isMobileLayout && openRightMenu()}
        onMouseLeave={() => !isMobileLayout && closeRightMenu()}
      >
        <RightMenuMain
          isMobileLayout={isMobileLayout}
          closeRightMenu={closeRightMenu}
        />
        <RightMenuButtons rightMenuButtonsOnClicks={rightMenuButtonsOnClicks} />
      </div>
      <MenuTrigger
        text="Right Menu"
        position="bottom-(--global-padding) right-(--global-padding)"
        isTriggerOpen={areOpenElements.rightTriggerOpen}
        handleClick={() => isMobileLayout && openRightMenu()}
      />
    </>
  );
}
