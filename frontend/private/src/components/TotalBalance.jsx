const TotalBalance = ({image, total}) => {
    return (
        <>
        <div className="total-balance d-flex">
            <div>
            <h3 className="fs-5">Saldo </h3>
            <h2 className="fw-bold">{total.toFixed(2)}</h2>
            </div>

            <img src={image} width={80} className="ms-5"/>
        </div>
        </>
    );
};

export default TotalBalance;