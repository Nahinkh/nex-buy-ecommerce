'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
  const slides = [
  {
    id: 1,
    title: "Fresh Arrivals",
    subtitle: "Discover the latest trends in our collection.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Exclusive Deals",
    subtitle: "Get the best discounts on premium products.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600",
    cta: "Explore Deals",
  },
  {
    id: 3,
    title: "Best Quality",
    subtitle: "We bring you only the finest quality items.",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1600",
    cta: "Browse Collection",
  },
]
    const [current, setCurrent] = useState(0)

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }
    return (
        <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-b-2xl">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={index === current}
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-xl">
                            {slide.subtitle}
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
                            {slide.cta}
                        </button>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-green-600 hover:text-white text-gray-800 p-3 rounded-full shadow"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-green-600 hover:text-white text-gray-800 p-3 rounded-full shadow"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 flex gap-2 w-full justify-center">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition ${idx === current ? "bg-green-600" : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeroBanner