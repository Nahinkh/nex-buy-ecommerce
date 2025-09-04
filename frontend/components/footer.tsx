import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6">
            <h1 className="text-2xl font-bold">NEXBUY</h1>
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
            Your one-stop shop for all your needs. Discover amazing deals and discounts on a wide range of products.
        </p>
    </div>
    <div className="border-t border-[#ffffff33]">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
            <a href="https://prebuiltui.com">WebNex</a> ©{new Date().getFullYear()}. All rights reserved.
        </div>
    </div>
</footer>
  )
}

export default Footer