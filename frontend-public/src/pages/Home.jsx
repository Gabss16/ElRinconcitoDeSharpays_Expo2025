import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import BannerPrincipal from "../components/bannerPrincipal.jsx";
import CardProduct from "../components/shop/CardProduct.jsx";
import useProductsWithCategories from "../components/home/hooks/useProductsWithCategories.jsx";

const Home = () => {
  const { products, categories, loading, error } = useProductsWithCategories();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const categoryNames = categories.map((c) => c.category);

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
          <h3>Nuestras tiendas:</h3>
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
    </div>
  );
};

export default Home;
