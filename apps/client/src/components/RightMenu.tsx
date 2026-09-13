import { useActiveCostume, useAvailableCostumes } from "../CostumeContext.tsx";
import { useState, type ReactNode } from "react";
import MenuTrigger from "./MenuTrigger.tsx";
import type { OpenElements } from "../types.ts";
import CloseButton from "./CloseButton.tsx";

const SelectedTab = {
  Images: "Images",
  Parts: "Parts",
  Costumes: "Costumes",
};

function RightMenuMainContent({ selectedTab }: { selectedTab: string }) {
  let content: ReactNode;
  const { activeCostume } = useActiveCostume();
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
      content = activeCostume.costume.parts.map((part) => (
        <div className="h-10 w-full bg-(--bg) flex justify-center items-center text-center text-(--font-col) text-xl font-(family-name:--default-font)">
          {part.name}
        </div>
      ));

      break;
    }
    case SelectedTab.Costumes: {
      content = availableCostumes.map((costume) => (
        <div className="h-20 w-full bg-(--bg) flex justify-center items-center text-center text-(--font-col) text-xl font-(family-name:--default-font)">
          {costume.name}
        </div>
      ));
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
      <div className="h-full w-full flex flex-row justify-between items-center bg-blue-600">
        <button onClick={() => setSelectedTab(SelectedTab.Images)}>
          Images
        </button>
        <button onClick={() => setSelectedTab(SelectedTab.Parts)}>Parts</button>
        <button onClick={() => setSelectedTab(SelectedTab.Costumes)}>
          Costumes
        </button>
        {isMobileLayout && <CloseButton handleClick={closeRightMenu} />}
      </div>
      <RightMenuMainContent selectedTab={selectedTab} />
    </div>
  );
}

function Button({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full flex justify-center items-center text-center p-(--global-padding) bg-(--bg) rounded-(--corner-radius) text-(--font-col) text-base font-(family-name:--default-font)">
      {children}
    </div>
  );
}

function RightMenuButtons() {
  return (
    <div
      className={`h-full w-full flex flex-row justify-between gap-x-(--global-padding)`}
    >
      <Button>Reset Camera</Button>
      <Button>Upload Costume</Button>
      <Button>About</Button>
    </div>
  );
}

export default function RightMenu({
  isMobileLayout,
  areOpenElements,
  openRightMenu,
  closeRightMenu,
}: {
  isMobileLayout: boolean;
  areOpenElements: OpenElements;
  openRightMenu: () => void;
  closeRightMenu: () => void;
}) {
  const layout = isMobileLayout ? "col-start-1 row-start-1" : "col-start-3";
  const visibility = areOpenElements.rightMenuOpen
    ? "opacity-100"
    : "opacity-0";
  const pointer =
    isMobileLayout && !areOpenElements.rightMenuOpen
      ? "pointer-events-none"
      : "pointer-events-auto";

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
        <RightMenuButtons />
      </div>
      <MenuTrigger
        text="Left Menu"
        position="bottom-(--global-padding) right-(--global-padding)"
        isTriggerOpen={areOpenElements.rightTriggerOpen}
        handleClick={() => isMobileLayout && openRightMenu()}
      />
    </>
  );
}
