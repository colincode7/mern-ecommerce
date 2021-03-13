import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products";

// Owl Carousal
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productListAction";

// Components
import Loader from "../components/Loader";
import ErrMess from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

// Carousal Data
import { carousalData } from "../utils/carousalData";

// Styling
import "../styles/Screen/HomeScreen.css";

export default function Home({ location, API, isMobile }) {
  // option for card carousal
  const options = {
    loop: false,
    dots: false,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-2x fa-angle-left'></i>",
      "<i class='fa fa-2x fa-angle-right'></i>",
    ],
    responsive: {
      320: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  // option for hero section carousal
  const options2 = {
    loop: true,
    margin: 100,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    lazyLoad: true,
    smartSpeed: 1000,
    items: 1,
  };

  //   fetching datas of productList from redux state
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  // PAGINATION CALCULATIONS
  const [paginate, setPaginate] = useState({
    allProducts: [],
    currentPage: 1,
    allProductsPerPage: !isMobile ? 6 : 1,
  });

  useEffect(() => {
    setPaginate((prev) => ({
      ...prev,
      allProducts: products,
    }));

    window.scrollTo(0, 0);
  }, [loading, products]);

  const { allProducts, currentPage, allProductsPerPage } = paginate;

  // Logic for displaying current allProducts
  const indexOfLastProduct = currentPage * allProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - allProductsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPage = Math.ceil(allProducts.length / allProductsPerPage);
  // ENDS PAGINATION CALCULATIONS

  // SEARCH by query in route
  const [isQuerying, setIsQuerying] = useState(false);

  const query = new URLSearchParams(location.search);
  const keyword = query.get("name") || "";
  // const pageNumber = parseInt(query.get("pageNumber")) || "";

  useEffect(() => {
    if (keyword) {
      setIsQuerying(true);
    } else {
      setIsQuerying(false);
    }
    dispatch(listProducts(keyword, API));
  }, [dispatch, keyword, API]);

  // Scroll on Click to products category in carousel
  const electronicsRef = useRef(null); // To Electronics
  const homeRef = useRef(null); // To Home Appliances
  const mensRef = useRef(null); // To Mens Accessories
  const womensRef = useRef(null); // To Womens Accessories

  // function to scroll to desired position smoothly
  const executeScroll = (id) => {
    if (id === "#electronics") {
      electronicsRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (id === "#home_appliances") {
      homeRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (id === "#mens_accessories") {
      mensRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (id === "#womens_accessories") {
      womensRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Meta />
      {/*//   CAROUSAL   /// */}
      <OwlCarousel
        key={products.length}
        className="owl-carousel owl-theme"
        {...options2}
      >
        {carousalData.map((data, index) => (
          <Col key={index}>
            <div
              className={isMobile ? "carousal_phone" : "carousal"}
              style={
                isMobile
                  ? {
                      background: `url(${data.image_mobile})`,
                      backgroundPosition: "-30px",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      background: `url(${data.image_desktop})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }
              }
            >
              <h1
                className={
                  isMobile ? "carousal_heading_phone" : "carousal_heading"
                }
              >
                {data.heading}
              </h1>
              <h2
                className={isMobile ? "carousal_para_phone" : "carousal_para"}
              >
                {data.para}
              </h2>
              <button
                onClick={() => executeScroll(data.id)}
                className={
                  isMobile ? "carousal_button_phone" : "carousal_button"
                }
              >
                SHOP NOW
              </button>
            </div>
          </Col>
        ))}
      </OwlCarousel>

      {/* /////////////////    BUG: Render carusal before children ////////// */}
      {/*//////////////////    SOLUTION: ADD key to OwlCarousal  */}

      <div className={isMobile ? "products_section_phone" : "products_section"}>
        {/*// if nothing there to search then show all category division of products otherwise not //*/}
        {!isQuerying ? (
          <>
            {/* ELECTRONICS */}
            <h1
              ref={electronicsRef}
              className={
                isMobile
                  ? "category_heading_phone  pt-5 mt-4"
                  : " category_heading pt-5 mt-5"
              }
            >
              Electronics Accessories
            </h1>

            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrMess varient="#FC308B">{error}</ErrMess>
              ) : (
                products && (
                  <OwlCarousel
                    key={products.length}
                    className="owl-theme"
                    {...options}
                  >
                    {products
                      .filter((p) => p.category === "electronics")
                      .map((electronic, index) => (
                        <Col key={index}>
                          <Product product={electronic} />
                        </Col>
                      ))}
                  </OwlCarousel>
                )
              )}
            </Row>

            {/* HOME APPLIANCES */}
            <h1
              ref={homeRef}
              className={
                isMobile
                  ? "category_heading_phone  pt-5 mt-4"
                  : "category_heading pt-5 mt-5"
              }
            >
              Home Appliances
            </h1>

            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrMess varient="#FC308B">{error}</ErrMess>
              ) : (
                products && (
                  <OwlCarousel
                    key={products.length}
                    className="owl-theme"
                    {...options}
                  >
                    {products
                      .filter((p) => p.category === "home_appliances")
                      .map((home_appliance, index) => (
                        <Col key={index}>
                          <Product product={home_appliance} />
                        </Col>
                      ))}
                  </OwlCarousel>
                )
              )}
            </Row>

            {/* MENS'S ACCESSORIES */}
            <h1
              ref={mensRef}
              className={
                isMobile
                  ? "category_heading_phone  pt-5 mt-4"
                  : "category_heading pt-5 mt-5"
              }
            >
              Men's Accessories
            </h1>

            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrMess varient="#FC308B">{error}</ErrMess>
              ) : (
                products && (
                  <OwlCarousel
                    key={products.length}
                    className="owl-theme"
                    {...options}
                  >
                    {products
                      .filter((p) => p.category === "mens_accessories")
                      .map((mens_accessory, index) => (
                        <Col key={index}>
                          <Product product={mens_accessory} />
                        </Col>
                      ))}
                  </OwlCarousel>
                )
              )}
            </Row>

            {/* WOMEN'S ACCESSORIES */}
            <h1
              ref={womensRef}
              className={
                isMobile
                  ? "category_heading_phone  pt-5 mt-4"
                  : "category_heading pt-5 mt-5"
              }
            >
              Women's Accessories
            </h1>

            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrMess varient="#FC308B">{error}</ErrMess>
              ) : (
                products && (
                  <OwlCarousel
                    key={products.length}
                    className="owl-theme"
                    {...options}
                  >
                    {products
                      .filter((p) => p.category === "womens_accessories")
                      .map((womens_accessory, index) => (
                        <Col key={index}>
                          <Product product={womens_accessory} />
                        </Col>
                      ))}
                  </OwlCarousel>
                )
              )}
            </Row>
          </>
        ) : null}

        {/*// CAROUSAL ENDS //*/}

        {/* ALL PRODUCTS */}
        <h1
          className={
            isMobile
              ? "category_heading_phone  pt-5 mt-4"
              : "category_heading pt-5 mt-4"
          }
        >
          Latest Products
        </h1>

        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrMess varient="#FC308B">{error}</ErrMess>
          ) : (
            currentProducts.map((product, index) => (
              <Col md={4} lg={3} key={index}>
                <Product product={product} />
              </Col>
            ))
          )}

          {/*// PAGINATION COMPONENT //*/}
          <Paginate
            totalPage={totalPage}
            currentPage={currentPage}
            setPaginate={setPaginate}
            isMobile={isMobile}
          />
        </Row>
      </div>
    </>
  );
}
