import React from 'react'
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Компания Пупкина</h3>
            <p className="text-gray-400 text-sm mt-1">© 2026 Все права защищены</p>
          </div>
          
          <nav className="flex space-x-6">
            <Link 
              to="/support" 
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Поддержка
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Политика конфиденциальности
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Условия использования
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}