import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

//reads currentCostume and updates itself accordingly, can setCostume

export default function UserInterface({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  return (
    <div className="z-20">
      <LeftMenu isMobileLayout={isMobileLayout} />
      <RightMenu isMobileLayout={isMobileLayout} />
    </div>
  );
}
