import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../contexts/OrderContext";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useAuth } from "../../contexts/AuthContext";
import { STRIPE_KEY } from "../../config/env";
import ReviewModal from "./ReviewModal";
import OrderDetailItem from "./OrderDetailItem";

const KEY = STRIPE_KEY;

const getTotel = (total, order)=>{
  return order.deliveryFee ? total + +order.deliveryFee : total
}

function OrderDetail() {
  const {
    orderDetail,
    getOrderById,
    updatePaidOrder,
    updateDeliveryOrder,
    updateOrderCompleted,
  } = useOrder();
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  const { user } = useAuth();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const total = orderDetail.reduce((acc, curr) => {
    acc += curr.price * curr.amount;
    return acc
  }, 0);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const fetchOrder = async () => {
    const res = await getOrderById(orderId);
    setOrder(res.data.order);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await updatePaidOrder(orderId);
        await axios.post("/payments", {
          tokenId: stripeToken.id,
          amount: total,
        });

        navigate("/orders");
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  let renderedBtn;
  if (order.status === "PENDING" && order.customerId === user.id) {
    renderedBtn = (
      <StripeCheckout
        name="Tell your pharmacist"
        amount={(total * 100) / 37}
        token={onToken}
        stripeKey={KEY}
      >
        <Button variant="contained" fullWidth>
          Pay Now
        </Button>
      </StripeCheckout>
    );
  } else if (order.status === "PAID" && order.pharmacyId === user.id) {
    renderedBtn = (
      <Button
        variant="contained"
        fullWidth
        onClick={() => updateDeliveryOrder(orderId)}
      >
        Deliver
      </Button>
    );
  } else if (order.status === "DELIVERING" && order.customerId === user.id) {
    renderedBtn = (
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          updateOrderCompleted(orderId);
          setOpen(true);
        }}
      >
        Confirm order received
      </Button>
    );
  }

  return (
    <>
      <ReviewModal open={open} setOpen={setOpen} order={order} />
      <Paper sx={{ px: 1, py: 1.5 }}>
        <Stack my="auto">
          <Stack>
            <Typography variant="subtitle2">Order No. : {order.id?.slice(0, 20)}</Typography>
            <Typography sx={{ mt: 1 }} variant="subtitle2">
              Status :
              <Typography
                component="span"
                sx={{ background: "lightPink", p: "5px", ml: 1 }}
              >
                {order.status}
              </Typography>
            </Typography>
          </Stack>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="subtitle2">Items</Typography>
          <ol>
            {orderDetail?.map((el) => {
              return (
                <li>
                  <OrderDetailItem key={el.id} {...el} />
                </li>
              );
            })}
          </ol>
          {order.deliveryFee && (
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" sx={{ ml: 3 }} color="primary">
                Delivery fee
              </Typography>
              <Typography variant="body1" color="primary">
                {(+order.deliveryFee).toFixed(2)}
              </Typography>
            </Stack>
          )}
          <Divider sx={{ my: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            sx={{ background: "#eee", p: 1 }}
          >
            <Typography>Total</Typography>
            <Typography variant='subtitle3'>{getTotel(total, order).toFixed(2)}</Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />
          {renderedBtn}
        </Stack>
      </Paper>
    </>
  );
}

export default OrderDetail;
