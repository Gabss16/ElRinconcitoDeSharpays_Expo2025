import BannerPrincipal from "../components/bannerPrincipal.jsx";
import CircularGallery from "../components/reactBits/CircularGallery.jsx";
import GradientText from "../components/reactBits/GradientText.jsx";
import TextType from "../components/reactBits/TextType.jsx";
import ScrollFloat from "../components/reactBits/ScrollFloat.jsx";
import EmprendimientosCard from "../components/EmprendimientosCard.jsx";

const HomePublic = () => {
  return (
    <>
      <div className="main-container">
        <BannerPrincipal />
        <div className="d-flex justify-content-evenly align-items-center mt-5 mb-5">
          <div className="text-center">
            <p className="fw-bold m-0 fs-5">Pequeños detalles para grandes</p>
            <GradientText
              colors={["#FE3F8D,#ce6f96ff,#c05380ff,#ffabceff, #ac3365ff"]}
              animationSpeed={5}
              showBorder={false}
              className="fw-bold m-0"
              fontSize={"4em"}
            >
              Momentos
            </GradientText>
          </div>

          <div>
            <p className="fs-5" hidden>
              En el rinconcito de Sharpay encuentras regalos unicos: sublimados
              personalizados, <br />
              paletas artesanales, velas, suculentas y mas. Cada compra apoya
              donaciones <br />a perritos en situacion de calle
            </p>

            <TextType
              text={
                "En el rinconcito de Sharpay encuentras regalos unicos: sublimados personalizados,\npaletas artesanales, velas, suculentas y mas. Cada compra apoya donaciones\na perritos en situacion de calle."
              }
              typingSpeed={25}
              pauseDuration={900}
              showCursor={false}
              loop={false}
              cursorCharacter="🐾"
              className="fs-5"
            />
          </div>
        </div>

        <CircularGallery />

        <div className="text-center">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            color={"#FE3F8D"}
          >
            Nuestros emprendimientos
          </ScrollFloat>
        </div>
        <div className="d-flex justify-content-between p-5">
        <EmprendimientosCard/>
        </div>

      </div>
    </>
  );
};
export default HomePublic;
