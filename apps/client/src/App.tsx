import { useState } from "react";
import "./App.css";
import UserInterface from "./components/UserInterface";
import Renderer from "./components/Renderer";
import type { ActiveCostume, Costume } from "./types.ts";
import {
  ActiveCostumeContext,
  AvailableCostumesContext,
} from "./CostumeContext.tsx";

// for testing ------------------------------
const initialCostume: Costume = {
  costumeID: "18de65c8-75f9-4120-946c-eac9e8a66711",
  name: "Kněždubský mužský nedělní kroj",
  description:
    "I když dokumentovaná historie kněždubského kroje sahá do 18. století, v průběhu let se výrazně vyvíjel. Ať už díky lepší dostupnosti materiálů, vývoji průmyslu, bohatnutí obyvatelstva i změně preferencí vesničanů na jeho vzhled a snaze odlišit se od ostatních vesnic. Dnešní podoba kroje je poměrně mladá, asi z 60. let 20. století a charakterizuje ji bohatá výzdoba. Tato verze kroje byla převážně používána na nedělní mše svaté. O svátcích, pouti, hodech či svatbách však byla používána mírně zdobnější verze doplněna o mašli a košili s širokými šringlovanými rukávy. Kroj se skládá z košile, modré vesty kordule, soukenných kalhot zvaných nohavice, vysokých kožených bot zvaných čižmy, šátku na boku a klobouku s kohoutím peřím kosárkem. Peří a šátek označují svobodného muže.",
  parts: [
    {
      partID: "part_18de65c8-75f9-4120-946c-eac9e8a66711_0",
      name: "Čižmy",
      path: "19aa583e-8c75-4d48-b4f6-372685178f55-boty2.glb",
    },
    {
      partID: "part_18de65c8-75f9-4120-946c-eac9e8a66711_1",
      name: "Nohavice",
      path: "cec8dcf6-2fa2-426c-9840-43523f641e54-gate2.glb",
    },
    {
      partID: "part_18de65c8-75f9-4120-946c-eac9e8a66711_2",
      name: "Klobúk",
      path: "5d34007c-bb74-494e-8022-d4f4d9f19ed8-klobuk.glb",
    },
    {
      partID: "part_18de65c8-75f9-4120-946c-eac9e8a66711_3",
      name: "Kordula",
      path: "a3906112-8d35-4b45-897e-8ab2e5685d39-kordula3.glb",
    },
    {
      partID: "part_18de65c8-75f9-4120-946c-eac9e8a66711_4",
      name: "Košela",
      path: "03e0a448-fd59-450c-8d56-40e97a986c91-kosela3.glb",
    },
    {
      partID: "part_18de65c8-75f9-4120-946c-eac9e8a66711_5",
      name: "Šátek",
      path: "6db672b4-eb4a-43a8-acc3-442012629129-satek2.glb",
    },
  ],
  images: [
    {
      imageID: "image_18de65c8-75f9-4120-946c-eac9e8a66711_0",
      name: "Nedělní kroj",
      path: "/images/5d60a609-178e-4e6a-b3fb-bb67d1cef811-1.jpg",
    },
  ],
};

const initialActiveCostume: ActiveCostume = {
  costume: initialCostume,
  partToggles: [
    { isActive: true, partID: initialCostume.parts[0].partID },
    { isActive: true, partID: initialCostume.parts[1].partID },
    { isActive: true, partID: initialCostume.parts[2].partID },
    { isActive: true, partID: initialCostume.parts[3].partID },
    { isActive: true, partID: initialCostume.parts[4].partID },
    { isActive: true, partID: initialCostume.parts[5].partID },
  ],
};
// for testing ------------------------------

// stores activeCostume and availableCostumes
// shares activeCostume with rendrer and UI, shares availableCostumes with UI.
export default function App() {
  const [activeCostume, setActiveCostume] =
    useState<ActiveCostume>(initialActiveCostume);
  const availableCostumes: Costume[] = [initialActiveCostume.costume]; //wont change, will eventually load from server
  const [isMobileLayout, setIsMobileLayout] = useState<boolean>(
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1080,
  );

  window.addEventListener("resize", () => {
    if (
      (window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1080) !== isMobileLayout
    )
      setIsMobileLayout(!isMobileLayout);
  });

  return (
    <>
      <ActiveCostumeContext.Provider
        value={{ activeCostume, setActiveCostume }}
      >
        <Renderer />
        <AvailableCostumesContext.Provider value={{ availableCostumes }}>
          <UserInterface isMobileLayout={isMobileLayout} />
        </AvailableCostumesContext.Provider>
      </ActiveCostumeContext.Provider>
    </>
  );
}
