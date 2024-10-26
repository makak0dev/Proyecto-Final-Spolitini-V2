"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"  // Updated import import { Button } from "@/components/ui/button"
import { Input } from "@/components/atoms/input"
import { Search, ShoppingCart, User, Menu, Sun, Moon, ChevronDown, Facebook, Instagram, Twitter, Github, Mail, HelpCircle, Tag, Cpu, Package, Minus, Plus, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import  children  from '@/app/features/auth/users/children'
import { motion, AnimatePresence } from "framer-motion"
import { metadata } from "Metadata"


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



const featuredProducts = [

  { id: 1, name: "Notebook Gamer", price: 599999, image: "/images/imagenpublicitaria4.jpg?width=400&height=300" },
  { id: 2, name: "PC Gamer", price: 799999, image: "/placeholder.svg?height=300&width=400" },
  { id: 3, name: "Monitor Gaming", price: 199999, image: "/placeholder.svg?height=300&width=400" },
  { id: 4, name: "Teclado Mecánico", price: 49999, image: "/placeholder.svg?height=300&width=400" },
]

const categories = [
  { name: "Notebooks", image: "/placeholder.svg?height=100&width=100" },
  { name: "Placas de Video", image: "/placeholder.svg?height=100&width=100" },
  { name: "Procesadores", image: "/placeholder.svg?height=100&width=100" },
  { name: "Monitores", image: "/placeholder.svg?height=100&width=100" },
]



export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const router = useRouter()


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
    { name: "Productos", href: "/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/build-pc", icon: <Cpu className="mr-2 h-4 w-4" /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]




    
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
<html>
      <body>
      <motion.div
      className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}
      initial={false}
      animate={{
        backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
        color: darkMode ? '#f7fafc' : '#1a202c'
      }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-800 dark:to-gray-900 text-white transition-all duration-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold font-whyte">
                NexusGames
              </Link>
            </div>

            <nav className="hidden lg:flex flex-grow justify-center">
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button variant="ghost" className="hover:bg-[#3B82F6] rounded-xl font-whyte dark:hover:bg-gray-700 px-2 py-1 transition-all duration-300">
                        {item.icon}
                        <span className="ml-1 hidden xl:inline">{item.name}</span>
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center space-x-2">
              <ClerkProvider>
                <SignedIn>
                  <UserButton showName />
                </SignedIn>
                <SignedOut>
                  <Button
                    variant="ghost"
                    className="hidden md:flex hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 font-whyte transition-all duration-300"
                    onClick={() => router.push('/sign-in')}
                  >
                    <User className="h-4 w-4" />
                    <span className="ml-1 hidden xl:inline">Mi Cuenta</span>
                  </Button>
                </SignedOut>
              </ClerkProvider>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 font-whyte transition-all duration-300">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="ml-1 hidden xl:inline">Carrito</span>
                    <Badge className="absolute -top-2 -right-2 bg-red-500">{cartItems.length}</Badge>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
                  <SheetHeader>
                    <SheetTitle className="dark:text-white text-center font-whyte">Carrito de Compras</SheetTitle>
                    <SheetDescription className="dark:text-white font-bold text-md font-whyte">
                      Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </SheetDescription>
                  </SheetHeader>
                  {cartItems.map((item, index) => (
                    <div key={index} className="py-2">
                      <h3 className="font-semibold font-whyte">{item.name}</h3>
                      <p>${item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </SheetContent>
              </Sheet>
              <Button variant="ghost" onClick={toggleDarkMode} className="hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 transition-all duration-300">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="lg:hidden hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 transition-all duration-300">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px] transition-all duration-300">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6">
                    <ul className="space-y-4">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="flex items-center py-2 text-lg hover:text-[#3B82F6] dark:hover:text-gray-300 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Button
                          variant="ghost"
                          className="w-full justify-start py-2 text-lg hover:text-[#3B82F6] dark:hover:text-gray-300 font-whyte transition-all duration-300"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            router.push('/mi-cuenta')
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Mi Cuenta
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

          <main className="flex items-center justify-center h-screen container-2xl px-12 py-8 bg-gray-300 dark:bg-gray-900 ">
          <ClerkProvider >
          <SignedOut>
              <SignIn routing="hash"/>
            </SignedOut>
            {children}
          </ClerkProvider>

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
                  <div className="flex  space-x-4">
                    <Link href="#" className="hover:text-gray-300"><Facebook className="h-6 w-6" /></Link>
                    <Link href="#" className="hover:text-gray-300"><Instagram className="h-6 w-6" /></Link>
                    <Link href="#" className="hover:text-gray-300"><Twitter className="h-6 w-6" /></Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center text-sm">
                © 2024 CompraGamer. Todos los derechos reservados.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
