import React from 'react'
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <nav className="flex justify-center">
          <Link 
            to="/support" 
            className="text-gray-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Поддержка
          </Link>
        </nav>
        <div className="text-center text-gray-400 text-sm mt-4">
          © 2026 Все права защищены
        </div>
      </div>
    </footer>
  )
}