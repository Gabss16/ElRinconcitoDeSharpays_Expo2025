const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Cargando imagen...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;