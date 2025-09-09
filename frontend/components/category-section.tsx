import React from 'react'
import { Card, CardContent } from './ui/card'
import { Home, Shirt, ShoppingBag, Smartphone, Watch } from 'lucide-react'
import Link from 'next/link'
import { useCategories } from '@/hooks/useCategory'

const CategorySection = () => {
   const { data, isLoading, isError } = useCategories()
  const categories = data?.categories || []
  return (
   <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat: { _id: string; name: string }) => (
          <Link
            key={cat._id}
            href={`/products?category=${cat.name.toLocaleLowerCase()}`}
            className="border border-gray-200 rounded-lg p-4 text-center text-gray-800 font-medium hover:bg-green-600 hover:text-white transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategorySection