import { StaticImageData } from "next/image";
import photo1 from "./photos/1.jpg";
import photo2 from "./photos/2.jpg";
import photo3 from "./photos/3.jpg";
import photo4 from "./photos/4.jpg";
import photo5 from "./photos/5.jpg";

export type WonderImage = {
  id: string;
  name: string;
  src: StaticImageData;
  photographer: string;
  location: string;
};

export const wonderImages: WonderImage[] = [
  {
    id: "1",
    name: "The Great Wave off Kanagawa",
    src: photo1,
    photographer: "Hiroshi Imaizumi",
    location: "Japan",
  },
  {
    id: "2",
    name: "The Colosseum",
    src: photo2,
    photographer: "Michelangelo",
    location: "Italy",
  },
  {
    id: "3",
    name: "The Great Wave off Kanagawa",
    src: photo3,
    photographer: "Hiroshi Imaizumi",
    location: "Japan",
  },
  {
    id: "4",
    name: "The Colosseum",
    src: photo4,
    photographer: "Michelangelo",
    location: "Italy",
  },
  {
    id: "5",
    name: "The Great Wave off Kanagawa",
    src: photo5,
    photographer: "Hiroshi Imaizumi",
    location: "Japan",
  },
];
