// Importing CSS files for the slick-carousel library.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";

export default function SliderProducts() {
  var settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    className: "slidess",
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const langRedux = useSelector((state) => state.langSlice.lang);
  const dispatch = useDispatch();
  const productsShop = useSelector((state) => {
    return state.productsSlice.product;
  });
  const loading = useSelector((state) => {
    return state.productsSlice.loading;
  });
  useEffect(() => {
    dispatch(fetchProducts());
    console.log(productsShop, loading);
    document.querySelector(".slick-track ").style.transform =
      "translate3d(0, 0px, 0px)";
  }, [loading, productsShop === undefined]);
  return (
    <section className="slider container">
      <h2>{langRedux === "Ar" ? "المتجر" : "Our Shop"}</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {productsShop &&
            productsShop.map((p) => {
              return (
                <div className="slider-content" key={p.id}>
                  <img
                    height={"253px"}
                    width={"100%"}
                    src={p.image_url}
                    alt={p.product_name}
                  ></img>
                  <div className="card-content">
                    <div>
                      <p>
                        {langRedux === "Ar"
                          ? p.product_name_Ar
                          : p.product_name}
                      </p>
                      <p>${p.price}</p>
                    </div>
                    <button>{langRedux === "Ar" ? "عرض" : "view"}</button>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
}
