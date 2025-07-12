import { useEffect, useRef } from "react";

//imagenes

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    name: "Bougies",
    image: "/bougies.png",
    description: "Velas aromáticas que iluminan tu alma.",
  },
  {
    name: "Frosty Bites",
    image: "/frosty.png",
    description: "Delicias frías para un día caluroso.",
  },
  {
    name: "Sharpays Boutique",
    image: "/sharpay.png",
    description: "Moda para peluditos con estilo.",
  },
  {
    name: "El paraíso de Dios",
    image: "/paraiso.png",
    description: "Frutas benditas, 100% naturales.",
  },
  {
    name: "No los Atropelles",
    image: "/atropelles.png",
    description: "Campaña vial con impacto visual.",
  },
];

export default function ScrollAnimation() {
  const scrollRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    gsap.to(el, {
      xPercent: -100 * (brands.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        pin: true,
        scrub: 1,
        end: () => "+=" + el.offsetWidth,
      },
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll">
      <div
        ref={scrollRef}
        className="flex h-screen w-[500vw]" // 5 secciones * 100vw
      >
        {brands.map((brand, index) => (
          <section
            key={index}
            className="w-screen h-screen flex items-center justify-center flex-col text-white text-center p-8 bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${brand.image})`,
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <h1 className="text-5xl font-bold mb-4">{brand.name}</h1>
            <p className="text-lg max-w-xl">{brand.description}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
