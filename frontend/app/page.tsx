'use client';
import CategorySection from "@/components/category-section";
import HeroBanner from "@/components/hero-banner";
import Newsletter from "@/components/newsletter";
import PageHead from "@/components/page-head";
import ProductGrid from "@/components/product-grid";
import PromotionalBanners from "@/components/promotional-banners";
import Testimonials from "@/components/testimonials";

export default function Home() { 
  return (
    <main>
      <PageHead title="Home" />
      <HeroBanner/>
      <CategorySection/>
      <ProductGrid/>
      <PromotionalBanners/>
      <Testimonials/>
    <Newsletter/>
    </main>
  );
}
