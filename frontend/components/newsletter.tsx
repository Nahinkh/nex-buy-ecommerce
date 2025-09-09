import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Newsletter = () => {
  return (
    <section className="bg-green-600 py-12 text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="mb-6">Subscribe to our newsletter and never miss a deal.</p>
        <form className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="text-black bg-white"
          />
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter