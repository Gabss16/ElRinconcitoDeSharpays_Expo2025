const LinkText = ({text, action}) => {
    return (
        <>
        <p><a href={action} className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{text}</a></p>
        </>
    );
};

export default LinkText;