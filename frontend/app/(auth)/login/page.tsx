'use client'
import PageHead from '@/components/page-head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/useLogin';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate: login, isSuccess, data } = useLogin();
   const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();
     useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) router.push("/");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <PageHead title="Login" />
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="******"
              value={form.password}
              onChange={handleChange}
              className="pr-10" // add padding to avoid overlap with icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit">Login</Button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;