import { useState, type Dispatch, type SetStateAction } from "react";
import { useActiveCostume } from "../CostumeContext.tsx";
import MenuTrigger from "./MenuTrigger.tsx";

function CloseButton({ handleClick }: { handleClick: () => void }) {
  return <div className={`h-10 w-10 bg-red-500`} onClick={handleClick}></div>;
}

function Title({
  text,
  isMobileLayout,
  manageMenuOpen,
}: {
  text: string;
  isMobileLayout: boolean;
  manageMenuOpen: (b: boolean) => void;
}) {
  return (
    <div
      className={`h-full w-full bg-(--bg) flex items-center justify-around text-(--font-col) text-3xl text-center font-(family-name:--title-font) rounded-(--corner-radius) p-(--global-padding)`}
    >
      {text}
      {isMobileLayout && (
        <CloseButton
          handleClick={() => {
            manageMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}

function Description({
  text,
  isMenuOpen,
  isMobileLayout,
}: {
  text: string;
  isMenuOpen: boolean;
  isMobileLayout: boolean;
}) {
  const visibility = isMenuOpen || isMobileLayout ? "opacity-100" : "opacity-0";

  return (
    <div
      className={`h-full min-h-0 w-full bg-(--bg) rounded-(--corner-radius) p-(--global-padding) transition-opacity duration-300 ${visibility}`}
    >
      <div className="h-full w-full overflow-y-auto scrollbar-none text-(--font-col) text-xl font-(family-name:--default-font)">
        {text}
      </div>
    </div>
  );
}

export default function LeftMenu({
  isMobileLayout,
  isAnyMenuOpen,
  setIsAnyMenuOpen,
}: {
  isMobileLayout: boolean;
  isAnyMenuOpen: boolean;
  setIsAnyMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeCostume } = useActiveCostume();
  const manageMenuOpen = (b: boolean) => {
    setIsMenuOpen(b);
    setIsAnyMenuOpen(b);
  };
  const layout = isMobileLayout
    ? "col-start-1 row-start-1"
    : "col-start-1 pointer-events-auto";
  const visibility =
    isMobileLayout && !isMenuOpen ? "opacity-0" : "opacity-100";
  const pointer =
    isMobileLayout && !isMenuOpen
      ? "pointer-events-none"
      : "pointer-events-auto";

  return (
    <>
      <div
        className={`h-full min-h-0 w-full relative grid grid-rows-[10rem_1fr] gap-y-(--global-padding) transition-opacity duration-300 ${layout} ${visibility} ${pointer}`}
        onMouseEnter={() => !isMobileLayout && manageMenuOpen(true)}
        onMouseLeave={() => !isMobileLayout && manageMenuOpen(false)}
      >
        <Title
          text={activeCostume.costume.name}
          isMobileLayout={isMobileLayout}
          manageMenuOpen={manageMenuOpen}
        />
        <Description
          text={activeCostume.costume.description}
          isMenuOpen={isMenuOpen}
          isMobileLayout={isMobileLayout}
        />
      </div>
      <MenuTrigger
        text="Left Menu"
        position="bottom-(--global-padding) left-(--global-padding)"
        isMobileLayout={isMobileLayout}
        isMenuOpen={isMenuOpen}
        isAnyMenuOpen={isAnyMenuOpen}
        handleClick={() => isMobileLayout && manageMenuOpen(true)}
      />
    </>
  );
}
