import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import SkillDetails from './pages/SkillDetails'
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

export default function App(){
  const [dark,setDark] = useState(false)
  useEffect(()=>{ AOS.init({duration:600}); document.documentElement.classList.toggle('dark', dark) },[dark])
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar dark={dark} setDark={setDark} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/skill/:id" element={<SkillDetails/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
