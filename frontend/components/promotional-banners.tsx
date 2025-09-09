import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const PromotionalBanners = () => {
  return (
     <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1532795986-dbef1643a596?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Promo 1"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold">Summer Sale</h3>
            <p className="mb-3">Up to 50% Off</p>
            <Link href="/products" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg">
              Shop Now
            </Link>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1620924049153-4d32fcbe88fe?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Promo 2"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold">New Arrivals</h3>
            <p className="mb-3">Check out the latest trends</p>
            <Link href="/products" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromotionalBanners