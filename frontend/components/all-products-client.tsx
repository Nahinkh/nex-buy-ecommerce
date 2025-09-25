"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ProductsPageProps {
  searchParams?: {
    category?: string;
    search?: string;
  };
}

export default function ProductsClient({searchParams}: ProductsPageProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCategory(searchParams?.category || null);
    setSearchQuery(searchParams?.search?.toLowerCase() || "");
  }, [searchParams]);

  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  let filteredProducts = data?.products || [];

  if (category) {
    filteredProducts = filteredProducts.filter((p: any) => p.category?.slug === category);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p: any) =>
      p.name.toLowerCase().includes(searchQuery)
    );
  }

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
      {filteredProducts.length === 0 ? (
        <h2 className="text-2xl font-bold tracking-tight">No products found</h2>
      ) : (
        <>
          {/* Header + Sort */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {category ? category.toUpperCase() : "All Products"}
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
