"use client"

import Signin from "@/components/supaauth/Signin"
import React from 'react'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/atoms/input"
import { Search, ShoppingCart, User, Menu, Sun, Moon, ChevronDown, Facebook, Instagram, Twitter, Github, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/atoms/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/atoms/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/atoms/dialog"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [accountModalOpen, setAccountModalOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navItems = [
    { name: "Productos", href: "/products-page" },
    { name: "Armá tu PC", href: "/build-pc" },
    { name: "Ofertas", href: "#" },
    { name: "Ayuda", href: "/ayuda" },
  ]


  return (
  <html>
   <body>
   <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-[#0046BE] dark:bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              CompraGamer
            </Link>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex">
                <ul className="flex space-x-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <Button variant="ghost" className="hover:bg-[#3B82F6] rounded-xl dark:hover:bg-gray-700 ml-21">
                          {item.name}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
                  <Dialog open={accountModalOpen} onOpenChange={setAccountModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="hidden md:flex hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Mi Cuenta
                      </Button>

                    </DialogTrigger>
                    <DialogContent className="dark:bg-black dark:border-black dark:bg-zinc-900  bg-blue-600 rounded-xl ">
                    <Card className="w-full dark:bg-zinc-900 text-white dark:border-zinc-900  bg-blue-600 border-blue-600  rounded-xl ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crea una cuenta</CardTitle>
          <CardDescription className="text-zinc-400">
            Introduce tu email para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="bg-zinc-800 text-white border-white dark:border-zinc-700 hover:bg-zinc-700 rounded-xl">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="bg-zinc-800 text-white border-white dark:border-zinc-700 hover:bg-zinc-700 rounded-xl">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className=" px-2 text-white  ">O Continua con</span>
              </div>
            </div>
            <form>
              <div className="grid gap-2">
                <Input
                  id="email"
                  placeholder="pepe@ejemplo.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 rounded border-white"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  placeholder="Contraseña"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  className="bg-zinc-800 border-zinc-700 text-white  placeholder-zinc-400 rounded border-white"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded">
                  Crear Cuenta
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
                </DialogContent>
                  </Dialog>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="relative hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Carrito
                        <Badge className="absolute -top-2 -right-2 bg-red-500">{cartItems.length}</Badge>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-white dark:bg-gray-800 dark:border-gray-700">
                      <SheetHeader>
                        <SheetTitle className="dark:text-white text-center">Carrito de Compras</SheetTitle>
                        <SheetDescription className="dark:text-white font-bold text-md">
                          Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                        </SheetDescription>
                      </SheetHeader>
                      {cartItems.map((item, index) => (
                        <div key={index} className="py-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p>${item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </SheetContent>
                  </Sheet>
                  <Button variant="ghost" onClick={toggleDarkMode} className="hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl">
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="md:hidden hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                      <nav className="mt-6">
                        <ul className="space-y-4">
                          {navItems.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="block py-2 text-lg  hover:text-[#3B82F6] dark:hover:text-gray-300"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Button
                              variant="ghost"
                              className="w-full justify-start py-2 text-lg hover:text-[#3B82F6] dark:hover:text-gray-300"
                              onClick={() => {
                                setMobileMenuOpen(false)
                                setAccountModalOpen(true)
                              }}
                            >
                              Mi Cuenta
                            </Button>
                          </li>
                        </ul>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between">
              </div>
            </div>
          </header>
          <main className="flex-grow  container-2xl px-12 py-8 bg-gray-300 dark:bg-gray-900 ">
          <div>

           <Signin />

           </div>
        </main>
        <footer className="bg-[#0046BE] dark:bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Atención al cliente</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:underline">Contacto</Link></li>
                    <li><Link href="#" className="hover:underline">Preguntas frecuentes</Link></li>
                    <li><Link href="#" className="hover:underline">Términos y condiciones</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Sobre nosotros</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:underline">Quiénes somos</Link></li>
                    <li><Link href="#" className="hover:underline">Sucursales</Link></li>
                    <li><Link href="#" className="hover:underline">Trabaja con nosotros</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Redes sociales</h3>
                  <div className="flex space-x-4">
                    <Link href="#" className="hover:text-gray-300"><Facebook className="h-6 w-6" /></Link>
                    <Link href="#" className="hover:text-gray-300"><Instagram className="h-6 w-6" /></Link>
                    <Link href="#" className="hover:text-gray-300"><Twitter className="h-6 w-6" /></Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center text-sm">
                Made by NexusGames With 💖
              </div>
            </div>
          </footer>
        </div>
    </body>
 </html>
)
}
