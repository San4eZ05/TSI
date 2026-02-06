import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export const Footer = () => {
  return (
    <>
        <nav>
            <Link to ="/support">Поддержка</Link>
        </nav>
    </>
  )
}
