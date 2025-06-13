const CustomButton = ({text,action, background, color, width, height}) => {
    return (
        <>
            <button type="submit" className="custom-btn" style={{backgroundColor: background, color: color, width: width, height: height}} onClick={action}>{text}</button>
        </>
    );
};

export default CustomButton;