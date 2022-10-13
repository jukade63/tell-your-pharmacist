import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useOrder } from "../../contexts/OrderContext";
import OrderCard from "./OrderCard";

function Orders({path}) {
  const { getOrders, setOrders, orders } = useOrder();
  const {user} = useAuth()

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} user={user} path={path}/>;
      })}
    </div>
  );
}

export default Orders;
