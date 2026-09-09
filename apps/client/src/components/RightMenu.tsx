export default function RightMenu({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  if (isMobileLayout) {
    return (
      <div className="fixed top-0 right-0 w-full h-full bg-(--bg) text-(--font-col)">
        mobile
      </div>
    );
  }
  return (
    <div className="fixed top-0 right-0 w-32 h-full bg-(--bg) text-(--font-col)">
      normal
    </div>
  );
}
