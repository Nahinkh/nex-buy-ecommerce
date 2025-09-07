'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { useProfile } from '@/hooks/uaerProfiels'
import { axiosInstance } from '@/lib/axios'
import { ShoppingCart } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useCart } from '@/hooks/useCart'

const Navbar = () => {
    const { data: user } = useProfile();
    const {cart}=useCart()
    console.log(cart.length)
    const [search, setSearch] = useState("");
    const logout = () => {
        axiosInstance.post("/auth/logout");
    }
    return (
         <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-green-600">NEXBUY</h1>
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 px-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md"
            />
          </div>

          {/* Navigation & Icons */}
          <div className="flex items-center gap-4">
            {/* Navigation links */}
            <div className="hidden md:flex gap-4">
              <Link href="/" className="text-gray-700 hover:text-green-600">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600">Products</Link>
              <Link href="/categories" className="text-gray-700 hover:text-green-600">Categories</Link>
            </div>

            {/* Cart */}
            <Link href="/cart">
            <Button variant="ghost" className="relative">
              <ShoppingCart />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">{cart.length ? cart.length : 0}</span>
            </Button>
            </Link>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu (hamburger) */}
            <div className="md:hidden">
              <Button variant="ghost">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar