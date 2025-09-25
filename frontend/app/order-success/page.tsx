import { CheckCircle} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center"
      >
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Order Placed Successfully 🎉
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase! Your order has been placed and is being
          processed. You’ll receive an email confirmation shortly.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full rounded-xl bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 transition"
          >
           <p> Continue Shopping</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page