import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

import "../styles/components/Products.css";

export default function Products({ product, path }) {
  return (
    <>
      <Card className="card my-3 rounded">
        <Link to={`products/${path}/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
        <Card.Body>
          <Link to={`products/${path}/${product._id}`}>
            <Card.Title
              as="div"
              style={{ fontSize: "16px", textDecoration: "none" }}
            >
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} rating`}
              />

              {/* {product.rating} from {product.numReviews} rating */}
            </div>
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
