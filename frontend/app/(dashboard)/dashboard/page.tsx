"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import PageHead from "@/components/page-head";

const stats = [
  { title: "Total Products", value: "120", icon: Package },
  { title: "Orders Today", value: "35", icon: ShoppingCart },
  { title: "Revenue", value: "$4,200", icon: DollarSign },
  { title: "Customers", value: "890", icon: Users },
];

const salesData = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 300 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 250 },
  { name: "Fri", sales: 600 },
  { name: "Sat", sales: 800 },
  { name: "Sun", sales: 700 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <PageHead title="Dashboard Overview" />
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here’s how your store is performing today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title} className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Weekly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
