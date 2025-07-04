const TotalSales = () => {
    return (
        <>
            <div className="d-flex" style={{
                borderRadius: 25,
                boxShadow: '0px 6px 0px 2px rgba(0, 0, 0, 0.14)',
                width:'500px',
                margin: 10,
                padding: 18
            }}>
                <div className="d-flex flex-column p-4 me-5">
                <p>Total de pedidos: <span className="fw-bold">00</span></p>
                <select name="month" id="month" className="border-0 border-bottom">
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                </select>
                <button className="custom-btn bg-black text-light p-3 mt-4">Descargar PDF</button>
                </div>

                <div className="d-flex flex-column p-4 ms-5">
                    <p className="fw-bold text-secondary">Ganancia total:</p>
                    <h2 className="fw-bold">$00.00</h2>
                </div>
            </div>
        </>
    );
};

export default TotalSales;