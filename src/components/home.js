import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";
import Cardsdata from "./cartData";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/feature/cartSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [cartData, setCartData] = useState(Cardsdata);
  const dispatch = useDispatch();

  const onSend = (item)=>{
    dispatch(addToCart(item));
    toast.success("Items added in Your Cart")
  }

  return (
    <div>
      <section className="iteam_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400 }}>
          Restaurants in Ahmedabad Open now
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {cartData.map((item, i) => (
            <Card
              key={i}
              style={{ width: "22rem", border: "none" }}
              className="hove mb-4"
            >
              <Card.Img variant="top" src={item.imgdata} className="cd" />
              <div className="card_body">
                <div className="upper_data d-flex justify-content-between align-items-center">
                  <h4 className="mt-2">{item.dish}</h4>
                  <span>{item.rating}&nbsp;★</span>
                </div>
                <div className="lower_data d-flex justify-content-between">
                  <h5>{item.address}</h5>
                  <span>₹ {item.price}</span>
                </div>
                <div className="extra"></div>
                <div className="last_data d-flex justify-content-between align-items-center">
                  <img src={item.arrimg} className="limg" alt="" />
                  <Button
                    className="mt-2 mb-2"
                    variant="outline-light"
                    onClick={()=>onSend(item)}
                    style={{
                      width: "150px",
                      background: "#ff3054db",
                      border: "none",
                    }}
                  >
                    Add To Cart
                  </Button>
                  <img src={item.delimg} className="laimg" alt="" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
