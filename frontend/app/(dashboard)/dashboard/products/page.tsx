"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string | { name: string };
  inStock: boolean;
  images: string[];
  attributes: Record<string, string>;
}

export default function ProductList() {
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/product/products");
      return res.data.products;
    },
  });

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  // Update product handler
  const handleUpdate = (id: string) => {
    // Redirect to update page or open modal
    window.location.href = `/product/update/${id}`;
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                {typeof product.category === "string"
                  ? product.category
                  : product.category?.name}
              </TableCell>
              <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Link href={`/dashboard/products/update/${product._id}`}>Update</Link>
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(product._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
