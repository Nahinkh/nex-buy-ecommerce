import React from 'react'
import { Card, CardContent } from './ui/card'

const Testimonials = () => {
    const testimonials = [
  { name: "Alice Johnson", review: "Great quality and fast delivery!" },
  { name: "Mark Lee", review: "Customer service was excellent, highly recommend." },
  { name: "Sophia Kim", review: "Loved the products, will definitely shop again." },
]
  return (
     <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="shadow hover:shadow-md transition">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-3">“{t.review}”</p>
                <h4 className="font-semibold text-green-600">{t.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials