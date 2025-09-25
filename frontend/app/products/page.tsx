import ProductsClient from '@/components/all-products-client'
import PageHead from '@/components/page-head'
import React from 'react'

const ProductsPage = () => {
  return (
    <div>
      <PageHead title='Products'/>
      <ProductsClient/>
    </div>
  )
}

export default ProductsPage