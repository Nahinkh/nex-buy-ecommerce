"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductsPage() {
 const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const category = searchParams.get('category'); // get category from URL

  const { data, isLoading, isError } = useProducts(); // fetch all products
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const allProducts = data?.products || [];
  console.log(allProducts);
  // Filter by category if present
  const filteredProducts = category
    ? allProducts.filter((p:any) => p.category?.slug === category)
    : allProducts;
    console.log(filteredProducts
    )

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const pageSize = 8;
  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
     <div className="max-w-7xl mx-auto px-6 mt-10">
      {/* Header + Sort */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {category ? category.toLocaleUpperCase() : "All Products"}
        </h1>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8 mb-8">
        <Button
          variant="outline"
          className="border border-green-300 text-green-600 hover:bg-green-600 hover:text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          className="border border-green-300 text-green-600 hover:bg-green-600 hover:text-white"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
