'use client'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
    return (
        <Link href={`/product/${product._id}`}>
            <Card className="w-72 h-96 rounded-2xl shadow-md hover:shadow-lg transition relative flex flex-col">
                <CardContent className="p-4 flex flex-col flex-1">
                    {/* Wishlist Icon */}
                    <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
                        <Heart className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Product Image */}
                    <div className="flex items-center justify-center h-40">
                        {product?.images?.[0] && (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={150}
                                height={150}
                                className="object-contain max-h-full"
                            />
                        )}
                    </div>

                    {/* Product Title */}
                    <h2 className="mt-3 text-sm font-medium text-gray-800 line-clamp-2">
                        {product?.name}
                    </h2>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400">★★★★☆</span>
                        <span className="text-xs text-gray-500">(1.2k)</span>
                    </div>

                    {/* Spacer pushes price to bottom */}
                    <div className="flex-grow"></div>

                    {/* Price */}
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                        <span className="text-lg text-gray-500">$</span> {product?.price}
                    </p>
                </CardContent>
            </Card>
        </Link>

    )
}

export default ProductCard