import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react";
import { useSelector } from "react-redux";
import { checkout } from "../../api/order";
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart/cart.actions";

const PayPal = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const uid = useSelector(state => state.user.currentUser._id)

    const handleCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: cart.total,
                    },
                },
            ],
        });
    }

    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            checkout({
                payment: details,
                user: uid,
                items: cart.items
            })
                .then(resp => {
                    navigate("/orders")
                    dispatch(emptyCart())
                    console.log(resp.data)
                })
        });
    }

    return (
        <div className='flex flex-col space-y-8' >
            <div className="bg-center bg-cover w-full min-h-[550px] flex justify-around items-center" >
                <div className='p-36 flex flex-col space-y-4' >
                    <PayPalScriptProvider options={{ "client-id": "AfXJZW48QdeNh1K1OXLo4uQby8nykdREtbKPTIZhlt9anXusoTxGSbRBlqyHuPMTw0yKlZPozhSBT1Ti" }} >
                        <PayPalButtons
                            createOrder={handleCreateOrder}
                            onApprove={handleApprove}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>

    );
}

export default PayPal;