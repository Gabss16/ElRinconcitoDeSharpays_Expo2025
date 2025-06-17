const CustomButton = ({text,action, background, color, width, height, border}) => {
    return (
        <>
            <button type="submit" className="custom-btn" style={{backgroundColor: background, color: color, width: width, height: height, border: border}} onClick={action}>{text}</button>
        </>
    );
};

export default CustomButton;