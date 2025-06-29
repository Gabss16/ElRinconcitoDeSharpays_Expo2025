import LogoLogin from "./LogoLogin";

const Footer = () => {
    return (
        <>
            <div className="footer p-4">
                    <LogoLogin textStyle={"text-white fw-bold fs-5 w-50 text-start p-0 m-0"}/>    

                    <div className="d-flex justify-content-center fs-4 m-2">
                        <button><a href="#"><i className="fa-brands fa-instagram"></i></a></button>
                        <button><a href="#"><i className="fa-brands fa-facebook"></i></a></button>
                        <button><a href="#"><i className="fa-brands fa-tiktok"></i></a></button>
                    </div>
                    <div><a href="#">Política de privacidad</a><span> | </span><a href="#">Términos y condiciones</a></div>
            </div>
        </>
    );
};

export default Footer