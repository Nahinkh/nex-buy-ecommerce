import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">NEXBUY</h2>
            <p className="text-sm text-gray-400">
              Your one-stop shop for quality products at the best prices.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-green-600">Home</Link></li>
              <li><Link href="/shop" className="hover:text-green-600">Shop</Link></li>
              <li><Link href="/about" className="hover:text-green-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-green-600">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-green-600">FAQ</Link></li>
              <li><Link href="/returns" className="hover:text-green-600">Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-green-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-600">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-green-600">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-green-600">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-green-600">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer