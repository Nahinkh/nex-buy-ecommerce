'use client'
import { useProfile } from '@/hooks/uaerProfiels';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import React, { useState } from 'react'

const CheckoutPage = () => {
    const { cart, total } = useCart();
    const user = useProfile()
    const checkoutMutation = useCheckout();
    const [form, setForm] = useState({
        address: '',
    })
    console.log(user?.data?.user?.email)

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // if (cart.length === 0) {
        //     alert("Your cart is empty!");
        //     return;
        // }
        checkoutMutation.mutate({ cartItems: cart, totalAmount: total, shippingAddress: form.address }, {
            onSuccess: (data) => {
                console.log("Order successful:", data);
            }
        });
        console.log('Submitting order with address:', form.address, cart, total);

    };
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Order Summary */}
            <div className="border p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="space-y-2">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between">
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-between font-bold border-t mt-3 pt-2">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Checkout Form */}
            <h1>Email: {user?.data?.user?.email}</h1>
            <h1>Name: {user?.data?.user?.name}</h1>
            <form>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Shipping Address</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                    Place Order
                </button>
            </form>
            {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        // value={form.email}
                        // onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block font-medium">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        // value={form.phone}
                        // onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block font-medium">Address</label>
                    <textarea
                        name="address"
                        // value={form.address}
                        // onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                    Place Order
                </button>
            </form> */}
        </div>
    )
}

export default CheckoutPage