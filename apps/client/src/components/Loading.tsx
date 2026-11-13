export default function Loading({ tw }: { tw: string }) {
  return (
    <div className={`loading ${tw}`}>
      <div className="loading-anim"></div>
    </div>
  );
}
