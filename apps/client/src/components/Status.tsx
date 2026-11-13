import type { ReactNode } from 'react';

export default function Status({
  tw,
  children,
  isOpen,
}: {
  tw: string;
  children: ReactNode;
  isOpen: boolean;
}) {
  const visibility = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';

  return (
    <div
      className={`w-100 h-fit fixed top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 bg-(--bg) rounded-(--corner-radius) text-3xl text-center ${visibility} ${tw}`}
    >
      {children}
    </div>
  );
}
