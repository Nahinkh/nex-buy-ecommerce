"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";

// Example static products (replace with API fetch)
// const products = [
//   { id: 1, name: "iPhone 15", price: 1200, createdAt: "2025-08-10", image: "/images/iphone.png" },
//   { id: 2, name: "Laptop Pro", price: 2200, createdAt: "2025-08-12", image: "/images/laptop.png" },
//   { id: 3, name: "Smart Watch", price: 300, createdAt: "2025-07-01", image: "/images/watch.png" },
//   { id: 4, name: "Headphones", price: 150, createdAt: "2025-09-01", image: "/images/headphones.png" },
// ];

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading, isError} = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;
  const products = data?.products;
 
  const pageSize = 8;

  console.log(data?.products);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });
    const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      {/* Header + Sort */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Products</h1>
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
