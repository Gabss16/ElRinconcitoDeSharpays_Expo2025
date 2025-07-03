import sharpaysLogoWhite from "../assets/sharpaysLogoWhite.png";

const LogoLogin = ({textStyle}) => {
    return (
        <>
        <div className="d-flex justify-content-center align-items-center mt-3">
            <img src={sharpaysLogoWhite} style={{width:'50px', height: '50px',marginLeft: '100px'}}/>
            <h1 className={textStyle}>El rinconcito de Sharpay</h1>
        </div>
        </>
    );
};

export default LogoLogin;