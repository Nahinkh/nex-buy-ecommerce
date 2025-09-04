'use client'

import { useSingleProduct } from '@/hooks/useSingleProduct';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';


const ProductDetailsPage = () => {
    const params = useParams();
    const id = params?.id as string;
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const { data: product, isLoading, error } = useSingleProduct(id);
    const productData = product?.product;

    const validImages = productData?.images?.filter((img: string) => !!img) || [];
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    useEffect(() => {
        if (validImages.length > 0) {
            setSelectedImage(validImages[0]);
        }
    }, [validImages]);

    if (!productData) return null;
    return productData && (
        <div className="max-w-6xl w-full px-6 mx-auto mt-10 space-y-6">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500">
                <Link href="/"><span className='text-green-500'>Home</span></Link> / <span>Products</span> /{" "}
                <span>{productData?.category?.name}</span> /{" "}
                <span className="text-green-500">{productData?.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16">
                {/* Images */}
                <div className="flex gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {validImages.map((img: string, i: number) => (
                            <Card
                                key={i}
                                onClick={() => setSelectedImage(img)}
                                className={`cursor-pointer w-24 h-24 border-gray-300 hover:shadow-lg transition ${selectedImage === img ? "ring-2 ring-indigo-500" : ""
                                    }`}
                            >
                                <CardContent className="p-0">
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${i + 1}`}
                                        width={100}
                                        height={100}
                                        className="object-cover"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Image */}
                    <Card className="w-96 h-96 border-gray-300 rounded overflow-hidden">
                        <CardContent className="p-0 relative w-full h-full">
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt={productData?.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h1 className="text-3xl font-medium">{productData.name}</h1>

                    <p className="text-gray-700">{productData.description}</p>

                    <p className="text-2xl font-semibold text-green-600">
                        ${productData?.price}
                    </p>

                    <p className="text-sm text-gray-500">
                        Category: {productData?.category?.name}
                    </p>

                    <p
                        className={`text-sm font-medium ${productData?.inStock ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {productData?.inStock ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* Attributes */}
                    {productData?.attributes && (
                        <div className="space-y-1">
                            {Object.entries(productData?.attributes).map(([key, value], idx) => (
                                <p key={idx} className="text-gray-600">
                                    <span className="font-medium">{key}:</span> {String(value)}
                                </p>
                            ))}
                        </div>
                    )}
                    {productData?.inStock && (
                        <div className="flex items-center gap-2 w-52">
                            <Button className='bg-green-500 text-white hover:bg-green-600 transition' onClick={decreaseQuantity}>-</Button>
                            <span className='font-medium p-4'>{quantity}</span>
                            <Button className='bg-green-500 text-white hover:bg-green-600 transition' onClick={increaseQuantity}>+</Button>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <Button
                        className="mt-6 w-full py-3.5 bg-green-500 text-white hover:bg-green-600 transition"
                        disabled={!productData?.inStock}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage