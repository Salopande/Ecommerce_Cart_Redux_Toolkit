import React, { useEffect, useState } from "react";
import "./cartStyle.css";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { addToCart, emptyCartItem, removeSingleIteams, removeToCart } from "../redux/feature/cartSlice";

const CartDetails = () => {
  const carts = useSelector((state) => state.allcart.carts);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalquantity,setTotalQuantity] = useState(0);

  const dispatch = useDispatch();

  const handleSingleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  const handleSingleDecrement = (e) => {
     dispatch(removeSingleIteams(e))
  };

  const removeItem =(e)=>{
    dispatch(removeToCart(e))
    toast.success("Items removed from Your Cart")
  }

  const clearCart = ()=>{
     dispatch(emptyCartItem());
     toast.success("Your Cart Is Empty")
  }

  const total = ()=>{
   let totalPrice = 0;
   carts.map((ele)=>{
    totalPrice = ele.price * ele.qnty + totalPrice
   });
   setTotalPrice(totalPrice);
  }

  const countQuanty = ()=>{
    let totalquantity = 0;
    carts.map((ele)=>{
      totalquantity = ele.qnty + totalquantity
    });
    setTotalQuantity(totalquantity);
   }

  useEffect(()=>{
    total();
  },[total])

  useEffect(()=>{
    countQuanty();
  },[countQuanty])

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-5 mt-5 mb-5 cardsdetails">
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">Cart Calculation{carts.length >0 ? `(${carts.length})`:""}</h5>
              {carts.length > 0 ? (
                <button className="btn btn-danger mt-0 btn-sm" onClick={()=>clearCart()}>
                  <i className="fa fa-trash-alt mr-2"></i>
                  <span>Empty Cart</span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {carts.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your Cart Is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right">
                      <span id="amount" className="amount">
                        Total Amount
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((data, index) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <button className="prdct-delete" onClick={()=>removeItem(data.id)}>
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.imgdata} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="product-name">
                              <p>{data.dish}</p>
                            </div>
                          </td>
                          <td>{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button
                                className="prdct-qty-btn"
                                onClick={data.qnty < 1 ? () => removeItem(data.id): () => handleSingleDecrement(data)}
                                type="button"
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                              <input
                                className="qty-input-box"
                                value={data.qnty}
                                disabled
                                type="text"
                                name=""
                                id=""
                              />
                              <button
                                className="prdct-qty-btn"
                                onClick={() => handleSingleIncrement(data)}
                                type="button"
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">{data.price * data.qnty}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={3}>&nbsp;</th>
                    <th>
                      Itens In Cart <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{totalquantity}</span>
                    </th>
                    <th className="text-right">
                      Total Price <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{totalPrice}</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
