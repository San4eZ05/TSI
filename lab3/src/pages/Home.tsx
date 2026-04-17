// pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Добро пожаловать на 
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Доску объявлений
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Покупайте и продавайте товары с легкостью
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-lg"
          >
            Перейти к объявлениям
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Легко и просто</h3>
            <p className="text-gray-600">Размещайте объявления в несколько кликов</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Безопасно</h3>
            <p className="text-gray-600">Все сделки под защитой</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Быстро</h3>
            <p className="text-gray-600">Мгновенные уведомления о новых объявлениях</p>
          </div>
        </div>
      </div>
    </div>
  );
};