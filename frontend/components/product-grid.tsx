'use client'
import React from 'react'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from './product-card'

const ProductGrid = () => {
const { data: products } = useProducts()
const productsData = products?.products || []
  return (
   <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productsData.slice(0, 4).map(((product: any) => (
          <ProductCard key={product._id} product={product} />
        )))}
      </div>
    </section>
  )
}

export default ProductGrid