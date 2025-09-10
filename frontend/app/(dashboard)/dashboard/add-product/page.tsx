"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { axiosInstance } from "@/lib/axios";
import PageHead from "@/components/page-head";

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
  attributes: Attribute[];   // ✅ array now
  newCategory?: string;
}

export default function AddProductPage() {
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    description: "",
    inStock: true,
    attributes: [],
    newCategory: "",
  });
  const [categories] = useState(["Electronics", "Clothing", "Books"]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] || null;
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  // Add a new empty attribute
  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { key: "", value: "" }],
    });
  };

  // Remove attribute by key
  const removeAttribute = (index: number) => {
    const updated = [...formData.attributes];
    updated.splice(index, 1);
    setFormData({ ...formData, attributes: updated });
  };

  // Update either key or value
  const updateAttributeKey = (index: number, newKey: string) => {
    const updated = [...formData.attributes];
    updated[index].key = newKey;
    setFormData({ ...formData, attributes: updated });
  };

  const updateAttributeValue = (index: number, newValue: string) => {
    const updated = [...formData.attributes];
    updated[index].value = newValue;
    setFormData({ ...formData, attributes: updated });
  };
  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("inStock", String(formData.inStock));
    data.append("newCategory", formData.newCategory ?? "");
    data.append("attributes", JSON.stringify(formData.attributes));

    images.forEach((img) => {
      if (img) data.append("images", img);
    });

    const res = await axiosInstance.post("/product/create", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log(res.data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-2xl">
      <PageHead title="Add New Product" />
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <div>
          <Label>Product Images (up to 5)</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
            {images.map((img, index) => (
              <label key={index} className="w-full aspect-square flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                {img ? (
                  <img src={URL.createObjectURL(img)} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-sm text-gray-400">Upload</span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, index)} />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <Label>Product Name</Label>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter product name" />
        </div>

        {/* Price */}
        <div>
          <Label>Price ($)</Label>
          <Input value={formData.price} type="number" onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Enter price" />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, category: value })} value={formData.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              <SelectItem value="new-category">+ Add Category</SelectItem>
            </SelectContent>
          </Select>
          {formData.category === "new-category" && (
            <div className="flex gap-2 mt-2">
              <Input value={formData.newCategory} onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })} placeholder="Add new category" />
            </div>
          )}
        </div>

        {/* Attributes */}
        <div>
          <Label>Attributes</Label>
          <div className="space-y-2 mt-2">
            {formData.attributes.map((attr, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Key"
                  value={attr.key}
                  onChange={(e) => updateAttributeKey(index, e.target.value)}
                  className="w-1/3"
                />
                <Input
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => updateAttributeValue(index, e.target.value)}
                  className="w-2/3"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeAttribute(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={addAttribute}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Attribute
          </Button>
        </div>
        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" />
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.inStock} onCheckedChange={(checked) => setFormData({ ...formData, inStock: Boolean(checked) })} />
          <span>In Stock</span>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">Save Product</Button>
      </form>
    </div>
  );
}
