import sharpaysLogoWhite from "../assets/sharpaysLogoWhite.png";

const LogoLogin = (style) => {
    return (
        <>
        <div className="d-flex w-50">
            <img src={sharpaysLogoWhite} style={{width:'60px', height: '60px'}}/>
            <h1 className={style}>El rinconcito de Sharpay</h1>
        </div>
        </>
    );
};

export default LogoLogin;