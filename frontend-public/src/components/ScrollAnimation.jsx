import { useEffect, useRef } from "react";

import bougiesBack from "../assets/bougies.jpeg";
import bougiesLogo from "../assets/bougies.png";

import frostyBack from "../assets/frosty.jpeg";
import frostyLogo from "../assets/frostyBitesWhite.png";

import sharpaysBack from "../assets/sharpays.jpeg";
import sharpaysLogo from "../assets/sharpaysLogoPink.png";

import paraisoBack from "../assets/paraiso.jpeg";
import paraisoLogo from "../assets/elParaisoDeDios.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    name: "Bougies",
    logo: bougiesLogo,
    background: bougiesBack,
    description: "Velas aromáticas que iluminan tu alma.",
  },
  {
    name: "Frosty Bites",
    logo: frostyLogo,
    background: frostyBack,
    description: "Delicias frías para un día caluroso.",
  },
  {
    name: "Sharpays Boutique",
    logo: sharpaysLogo,
    background: sharpaysBack,
    description: "Moda para peluditos con estilo.",
  },
  {
    name: "El paraíso de Dios",
    logo: paraisoLogo,
    background: paraisoBack,
    description: "Frutas benditas, 100% naturales.",
  },
  {
    name: "No los Atropelles",
    logo: "/atropelles.png",
    background: "/atropelles-bg.jpg",
    description: "Campaña vial con impacto visual.",
  },
];

export default function ScrollAnimation() {
  const containerRef = useRef();
  const horizontalRef = useRef();

  useEffect(() => {
    const sections = gsap.utils.toArray(".panel");

    gsap.to(horizontalRef.current, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => "+=" + containerRef.current.offsetWidth,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative">
      <div
        ref={horizontalRef}
        className="flex h-screen w-[500vw]"
      >
        {brands.map((brand, index) => (
          <section
            key={index}
            className="panel w-screen h-screen relative flex items-center justify-center text-white text-center p-8 bg-cover bg-center"
            style={{
              backgroundImage: `url(${brand.background})`,
              backgroundColor: "rgba(0,0,0,0.6)",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="z-10 flex flex-col items-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-48 h-48 object-contain mb-6"
              />
              <h1 className="text-5xl font-bold mb-4">{brand.name}</h1>
              <p className="text-lg max-w-xl">{brand.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
