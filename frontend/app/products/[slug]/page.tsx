'use client'
import ProductCard from '@/components/product-card'
import { useProducts } from '@/hooks/useProducts'
import { useParams } from 'next/navigation'
import React from 'react'

const CategoryPage = () => {
    const params = useParams()
    const{data:products,isLoading,isError} = useProducts();
    const productsList = products?.products;
    const filteredProducts = productsList?.filter((product:any) => product?.category?.slug === params?.slug)
  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {(Array.isArray(params?.slug) ? params.slug[0] : params?.slug)?.toUpperCase()}
      </h1>

      {filteredProducts?.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((product:any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage