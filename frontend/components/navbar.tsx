'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { useProfile } from '@/hooks/uaerProfiels'
import { axiosInstance } from '@/lib/axios'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: user } = useProfile();
  const {data: session}= useSession()
  console.log(session)
  const router = useRouter();
  const { cart } = useCart();
  const logoutStore = useAuthStore((state) => state.logout);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/products?search=${search}`);
    } else {
      router.push("/products");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    sessionStorage.removeItem("token");
    logoutStore();
    router.push("/login");
  };
  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-green-600">NEXBUY</h1>
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 px-4 hidden md:block">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full max-w-md"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-gray-700 hover:text-green-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600">Products</Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User Avatar */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={session?.user?.image || "/avatar.png"} />
                    <AvatarFallback>
                      {session?.user?.name}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/" className="text-gray-700 hover:text-green-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600">Products</Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-green-600">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-green-600">Profile</Link>
                <Link href="/orders" className="text-gray-700 hover:text-green-600">Orders</Link>
                <button onClick={handleLogout} className="text-left text-gray-700 hover:text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white w-full"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar