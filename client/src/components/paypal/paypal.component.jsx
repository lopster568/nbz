import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useSelector } from "react-redux";
const PayPal = () => {
    const amount = useSelector(state => state.cart.total)
    return (
        <div className='flex flex-col space-y-8' >
            <div className="bg-center bg-cover w-full min-h-[550px] flex justify-around items-center" >
                <div className='p-48 flex flex-col space-y-4' >
                    <PayPalScriptProvider options={{ "client-id": "AQ1nSsVBG_I2DpEW4L5e3fHCRRyNMHNPEb3P0uUdiJg6apHJOSKK3NTn-1Z9dGXKZoO9kacLIcCC_flE"}} >
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: "USD",
                                                value: amount,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    // const name = details.payer.name.given_name;
                                    alert(`Transaction Successful - Generating your download`);
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>

    );
}

export default PayPal;