import React, { useEffect } from "react";
import "../styles/Sharpays.css"; 
import ShopMenu from "../components/SubMenu";
import bgImage from "../assets/shaypays.jpeg";
import CardProduct from "../components/shop/CardProduct";
import useUserDataProducts from "../../../frontend/private/src/components/products/hook/userDataProducts";

const ShopPage = () => {
  const { products, fetchData } = useUserDataProducts();
  const filteredProducts = products.filter((prod) => {
  const cat =
    typeof prod.categoryId === "string"
      ? prod.categoryId
      : typeof prod.categoryId === "object"
      ? prod.categoryId.$oid || prod.categoryId._id
      : null;
  return cat === "6855bf0c8bda3da90eca92c4";
});

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <h6 className="hero-subtitle">sharpays</h6>
        <h1 className="hero-title">BOUTIQUE</h1>
      </div>

      <div className="white-box">
        <ShopMenu />

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <CardProduct key={product._id} producto={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
