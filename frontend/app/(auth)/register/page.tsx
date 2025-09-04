'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegister } from '@/hooks/useRegister'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const { mutate: register,isSuccess,data } = useRegister();
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        register(form);
        console.log("Register data:", data);
        console.log("isSuccess:", isSuccess);
        if(isSuccess) router.push('/login')
    };
    return (
        <div><div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <Button type="submit">Register</Button>
                </form>
                <p className="text-sm text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div></div>
    )
}

export default RegisterPage