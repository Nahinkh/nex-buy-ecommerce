'use client'
import CategorySection from "@/components/category-section";
import ExploreCategory from "@/components/explore-category";
import HeroBanner from "@/components/hero-banner";
import Navbar from "@/components/navbar";
import Newsletter from "@/components/newsletter";
import ProductCard from "@/components/product-card";
import ProductGrid from "@/components/product-grid";
import PromotionalBanners from "@/components/promotional-banners";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useProducts();
  console.log(data?.products);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <>
    <HeroBanner/>
    <CategorySection/>
    <ProductGrid/>
    <PromotionalBanners/>
    <Testimonials/>
    <Newsletter/>
      {/* <ExploreCategory />
      <div className="my-10 px-4 mt-32 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Today's Best Deals For you!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                gap-6 max-w-7xl mx-auto mt-10 place-items-center">
          {data?.products?.slice(0, 8).map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link href="/products">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
              View All Deals
            </Button>
          </Link>
        </div>
      </div> */}
    </>
  );
}
