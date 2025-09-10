'use client'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageHead from '@/components/page-head';

const CartPage = () => {
    const { cart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity,total } = useCart();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHead title="Your Cart" />
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                )}
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </Button>
              </div>

              {/* Remove */}
              <Button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Summary */}
          <div className="flex justify-between items-center pt-6">
            <h2 className="text-lg font-bold">Total:</h2>
            <p className="text-xl font-semibold">${total.toFixed(2)}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </Button>
            <Link href="/checkout">
            <Button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Proceed to Checkout 
            </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage