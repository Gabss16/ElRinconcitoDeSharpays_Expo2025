const PendingOrders = () => {
    return (
        <>
        <div className="d-flex" style={{
                borderRadius: 25,
                boxShadow: '0px 6px 0px 2px rgba(0, 0, 0, 0.14)',
                width:'500px',
                margin: 10,
                padding: '11px'
            }}>
                <div className="d-flex flex-column align-items-center pb-2">
                <h3>Nombre del negocio</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73broZuXihBx0tLGP7_gE5FvPHdCoK8OMSg&s" width={180} />
                </div>

                <div className="d-flex flex-column ms-5">
                <p>Cliente: <span className="fw-bold">00</span></p>
                <p>Dirección: <span className="fw-bold">00</span></p>
                <p>Estado: <span className="fw-bold text-warning">Pendiente</span></p>
                </div>
            </div>
        </>
    );
}; 

export default PendingOrders;