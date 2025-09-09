"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/hooks/useCategory";
import { axiosInstance } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface Attribute {
  key: string;
  value: string;
}

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  description: string;
  inStock: boolean;
  attributes: Attribute[];
  newCategory?: string;
}

export default function UpdateProductPage() {
  const { _id } = useParams();
  const router = useRouter();

  const [images, setImages] = useState<(string | File | null)[]>([null, null, null, null, null]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    description: "",
    inStock: true,
    attributes: [],
    newCategory: "",
  });

  const { data } = useQuery({
    queryKey: ["product", _id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/product/${_id}`);
      return data;
    },
    enabled: !!_id,
  });

  const product = data?.product;
  const { data: categories } = useCategories();
  const categoriesList = categories?.categories || [];

  // Populate form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category?.name || "",
        newCategory: "",
        description: product.description,
        inStock: product.inStock,
        attributes: product.attributes || [],
      });

      const existingImages = product.images || [];
      setImages([...existingImages, ...Array(5 - existingImages.length).fill(null)]);
    }
  }, [product]);

  // Handle images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0] ?? null;
    setImages((prev) => {
      const updated = [...prev];
      updated[idx] = file;
      return updated;
    });
  };

  // Attributes handlers
  const addAttribute = () => setFormData(prev => ({
    ...prev,
    attributes: [...prev.attributes, { key: "", value: "" }]
  }));

  const updateAttrKey = (idx: number, key: string) => setFormData(prev => {
    const updated = [...prev.attributes];
    updated[idx].key = key;
    return { ...prev, attributes: updated };
  });

  const updateAttrValue = (idx: number, value: string) => setFormData(prev => {
    const updated = [...prev.attributes];
    updated[idx].value = value;
    return { ...prev, attributes: updated };
  });

  const removeAttribute = (idx: number) => setFormData(prev => {
    const updated = [...prev.attributes];
    updated.splice(idx, 1);
    return { ...prev, attributes: updated };
  });

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanedAttributes = formData.attributes.filter(attr => attr.key.trim() !== "");

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("newCategory", formData.newCategory ?? "");
      payload.append("description", formData.description);
      payload.append("inStock", formData.inStock ? "true" : "false");
      payload.append("attributes", JSON.stringify(cleanedAttributes));

      // Keep existing images
      const existingImages = images.filter(img => typeof img === "string") as string[];
      payload.append("keepExistingImages", JSON.stringify(existingImages));

      // Append new image files
      images.forEach(img => {
        if (img instanceof File) payload.append("images", img);
      });

      const res = await axiosInstance.put(`/product/update/${_id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Product updated successfully");
        router.push("/dashboard/products");
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <div>
          <Label>Product Images (up to 5)</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
            {images.map((img, idx) => (
              <label key={idx} className="w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-50">
                {typeof img === "string" ? (
                  <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover rounded-lg" />
                ) : img instanceof File ? (
                  <img src={URL.createObjectURL(img)} alt={`Product ${idx}`} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-sm text-gray-400">Upload</span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, idx)} />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <Label>Product Name</Label>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>

        {/* Price */}
        <div>
          <Label>Price ($)</Label>
          <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categoriesList.map((cat: any) => (
                <SelectItem key={cat._id} value={cat.name}>{cat.name}</SelectItem>
              ))}
              <SelectItem value="new-category">+ Add Category</SelectItem>
            </SelectContent>
          </Select>
          {formData.category === "new-category" && (
            <div className="mt-2">
              <Input placeholder="New Category" value={formData.newCategory} onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })} />
            </div>
          )}
        </div>

        {/* Attributes */}
        <div>
          <Label>Attributes</Label>
          <div className="space-y-2 mt-2">
            {formData.attributes.map((attr, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input placeholder="Key" className="w-1/3" value={attr.key} onChange={(e) => updateAttrKey(idx, e.target.value)} />
                <Input placeholder="Value" className="w-2/3" value={attr.value} onChange={(e) => updateAttrValue(idx, e.target.value)} />
                <Button type="button" variant="ghost" onClick={() => removeAttribute(idx)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="mt-2" onClick={addAttribute}>
            <Plus className="h-4 w-4 mr-2" /> Add Attribute
          </Button>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.inStock} onCheckedChange={(checked) => setFormData({ ...formData, inStock: Boolean(checked) })} />
          <span>In Stock</span>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">Update Product</Button>
      </form>
    </div>
  );
}

