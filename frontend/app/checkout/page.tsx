'use client'
import PageHead from '@/components/page-head';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/uaerProfiels';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const CheckoutPage = () => {
    const { cart, total, clearCart } = useCart();
    const router = useRouter();
    const { data: user } = useProfile();
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
    const { mutate: checkoutMutation, isPending } = useCheckout();
    const [form, setForm] = useState({
        address: '',
        phone: ''
    })
    const [cardForm, setCardForm] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    });
    console.log(user?.user?.email);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Card input formatters
    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'cardNumber') {
            // Format as XXXX XXXX XXXX XXXX
            formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
        } else if (name === 'cardExpiry') {
            // Format as MM/YY
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
            if (formattedValue.length >= 3) {
                formattedValue = formattedValue.replace(/^(\d{2})(\d{1,2})$/, '$1/$2');
            }
        } else if (name === 'cardCvc') {
            // Format as 3 or 4 digits
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }
        setCardForm({ ...cardForm, [name]: formattedValue });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        console.log(paymentMethod)
        let orderData = {
            cartItems: cart,
            totalAmount: total,
            shippingAddress: form.address,
            paymentMethod: paymentMethod,
            phone: form.phone,
        }
        if (paymentMethod === 'card') {
            orderData={...orderData,paymentMethod:'card'}
            checkoutMutation(orderData, {
            onSuccess: (data) => {
                console.log("Order successful:", data);
                toast.success(data.message || "Order placed successfully!");
            }
        });

        }
        checkoutMutation(orderData, {
            onSuccess: (data) => {
                console.log("Order successful:", data);
                toast.success(data.message || "Order placed successfully!");
            }
        });
        clearCart();
        setForm({ address: '', phone: '' });
        router.push('/');
    };
    return (
        <div className="max-w-2xl mx-auto p-6">
            <PageHead title="Checkout" />
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Info (read-only) */}
                {user ? (
                    <div className="space-y-2">
                        <div>
                            <label className="block font-medium">Name</label>
                            <input
                                type="text"
                                value={user?.user?.name}
                                disabled
                                className="w-full p-2 border rounded-lg bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                value={user?.user?.email}
                                disabled
                                className="w-full p-2 border rounded-lg bg-gray-100"
                            />
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">⚠️ Please log in to continue</p>
                )}

                {/* Address */}
                <div>
                    <label className="block font-medium">Shipping Address</label>
                    <input
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        name="address"
                        placeholder="Enter your shipping address"
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block font-medium">Phone Number</label>
                    <input
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        name="phone"
                        placeholder="+880 1XXX-XXXXXX"
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                {/* Card or Payment Method */}
                <div>
                    <label className="block font-medium">Payment Method</label>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                            />
                            Card
                        </label>
                    </div>
                </div>
                {
                    paymentMethod === 'card' && (
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h2 className="text-lg font-semibold mb-3">Card Payment Selected</h2>
                            <Input
                                type="text"
                                name="cardNumber"
                                value={cardForm.cardNumber}
                                onChange={handleCardInputChange}
                                placeholder="4242 4242 4242 4242"
                                required
                                className="mb-2"
                                maxLength={19}
                            />
                            <Input
                                type="text"
                                name="cardExpiry"
                                value={cardForm.cardExpiry}
                                onChange={handleCardInputChange}
                                placeholder="MM/YY"
                                required
                                className="mb-2"
                                maxLength={5}
                            />
                            <Input
                                type="text"
                                name="cardCvc"
                                value={cardForm.cardCvc}
                                onChange={handleCardInputChange}
                                placeholder="CVC/CVV-1234"
                                required
                                className="mb-2"
                                maxLength={4}
                            />
                        </div>
                    )
                }

                {/* Order Summary */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold border-t mt-3 pt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!user}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {isPending ? "Placing Order..." : "Place Order"}
                </button>
            </form>
        </div>
    )
}

export default CheckoutPage