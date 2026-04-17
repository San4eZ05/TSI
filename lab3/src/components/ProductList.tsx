// ProductList.tsx
import React from 'react';
import ProductCard from './ProductCard';
import type { ProductListProps } from './types';

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-16 bg-white rounded-lg">
          <p className="text-gray-400 text-lg">Нет объявлений</p>
          <p className="text-gray-300 text-sm mt-2">Добавьте первое объявление</p>
        </div>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;