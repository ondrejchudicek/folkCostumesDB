export default function LeftMenu({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  if (isMobileLayout) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-(--bg) text-(--font-col)">
        leftMenu
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-32 h-full bg-(--bg) text-(--font-col)">
      leftMenu
    </div>
  );
}
