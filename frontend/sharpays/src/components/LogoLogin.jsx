import sharpaysLogoWhite from "../assets/sharpaysLogoWhite.png";

const LogoLogin = () => {
    return (
        <>
        <div className="d-flex w-50">
            <img src={sharpaysLogoWhite} style={{width:'60px', height: '60px'}}/>
            <h1 className="fs-4 text-light pt-1">El rinconcito de Sharpay</h1>
        </div>
        </>
    );
};

export default LogoLogin;