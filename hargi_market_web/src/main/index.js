import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get("http://localhost:8080/products")
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
      <div id="banner">
        <img src="/images/banners/hargi_banner.png" alt="~" />
      </div>
      <h1>판매중인 상품들</h1>
      <div id="product_list">
        {products.map(function (product, index) {
          return (
            <div className="product_card" key={index}>
              <Link className="product_link" to={`/products/${product.id}`}>
                <div>
                  <img className="product_img" src={product.imageUrl} alt="~" />
                </div>
                <div className="product_contents">
                  <span className="product_name">{product.name}</span>
                  <span className="product_price">{product.price}원</span>
                  <div className="product_footer">
                    <div className="product_seller">
                      <img
                        className="product_avatar"
                        src="images/icons/avatar.png"
                        alt="~"
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product_date">
                      {dayjs(product.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
