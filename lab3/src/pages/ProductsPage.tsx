// pages/ProductsPage.tsx
import React from 'react';
import ProductList from '../components/ProductList';
import AddProductModal from '../components/AddProductModal';
import type { Product, User } from '../components/types';

interface ProductsPageProps {
  products: Product[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateProduct: (product: Product) => void;
  currentUser?: User | null;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ 
  products, 
  isModalOpen, 
  onOpenModal, 
  onCloseModal, 
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
  currentUser
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Все объявления</h1>
            <p className="text-gray-600 mt-2">Всего объявлений: {products.length}</p>
          </div>
          {currentUser && (
            <button 
              onClick={onOpenModal}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить объявление
            </button>
          )}
        </div>
        
        {!currentUser && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg mb-6">
            <p>
              Для добавления объявлений необходимо 
              <a href="/auth" className="underline font-semibold ml-1">авторизоваться</a>
            </p>
          </div>
        )}
        
        <ProductList 
          products={products} 
          onDelete={onDeleteProduct}
          onUpdate={onUpdateProduct}
          currentUser={currentUser}
        />
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onAddProduct={onAddProduct}
      />
    </div>
  );
};