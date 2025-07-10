const StoreCard = ({image, name, status}) => {
    return (
        <>
        <div className="storeCard d-flex justify-content-around align-items-center">
            <div className="fw-bold">
            <h3 className="fs-5">{name}</h3>
            <p className={status ? 'text-success' : 'text-danger'}>{status ? 'Activo' : 'Inactivo'}</p>
            </div>

            <img src={image} width='90px' height='90px'/>
        </div>
        </>
    );
};

export default StoreCard;