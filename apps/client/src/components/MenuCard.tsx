import type { ReactNode } from 'react';

export default function MenuCard({
  handleClick,
  tailWind,
  kkey,
  children,
  image,
}: {
  handleClick: () => void;
  tailWind?: string;
  kkey: string;
  image?: ReactNode;
  children?: ReactNode;
}) {
  if (image)
    return (
      <div
        className={`h-40 w-full bg-(--bg) flex justify-center items-center gap-x-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) text-center font-(family-name:--default-font) text-xl overflow-hidden ${tailWind}`}
        key={kkey}
        onClick={handleClick}
      >
        {image}
        {children}
      </div>
    );
  return (
    <div
      className={`h-15 w-full bg-(--bg) flex justify-center items-center p-(--global-padding) rounded-(--corner-radius) text-center font-(family-name:--default-font) text-xl ${tailWind}`}
      key={kkey}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
