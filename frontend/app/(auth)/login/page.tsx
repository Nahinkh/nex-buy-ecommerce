'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate: login, isSuccess, data } = useLogin();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
    console.log("Login data:", data);
    if (isSuccess) router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="******"
              value={form.password}
              onChange={handleChange}
            />
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