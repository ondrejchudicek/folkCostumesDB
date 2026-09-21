import type { OpenElements } from '../types';
import CloseButton from './CloseButton';

export default function About({
  areOpenElements,
  isMobileLayout,
  closeAbout,
}: {
  areOpenElements: OpenElements;
  isMobileLayout: boolean;
  closeAbout: () => void;
}) {
  const visibility = areOpenElements.aboutOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';
  const layout = isMobileLayout ? 'col-start-1 row-start-1' : 'col-start-2';

  return (
    <div
      className={`z-23 h-fit w-full p-(--global-padding) bg-(--bg) rounded-(--corner-radius) grid grid-rows[6rem_1rem] grid-cols-2 gap-y-(--global-padding) self-center ${layout} ${visibility}`}
    >
      <div className="text-(--font-col) text-3xl font-(family-name:--base-font)">
        O aplikaci
      </div>
      <CloseButton
        handleClick={closeAbout}
        tailwind={'col-start-2 justify-self-end'}
      />
      <div className="row-start-2 col-span-2 text-(--font-col) text-xl font-(family-name:--base-font)">
        Cílem aplikace bylo vytvořit veřejný prostor pro dokumentaci
        a&nbsp;prezentaci krojů a&nbsp;přitom zjednodušit proces skenování
        a&nbsp;sdílení modelů.
        <br />
        <br />
        Hlavní částí je prohlížeč kroje, který může návštěvník otáčet (levé
        tlačítko), přibližovat (kolečko) a&nbsp;posouvat (pravé tlačítko).
        V&nbsp;levé části se nachází popis kroje a&nbsp;na pravo menu se sekcemi
        Obrázky, Součásti a&nbsp;Kroje. V&nbsp;sekci Součásti může uživatel
        libovolně vypínat jednotlivé části oblečení pro prohlížení všech vrstev
        a&nbsp;sekce Kroje slouží pro výběr modelu.
        <br />
        Dále je v&nbsp;menu možné nahrát nový kroj. Ten musí mít název, popis
        a&nbsp;alespoň jeden model ve formátu GLB. Rovněž je možné nahrát
        fotografie kroje, z nichž první bude použita v&nbsp;menu výběru krojů.
        <a href="/tutorial.html">Kompletní průvodce procesem</a> je přístupný z
        panelu nahrávání kroje.
        <br />
        <br />
        Aplikace byla vytvořena v&nbsp;rámci magisterské práce "Interactive Web
        Platform for Presenting 3D Models of Folk Costumes" na FI MUNI.
      </div>
    </div>
  );
}
