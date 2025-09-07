'use client'
import React, { useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';

const CardPaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const stripePromise = loadStripe('pk_test_51QwgP5CSeae50hkDZAN3HaeiXf39PqnZB7dFUL4kSBE4ha2ZYNkUezONbcsiQsxcLc9dIgQzZQJiUCf1RJVd4taT00edUNXaw6');
  console.log(stripePromise);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("💳 Payment submitted (UI only, no backend yet)");
  };
  return (
     <div className="max-w-md mx-auto mt-12 p-6 border rounded-2xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Card Payment</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Cardholder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Expiry & CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  )
}

export default CardPaymentPage