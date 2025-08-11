import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import BannerPrincipal from "../components/bannerPrincipal.jsx";
import CardProduct from "../components/shop/CardProduct.jsx";
import useProductsWithCategories from "../components/home/hooks/useProductsWithCategories.jsx";

// Importa el hook para los anuncios/eventos
import useDataAdvertisement from "../../../frontend/private/src/components/events/hook/useDataAdvertisement.jsx"; // Ajusta ruta según corresponda

// Importa CardSwap y Card
import CardSwap, { Card } from "../components/reactBits/CardSwap.jsx"; 

const Home = () => {
  const { products, categories, loading, error } = useProductsWithCategories();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const categoryNames = categories.map((c) => c.category);

  // Obtener anuncios usando el hook
  const {
    advertisements,
    loading: loadingAds,
    error: errorAds,
    refreshAdvertisements,
  } = useDataAdvertisement();

  // Filtrar productos según categoría seleccionada
  const filteredProducts = products.filter((product) => {
    if (activeCategory === "Todos") return true;
    return product.categoryId?.category === activeCategory;
  });

  // Mostrar máximo 1 producto por categoría (hasta 3 total)
  useEffect(() => {
    if (activeCategory === "Todos") {
      const selected = [];
      const usedCategories = new Set();

      for (let product of products) {
        const cat = product.categoryId?.category;
        if (cat && !usedCategories.has(cat)) {
          selected.push(product);
          usedCategories.add(cat);
        }
        if (selected.length === 3) break;
      }

      setDisplayedProducts(selected);
    } else {
      const filtered = products.filter(
        (p) => p.categoryId?.category === activeCategory
      );
      setDisplayedProducts(filtered);
    }
  }, [products, activeCategory]);

  const getCategoryCount = (categoryName) => {
    return products.filter((p) => p.categoryId?.category === categoryName).length;
  };

  // Filtrar sólo los eventos activos
  // Supondré que en cada anuncio hay un campo `status` o similar que indica si está activo (ejemplo: status === "active")
  const activeEvents = advertisements.filter(ad => ad.status === "Activo");

  return (
    <div className="main-container-Inicio">
      <BannerPrincipal />

      <div className="container-header-inicio">
        <p>
          ¡Nuevas ideas, mismo corazón!{" "}
          <span>Descubre lo más reciente y vendido de nuestra creatividad."</span>
        </p>
      </div>

      <div className="products-section">
        <div className="category-filters">
          <h3>Nuestras Tiendas:</h3>
          <div className="filter-buttons">
            {categoryNames.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span className="category-count">{getCategoryCount(category)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="products-container">
          {loading && <div className="loading">Cargando productos...</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <>
              <div className="products-grid-home">
                {displayedProducts.map((product) => (
                  <CardProduct key={product._id} producto={product} />
                ))}
              </div>

              {displayedProducts.length === 0 && (
                <div className="no-products">
                  <p>No hay productos disponibles en esta categoría</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Después de la sección de productos y antes de la de eventos */}

<div style={{
    flex: 9,
    maxWidth: "700px",
    textAlign: "Left",
    marginLeft : "80px"
  }}>
    <h2 style={{
      fontWeight: 600,
      fontSize: "1.3rem",
      lineHeight: 1.1,
      marginBottom: "1rem",
      color: "#00000",
      letterSpacing: "0.05em",
      userSelect: "none",
    }}>
      Nuestros próximos eventos
    </h2>
    </div>
  
<hr style={{
  margin: "1rem auto",
  width: "90%",
  border: "none",
  borderTop: "2px solid #fe3f8d",
  opacity: 0.3,
}} />

{/* Aquí empieza la sección eventos */}



      <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1rem",
  marginTop: "8rem",
  padding: "0 1rem",
  maxWidth: "1200px",
  marginLeft: "auto",
  marginRight: "auto",
  color: "#333",
  fontFamily: "'Roboto', sans-serif"
}}>
  {/* Texto centrado vertical y horizontalmente */}
  <div style={{
    flex: 9,
    maxWidth: "500px",
    textAlign: "Left",
    paddingTop: ""
  }}>
    <h2 style={{
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.1,
      marginBottom: "1rem",
      color: "#fe3f8d",
      letterSpacing: "0.05em",
      userSelect: "none",
    }}>
      Aquí en El Rinconcito de Sharpay nos apasiona crear momentos especiales.
    </h2>
    <p style={{
      fontWeight: 300,
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#555",
      maxWidth: "320px",
      margin: "0 ",
      userSelect: "none",
    }}>
      Estos eventos están diseñados para recaudar fondos y apoyar iniciativas que hacen la diferencia en nuestra comunidad. Te invitamos a ser parte y compartir la magia con nosotros.
    </p>
  </div>

  {/* Carrusel */}
  <div style={{
    flex: 2,
    height: "400px",
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "12px",
    top: "-20px",    // sube 20px
    left: "-80px"     // mueve a la derecha 10px
    
  }}>
    {loadingAds && <p>Cargando eventos...</p>}
    {errorAds && <p>Error cargando eventos: {errorAds}</p>}
    {!loadingAds && activeEvents.length > 0 && (
      <CardSwap
        cardDistance={60}
        verticalDistance={70}
        delay={5000}
        pauseOnHover={false}
      >
        {activeEvents.map((event) => (
          <Card key={event._id} style={{ padding: "20px" }}>
            <h3 style={{ color: "#fe3f8d", fontWeight: 500 }}>{event.tittle || "Evento sin título"}</h3>
            <p>{event.description || "Sin descripción"}</p>
            {event.image && (
              <img
                src={event.image}
                alt={event.tittle}
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  marginTop: "10px",
                  borderRadius: "8px",
                  userSelect: "none",
                }}
              />
            )}
          </Card>
        ))}
      </CardSwap>
    )}
    {!loadingAds && activeEvents.length === 0 && <p>No hay eventos activos actualmente.</p>}
  </div>
</div>

</div>

  );
};

export default Home;
