import { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

//reads currentCostume and updates itself accordingly, can setCostume

export default function UserInterface({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  const grid = isMobileLayout ? "grid" : "grid grid-cols-[20rem_1fr_20rem]";
  const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);

  return (
    <div
      className={`z-20 p-(--global-padding) ${grid} h-full min-h-0 w-full pointer-events-none`}
    >
      <LeftMenu
        isMobileLayout={isMobileLayout}
        isAnyMenuOpen={isAnyMenuOpen}
        setIsAnyMenuOpen={setIsAnyMenuOpen}
      />
      <RightMenu
        isMobileLayout={isMobileLayout}
        isAnyMenuOpen={isAnyMenuOpen}
        setIsAnyMenuOpen={setIsAnyMenuOpen}
      />
    </div>
  );
}
