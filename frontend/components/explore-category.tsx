import { useCategories } from '@/hooks/useCategory';
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';


const ExploreCategory = () => {
    const {data: categories} = useCategories();
    // console.log(categories?.categories)
  return (
  <div className="w-full max-w-7xl mx-auto px-6 mt-32">
      <h1 className="text-3xl font-bold my-8">
        Explore by Category
      </h1>

      <Carousel className="w-full">
        <CarouselContent>
          {categories?.categories.map((category: any) => (
            <CarouselItem
              key={category._id}
              className="basis-1/3 sm:basis-1/4 md:basis-1/8"
            >
             <Link href={`/products/${category.slug}`}>
              <div className="flex flex-col items-center gap-2 p-4 bg-green-500 hover:bg-green-600 rounded-2xl shadow-md hover:shadow-lg transition text-white">
                <h2 className="text-sm font-medium p-3 rounded-2xl text-nowrap">
                  {category.name}
                </h2>
              </div>
             </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ExploreCategory