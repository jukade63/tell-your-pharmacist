import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useOrder } from "../../contexts/OrderContext";
import OrderCard from "./OrderCard";

function Orders({path}) {
  const { getOrders, orders } = useOrder();
  const {user} = useAuth()

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} user={user} path={path}/>;
      })}
    </>
  );
}

export default Orders;
