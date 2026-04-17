// ProductCard.tsx
import React, { useState } from 'react';
import type { ProductCardProps } from './types';

interface ExtendedProductCardProps extends ProductCardProps {
  onDelete?: (id: number) => void;
  onUpdate?: (product: any) => void;
}

const ProductCard: React.FC<ExtendedProductCardProps> = ({ product, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(product.price.toString());
  const [editDescription, setEditDescription] = useState(product.description);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        ...product,
        name: editName,
        price: parseFloat(editPrice),
        description: editDescription
      });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Название"
        />
        <input
          type="number"
          value={editPrice}
          onChange={(e) => setEditPrice(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Цена"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          rows={3}
          placeholder="Описание"
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Сохранить
          </button>
          <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 flex-1">
            {product.name}
          </h3>
          <div className="flex gap-2 ml-2">
            {onUpdate && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Редактировать"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                aria-label="Удалить"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="text-2xl font-bold text-green-600 mb-3">
          {product.price.toLocaleString()} ₽
        </div>
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;