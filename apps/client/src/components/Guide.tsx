import { useState } from 'react';
import CloseButton from './CloseButton';
import { guideText } from '../resources/guideText.ts';

function Text({ page }: { page: number }) {
  return (
    <div className="h-full w-full overflow-y-auto scrollbar-none flex flex-col gap-y-(--global-padding)">
      <div
        className="font-(family-name:--default-font) text-3xl text-(--font-col)"
        dangerouslySetInnerHTML={{ __html: guideText[page].title }}
      />
      <div
        className="font-(family-name:--default-font) text-xl text-(--font-col)"
        dangerouslySetInnerHTML={{ __html: guideText[page].text }}
      />
      <div className="h-10 min-h-10 w-full"></div>
    </div>
  );
}

export default function Guide({
  isMobileLayout,
  isOpen,
  closeGuide,
}: {
  isMobileLayout: boolean;
  isOpen: boolean;
  closeGuide: () => void;
}) {
  const visibility = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';
  const layout = isMobileLayout
    ? 'h-full w-full grid-rows-[7fr_9fr_1fr]'
    : 'h-[80%] max-w-240 grid-cols-[2fr_3fr] grid-rows-[1fr_3rem]';
  const [page, setPage] = useState(0);

  return (
    <div
      className={`z-30 w-full h-full fixed left-0 top-0 bg-green-600 flex justify-center items-center ${visibility}`}
    >
      <div
        className={`grid ${layout} gap-(--global-padding) p-(--global-padding) rounded-(--corner-radius) bg-green-950`}
      >
        <div className="relative overflow-hidden">
          <Text page={page} />
          <div className="pointer-events-none absolute bottom-0 h-25 w-full bg-linear-180 from-green-950-0% to-green-950"></div>
        </div>
        <img
          src={`/tutorial_images/${guideText[page].imageName}`}
          alt={guideText[page].imageName}
          className="h-full w-full min-h-0 min-w-0 object-contain block"
        ></img>

        <div
          className={`flex flex-row items-center justify-around ${isMobileLayout ? '' : 'col-span-2'}`}
        >
          <img
            src="arrow.svg"
            alt="Left Arrow"
            className="h-10 w-10"
            onClick={() =>
              setPage((page - 1 + guideText.length) % guideText.length)
            }
          ></img>
          <img
            src="arrow.svg"
            alt="Left Arrow"
            className="rotate-180 h-10 w-10"
            onClick={() => setPage((page + 1) % guideText.length)}
          ></img>
        </div>
      </div>

      <CloseButton
        handleClick={closeGuide}
        tailwind={'fixed top-(--global-padding) right-(--global-padding)'}
      />
    </div>
  );
}
