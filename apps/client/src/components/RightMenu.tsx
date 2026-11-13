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
  Part,
  Image,
  rightMenuButtonsOnClicks,
} from '../types.ts';
import CloseButton from './CloseButton.tsx';
import MenuCard from './MenuCard.tsx';

const API = 'http://localhost:3000/api';

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
      kkey={activeCostume.parts[i].partID.toString()}
      handleClick={handleClick}
    >
      {activeCostume.parts[i].name}
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
  async function handleClick() {
    const parts: Part[] = await (
      await fetch(`${API}/costumes/models/${availableCostumeI.costumeID}`)
    ).json();
    const images: Image[] = await (
      await fetch(`${API}/costumes/images/${availableCostumeI.costumeID}`)
    ).json();

    setActiveCostume({
      costume: availableCostumeI,
      partToggles: parts.map((part) => ({
        isActive: true,
        partID: part.partID,
      })),
      parts,
      images,
    });
  }

  if (availableCostumeI.thumbnailImageID) {
    const image = (
      <img
        className="h-full max-w-[50%]"
        src={`${API}/images/${availableCostumeI.thumbnailImageID}`}
        alt="Title Image Missing"
      />
    );

    return (
      <MenuCard
        handleClick={handleClick}
        kkey={availableCostumeI.costumeID.toString()}
        tailWind="text-(--font-col)"
        image={image}
      >
        {availableCostumeI.name}
      </MenuCard>
    );
  }

  return (
    <MenuCard
      handleClick={handleClick}
      kkey={availableCostumeI.costumeID.toString()}
      tailWind="text-(--font-col)"
    >
      {availableCostumeI.name}
    </MenuCard>
  );
}

function RightMenuMainContent({ selectedTab }: { selectedTab: string }) {
  let content: ReactNode;
  const { activeCostume, setActiveCostume } = useActiveCostume();
  const { availableCostumes } = useAvailableCostumes();
  const { openAndSetFullScreenImage } = useOpenFullScreenImageContext();

  switch (selectedTab) {
    case SelectedTab.Images: {
      const imageButtons = [];
      const images = activeCostume.images;
      const fullScreenImageInfos: FullScreenImageInfo[] = [];

      for (let i = 0; i < images.length; i++) {
        fullScreenImageInfos.push({
          src: `${API}/images/${images[i].imageID}`,
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
            onClick={() => openAndSetFullScreenImage(fullScreenImageInfos[i])}
          >
            <img
              src={`${API}/images/${images[i].imageID}`}
              alt={images[i].name}
            />
          </div>,
        );
      }

      content = imageButtons.map((button) => button);
      break;
    }
    case SelectedTab.Parts: {
      const partButtons: ReactNode[] = [];

      for (let i = 0; i < activeCostume.parts.length; i++) {
        partButtons.push(
          <PartCard
            activeCostume={activeCostume}
            setActiveCostume={setActiveCostume}
            i={i}
            key={activeCostume.parts[i].partID.toString()}
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
            key={availableCostumes[i].costumeID.toString()}
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
      className={`h-full min-h-0 w-full p-(--global-padding) bg-(--bg) rounded-(--corner-radius) grid grid-rows-[2rem_1fr] gap-y-(--global-padding)`}
    >
      <div className="h-full w-full flex flex-row justify-around items-center">
        <button
          className={`${selectedTab === SelectedTab.Images ? 'text-green-600' : 'text-(--font-col)'} font-(family-name:--default-font) text-xl`}
          onClick={() => setSelectedTab(SelectedTab.Images)}
        >
          Fotky
        </button>
        <span className="text-(--font-col) font-(family-name:--default-font) text-xl">
          |
        </span>
        <button
          className={`${selectedTab === SelectedTab.Parts ? 'text-green-600' : 'text-(--font-col)'} font-(family-name:--default-font) text-xl`}
          onClick={() => setSelectedTab(SelectedTab.Parts)}
        >
          Části
        </button>
        <span className="text-(--font-col) font-(family-name:--default-font) text-xl">
          |
        </span>
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
