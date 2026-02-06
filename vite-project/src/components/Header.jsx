import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export const Header = () => {
  return (
    <>
        <nav>
            <Link to ="/">Главная</Link>
            <Link to ="/about">О нас</Link>
            <Link to ="/catalog">Каталог</Link>
            <Link to ="/auth">Авторизация</Link>
            
        </nav>
    </>
  )
}
