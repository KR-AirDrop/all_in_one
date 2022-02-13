import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(
        "https://bc61c99d-22e2-4114-9055-41afc6ae387b.mock.pstmn.io/products"
      )
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <div id="header">
        <div id="header_area">
          <img src="images/icons/logo.png" alt="~" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="~" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product_list">
          {products.map(function (product, index) {
            return (
              <div className="product_card">
                <Link className="product_link" to={"/products/" + index}>
                  <div>
                    <img
                      className="product_img"
                      src={product.imageURL}
                      alt="~"
                    />
                  </div>
                  <div className="product_contents">
                    <span className="product_name">{product.name}</span>
                    <span className="product_price">{product.price}원</span>
                    <div className="product_seller">
                      <img
                        className="product_avatar"
                        src="images/icons/avatar.png"
                        alt="~"
                      />
                      <span>{product.seller}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer"></div>;
    </div>
  );
}

export default MainPage;
