import CloseButton from './CloseButton';

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
    ? 'h-full w-full grid-rows-[4fr_5fr_1fr]'
    : 'h-[80%] max-w-240 grid-cols-[2fr_3fr] grid-rows-[9fr_1fr]';

  return (
    <div
      className={`z-30 w-full h-full fixed left-0 top-0 bg-green-600 flex justify-center items-center ${visibility}`}
    >
      <div className={`grid ${layout} bg-green-950`}>
        <div>
          <div className="overflow-y-scroll scrollbar-none flex flex-col">
            <div className="font-(family-name:--default-font) text-3xl text-(--font-col)">
              "Příprava skenu"
            </div>
            <div className="font-(family-name:--default-font) text-xl text-(--font-col)">
              "Pro nejlepší kvalitu modelu je potřeba dobré rozptýlené světlo
              a&nbsp;nehybný skenovaný předmět. Ideální je tedy denní světlo s
              vysokou oblačností, nebo stín, a&nbsp;figurína. Preferované
              nastavení fotoaparátu je clona f/8 - f/11, krátký expoziční čas,
              nízké ISO a&nbsp;ukládání do RAW formátu. V&nbsp;případě horších
              světelných podmínek se osvědčila menší změna všech parametrů
              zároveň s mírnou prioritou vyšší clony. V&nbsp;případě ručního
              skenu je rovněž vhodná stabilizace. Je nutné neměnit ohniskovou
              vzdálenost při skenování jednoho objektu a&nbsp;mít dobře
              nastavenou expozici tak, aby pokryla světelné podmínky celého
              skenovaného objektu. Rovněž je vhodné vyhnout se silnějšímu větru.
              <br />
              <br />"
            </div>
          </div>
          <div className="gradient"></div>
        </div>
        <div
          className={`h-full w-full bg-amber-400`}
          id="tutorial__image-frame"
        ></div>

        <div
          className={`flex flex-row justify-around ${isMobileLayout ? '' : 'col-span-2'}`}
        >
          <div className="h-10 w-10 bg-red-600"></div>
          <div className="h-10 w-10 bg-red-600"></div>
        </div>
      </div>

      <CloseButton
        handleClick={closeGuide}
        tailwind={'fixed top-(--global-padding) right-(--global-padding)'}
      />
    </div>
  );
}
