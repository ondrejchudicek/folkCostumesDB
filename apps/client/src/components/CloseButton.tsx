export default function CloseButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return <div className={`h-10 w-10 bg-red-500`} onClick={handleClick}></div>;
}
