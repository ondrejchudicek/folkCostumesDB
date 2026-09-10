import { useState } from "react";
import { useActiveCostume } from "../CostumeContext.tsx";

function MenuTrigger({
  text,
  tw,
  handleClick,
}: {
  text: string;
  tw: string;
  handleClick?: () => void;
}) {
  return (
    <div
      className={`z-21 h-12 w-40 absolute bottom-0 left-0 flex justify-center items-center text-center bg-(--bg) rounded-(--corner-radius) transition-opacity duration-300 ${tw}`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}

function CloseButton({ handleClick }: { handleClick: () => void }) {
  return <div className={`h-10 w-10 bg-red-500`} onClick={handleClick}></div>;
}

function Title({
  text,
  tw = "",
  isMobileLayout,
  setIsMenuOpen,
}: {
  text: string;
  tw?: string;
  isMobileLayout: boolean;
  setIsMenuOpen: (_: boolean) => void;
}) {
  return (
    <div
      className={`h-full w-full bg-(--bg) flex items-center justify-around text-(--font-col) text-3xl text-center font-(family-name:--title-font) rounded-(--corner-radius) p-(--global-padding) duration-300 ${tw}`}
    >
      {text}
      {isMobileLayout && (
        <CloseButton handleClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
}

function Description({ text, tw }: { text: string; tw: string }) {
  return (
    <div
      className={`z-22 h-full min-h-0 w-full bg-(--bg) rounded-(--corner-radius) p-(--global-padding) transition-opacity duration-300 ${tw}`}
    >
      <div className="h-full w-full overflow-y-auto scrollbar-none text-(--font-col) text-xl font-(family-name:--default-font)">
        {text}
      </div>
    </div>
  );
}

export default function LeftMenu({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeCostume } = useActiveCostume();

  if (isMobileLayout) {
    return (
      <div
        className={`h-full min-h-0 w-full relative grid grid-rows-[10rem_1fr] gap-y-(--global-padding) pointer-events-auto`}
      >
        <MenuTrigger
          text="Left Menu"
          tw={
            isMenuOpen
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }
          handleClick={() => setIsMenuOpen(true)}
        />
        <Title
          text={activeCostume.costume.name}
          tw={
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          isMobileLayout={isMobileLayout}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Description
          text={activeCostume.costume.description}
          tw={
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`h-full min-h-0 w-full relative grid grid-rows-[10rem_1fr] gap-y-(--global-padding) pointer-events-auto`}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <MenuTrigger
        text="Left Menu"
        tw={
          isMenuOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }
      />
      <Title
        text={activeCostume.costume.name}
        isMobileLayout={isMobileLayout}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Description
        text={activeCostume.costume.description}
        tw={
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      />
    </div>
  );
}
