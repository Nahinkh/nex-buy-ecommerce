'use client'
import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { useCart } from '@/hooks/useCart'

type Product = {
    _id: string;
    images: string[];
    name: string;
    rating: number;
    reviews: number | string;
    price: number;
    currency: string;
};

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const {addToCart} =useCart()
    console.log(product);
    return (
        
           <Card key={product._id} className="hover:shadow-lg transition h-[400px]">
            <Link href={`/product/${product._id}`}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
            </CardContent>
            </Link>
            <CardFooter>
              <Button
               className="mt-3 w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                onClick={() => addToCart(product as any)}
              >
                
                Add to Cart
              </Button>
            </CardFooter>
            
            
          </Card>

    )
}

export default ProductCard