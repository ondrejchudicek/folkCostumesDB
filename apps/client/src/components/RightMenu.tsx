import {
  useActiveCostume,
  useAvailableCostumes,
  useOpenFullScreenImageContext,
} from '../Contexts.ts';
import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import MenuTrigger from './MenuTrigger.tsx';
import type {
  ActiveCostume,
  Costume,
  FullScreenImageInfo,
  OpenElements,
  rightMenuButtonsOnClicks,
} from '../types.ts';
import CloseButton from './CloseButton.tsx';
import MenuCard from './MenuCard.tsx';

const SelectedTab = {
  Images: 'Images',
  Parts: 'Parts',
  Costumes: 'Costumes',
};

function PartCard({
  activeCostume,
  setActiveCostume,
  i,
}: {
  activeCostume: ActiveCostume;
  setActiveCostume: Dispatch<SetStateAction<ActiveCostume>>;
  i: number;
}) {
  function handleClick() {
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
  }

  return (
    <MenuCard
      tailWind={
        activeCostume.partToggles[i].isActive
          ? 'text-green-600'
          : 'text-(--font-col)'
      }
      key={activeCostume.costume.parts[i].partID}
      handleClick={handleClick}
    >
      {activeCostume.costume.parts[i].name}
    </MenuCard>
  );
}

function CostumeCard({
  availableCostumeI,
  setActiveCostume,
}: {
  availableCostumeI: Costume;
  setActiveCostume: Dispatch<SetStateAction<ActiveCostume>>;
}) {
  function handleClick() {
    setActiveCostume({
      costume: availableCostumeI,
      partToggles: availableCostumeI.parts.map((part) => ({
        isActive: true,
        partID: part.partID,
      })),
    });
  }

  const image = (
    <img
      className="h-full max-w-[50%]"
      src={availableCostumeI.images[0].path}
      alt="Title Image Missing"
    />
  );

  return (
    <MenuCard
      handleClick={handleClick}
      key={availableCostumeI.costumeID}
      image={image}
    >
      {availableCostumeI.name}
    </MenuCard>
  );
}

function RightMenuMainContent({ selectedTab }: { selectedTab: string }) {
  let content: ReactNode;
  const { activeCostume, setActiveCostume } = useActiveCostume();
  const { availableCostumes } = useAvailableCostumes();
  const { openFullScreenImage } = useOpenFullScreenImageContext();

  switch (selectedTab) {
    case SelectedTab.Images: {
      const imageButtons = [];
      const images = activeCostume.costume.images;
      const fullScreenImageInfos: FullScreenImageInfo[] = [];

      for (let i = 0; i < images.length; i++) {
        fullScreenImageInfos.push({
          src: images[i].path,
          title: images[i].name,
          prev: null,
          next: null,
        });
      }

      for (let i = 0; i < images.length; i++) {
        fullScreenImageInfos[i].next =
          fullScreenImageInfos[(i + 1) % images.length];
        fullScreenImageInfos[i].prev =
          fullScreenImageInfos[(i - 1 + images.length) % images.length];
      }

      for (let i = 0; i < images.length; i++) {
        imageButtons.push(
          <div
            className="w-full h-fit"
            key={images[i].imageID}
            onClick={() =>
              openFullScreenImage({
                fullScreenImageInfo: fullScreenImageInfos[i],
              })
            }
          >
            <img src={images[i].path} alt={images[i].name} />
          </div>,
        );
      }

      content = imageButtons.map((button) => button);
      break;
    }
    case SelectedTab.Parts: {
      const partButtons: ReactNode[] = [];

      for (let i = 0; i < activeCostume.costume.parts.length; i++) {
        partButtons.push(
          <PartCard
            activeCostume={activeCostume}
            setActiveCostume={setActiveCostume}
            i={i}
          />,
        );
      }

      content = partButtons.map((button) => button);
      break;
    }
    case SelectedTab.Costumes: {
      const costumeButtons: ReactNode[] = [];

      for (let i = 0; i < availableCostumes.length; i++) {
        costumeButtons.push(
          <CostumeCard
            availableCostumeI={availableCostumes[i]}
            setActiveCostume={setActiveCostume}
          />,
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
          className={`${selectedTab === SelectedTab.Images ? 'text-green-600' : 'text-(--font-col)'} font-(family-name:--default-font) text-xl`}
          onClick={() => setSelectedTab(SelectedTab.Images)}
        >
          Fotky
        </button>
        <button
          className={`${selectedTab === SelectedTab.Parts ? 'text-green-600' : 'text-(--font-col)'} font-(family-name:--default-font) text-xl`}
          onClick={() => setSelectedTab(SelectedTab.Parts)}
        >
          Části
        </button>
        <button
          className={`${selectedTab === SelectedTab.Costumes ? 'text-green-600' : 'text-(--font-col)'} font-(family-name:--default-font) text-xl`}
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
        Resetovat kameru
      </Button>
      <Button onClick={rightMenuButtonsOnClicks.upload}>Nahrát kroj</Button>
      <Button onClick={rightMenuButtonsOnClicks.about}>O aplikaci</Button>
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
        text="Menu"
        position="bottom-(--global-padding) right-(--global-padding)"
        isTriggerOpen={areOpenElements.rightTriggerOpen}
        handleClick={() => isMobileLayout && openRightMenu()}
      />
    </>
  );
}
