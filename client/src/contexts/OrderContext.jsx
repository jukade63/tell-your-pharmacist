import axios from "../config/axios";
import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const OrderContext = createContext();

function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [receiverAddress, setReceiverAddress] = useState([])
  const navigate = useNavigate();


  const getOrderDetail = async (path, orderId) => {
    const response = await axios.get(`/orderDetails/${orderId}`);
    setOrderDetail(response.data.orderDetail);
    navigate(`${path}/orders/${orderId}`);
  };

  const updatePaidOrder = (id) =>{
    return axios.patch(`/orders/paid/${id}`);
  }

  const updateDeliveryOrder = async (id) =>{
    await axios.patch(`/orders/deliver/${id}`);
    navigate('/pharmacy/orders')
  }
  const updateOrderCompleted = async (id) =>{
    await axios.patch(`/orders/completed/${id}`);
  }

  const createOrder = (order) => {
    return axios.post("/orders", order);
  };

  const getOrderById = (id)=>{
    return axios.get(`orders/${id}`)
  }
  const getOrders = async () => {
    const response = await axios.get("/orders");
    const orders = response.data.orders
    setOrders(orders);
  };

  const deleteItem = (id) => {
    const newOrderList = orderList.filter((el) => {
      console.log(el);
      return el.productId !== id;
    });
    console.log(newOrderList);
    setOrderList(newOrderList);
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        orderList,
        setOrderList,
        deleteItem,
        orders,
        setOrders,
        getOrders,
        getOrderDetail,
        setOrderDetail,
        orderDetail,
        getOrderById,
        updatePaidOrder,
        updateDeliveryOrder,
        updateOrderCompleted,
        receiverAddress,
        setReceiverAddress

     
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

const useOrder = () => {
  const context = useContext(OrderContext);
  return context;
};

export default OrderContextProvider;
export { OrderContext, useOrder };
