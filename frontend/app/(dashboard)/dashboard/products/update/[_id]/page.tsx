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
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  description: string;
  inStock: boolean;
  attributes: Record<string, string>;
  newCategory?: string;
}

export default function UpdateProductPage() {
  const { _id } = useParams();
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    description: "",
    inStock: true,
    attributes: {},
    newCategory: "",
  });
  // const [categories] = useState(["Electronics", "Clothing", "Books"]);
  console.log(_id)
  const { data } = useQuery({
    queryKey: ['product', _id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/product/${_id}`);
      return data;
    },
    enabled: !!_id, // Only fetch if ID exists
  });
  const product = data?.product;

  const { data: categories } = useCategories();
  const categoriesList = categories?.categories || [];



  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category?.name,
        newCategory: "",
        description: product.description,
        inStock: product.inStock,
        attributes: product.attributes || {},
      });

      const existingImages = product.images || [];
      setImages([
        ...existingImages,
        ...Array(5 - existingImages.length).fill(null)
      ]);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0] ?? null;
    setImages((imgs) => {
      const updated = [...imgs];
      updated[idx] = file;
      return updated;
    });
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        ["" + Date.now()]: ""
      },
    }));
  };

  const updateAttrKey = (oldKey: string, newKey: string) => {
    setFormData((prev) => {
      const updated = { ...prev.attributes };
      const value = updated[oldKey];
      delete updated[oldKey];
      if (newKey) updated[newKey] = value;
      return { ...prev, attributes: updated };
    });
  };

  const updateAttrValue = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };

  const removeAttribute = (key: string) => {
    setFormData((prev) => {
      const updated = { ...prev.attributes };
      delete updated[key];
      return { ...prev, attributes: updated };
    });
  };
  // Handle form submit
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remove blank keys
    const cleanedAttributes = Object.fromEntries(
      Object.entries(formData.attributes).filter(([k]) => k.trim() !== "")
    );

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("newCategory", formData.newCategory ?? "");
    payload.append("description", formData.description);
    payload.append("inStock", String(formData.inStock));
    payload.append("attributes", JSON.stringify(cleanedAttributes));

    images.forEach((img) => {
      if (img instanceof File) payload.append("images", img);
    });
      console.log(formData)
    // console.log(payload);
    const res = await axiosInstance.put(`/product/update/${_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    // console.log(res.data);
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
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, idx)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <Label>Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
          />
        </div>

        {/* Price */}
        <div>
          <Label>Price ($)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(val) => setFormData({ ...formData, category: val })}
          >
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
                {categoriesList.map((cat: { _id: string; name: string }) => (
                <SelectItem key={cat._id} value={cat.name}>
                  {cat.name}
                </SelectItem>
                ))}
              <SelectItem value="new-category">+ Add Category</SelectItem>
            </SelectContent>
          </Select>
          {formData.category === "new-category" && (
            <div className="mt-2">
              <Input
                placeholder="New Category"
                value={formData.newCategory}
                onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })}
              />
            </div>
          )}
        </div>

        {/* Attributes */}
        <div>
          <Label>Attributes</Label>
          <div className="space-y-2 mt-2">
            {Object.entries(formData.attributes).map(([key, val], idx) => (
              <div key={`${key}-${idx}`} className="flex gap-2 items-center">
                <Input
                  placeholder="Key"
                  value={key}
                  className="w-1/3"
                  onChange={(e) => updateAttrKey(key, e.target.value)}
                />
                <Input
                  placeholder="Value"
                  value={val}
                  className="w-2/3"
                  onChange={(e) => updateAttrValue(key, e.target.value)}
                />
                <Button type="button" variant="ghost" onClick={() => removeAttribute(key)}>
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
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={formData.inStock}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, inStock: Boolean(checked) })
            }
          />
          <span>In Stock</span>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">Update Product</Button>
      </form>
    </div>
  );
}
