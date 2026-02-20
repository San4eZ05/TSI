import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-blue-200 transition-colors duration-300">
              Логотип
            </Link>
          </div>
          
          <div className="flex space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Главная
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              О нас
            </Link>
            <Link 
              to="/catalog" 
              className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Каталог
            </Link>
            <Link 
              to="/auth" 
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300 font-medium ml-2"
            >
              Войти
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}