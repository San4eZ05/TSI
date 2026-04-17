// components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../components/types';

interface HeaderProps {
  currentUser?: User | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Доска объявлений
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">Главная</Link>
            <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors">Объявления</Link>
            <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">О нас</Link>
            <Link to="/support" className="text-gray-600 hover:text-green-600 transition-colors">Поддержка</Link>
            
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {currentUser.firstName} {currentUser.lastName}
                  {currentUser.role === 'admin' && (
                    <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 rounded">Admin</span>
                  )}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link 
                to="/auth"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
              >
                Войти
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};