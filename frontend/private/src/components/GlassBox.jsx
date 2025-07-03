import "../styles/GlassBox.css"

const GlassBox = ({children}) => {
    return (
        <>
            <div className="glass-box position-absolute top-50 start-50 translate-middle">
                {children}
            </div>
        </>
    );
}

export default GlassBox;