import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PAYPAL_CLIENT_ID, STRIPE_KEY } from '../../Constants';

const stripePromise = loadStripe(STRIPE_KEY);

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number; // Amount in USD
    onSuccess: (paymentId: string) => void; // Callback on successful payment
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onSuccess }) => {
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('paypal');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Make a Payment</h2>

                <div className="flex justify-around mb-4">
                    <button
                        className={`px-4 py-2 rounded ${paymentMethod === 'paypal'
                            ? 'bg-yellow-600 text-black'
                            : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        onClick={() => setPaymentMethod('paypal')}
                    >
                        PayPal
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${paymentMethod === 'stripe'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        onClick={() => setPaymentMethod('stripe')}
                    >
                        Stripe/Visa/Mastercard/Amex
                    </button>
                </div>

                {paymentMethod === 'paypal' ? (
                    <PayPalSection amount={amount} onSuccess={onSuccess} />
                ) : (
                    <Elements stripe={stripePromise}>
                        <StripeSection amount={amount} onSuccess={onSuccess} />
                    </Elements>
                )}

                <button
                    className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

const PayPalSection: React.FC<{ amount: number; onSuccess: (paymentId: string) => void }> = ({
    amount,
    onSuccess,
}) => {
    return (
        <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                createOrder={(data, actions) =>
                    actions.order.create({
                        intent: 'CAPTURE', // Specify the intent for the payment
                        purchase_units: [
                            {
                                amount: {
                                    value: amount.toFixed(2),
                                    currency_code: 'USD',
                                },
                            },
                        ],
                    })
                }
                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    if (order && order.id) {
                        onSuccess(order.id);
                    }
                }}
                onError={(err) => {
                    console.error('PayPal Payment Error:', err);
                }}
                style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                }}
            />
        </PayPalScriptProvider>
    );
};

const StripeSection: React.FC<{
    amount: number;
    onSuccess: (paymentId: string) => void;
}> = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            'your-client-secret-here',
            {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            }
        );

        if (error) {
            console.error('Stripe Payment Error:', error);
        } else if (paymentIntent) {
            onSuccess(paymentIntent.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border border-gray-600 rounded bg-gray-900">
                <CardElement className="p-2 bg-gray-800 text-white rounded" />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!stripe}
            >
                Pay ${amount.toFixed(2)}
            </button>
        </form>
    );
};

export default PaymentModal;
