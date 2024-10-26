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
import { ScrollArea } from "@/components/atoms/scroll-area"



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
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)



  interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }


  
    useEffect(() => {
      // Load dark mode preference from localStorage
      const savedDarkMode = localStorage.getItem('darkMode')
      setDarkMode(savedDarkMode === 'true')
  
      // Load cart items from localStorage
      const savedCartItems = localStorage.getItem('cartItems')
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems))
      }
  
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }, [])
  
  
    const toggleDarkMode = () => {
      const newDarkMode = !darkMode
      setDarkMode(newDarkMode)
      localStorage.setItem('darkMode', newDarkMode.toString())
    }
  
  
    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, [darkMode])
  

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  const addToCart = () => {
    const newCartItems = Object.values(selectedComponents).map(component => ({
      ...component,
      quantity: 1
    }))
    setCartItems((prevItems) => [...prevItems, ...newCartItems])
    setSelectedComponents({})
    setCurrentStep(0)
    setShowSummary(false)
  }

  const updateCartItemQuantity = (index: number, change: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map((item, i) => 
        i === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
      return newItems
    })
  }

  const removeCartItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)


  const navItems = [
    { name: "Productos", href: "/features/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/features/build-pc", icon: <Cpu className="mr-2 h-4 w-4 " /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/features/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
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
                <Button
                  variant="ghost"
                  className="hidden md:flex hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 font-whyte transition-all duration-300"
                  onClick={() => router.push('/features/auth/user')}
                >
                  <User className="h-4 w-4" />
                  <span className="ml-1 hidden xl:inline">Mi Cuenta</span>
                </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 font-whyte transition-all duration-300">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="ml-1 hidden xl:inline">Carrito</span>
                  <Badge className="absolute -top-2 -right-2 bg-red-500">{totalItems}</Badge>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
                <SheetHeader>
                  <SheetTitle className="dark:text-white text-center font-whyte">Carrito de Compras</SheetTitle>
                  <SheetDescription className="dark:text-white font-bold text-md font-whyte">
                    Total: ${totalPrice.toLocaleString()}
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="py-2 flex items-center border-b">
                      <Image src={item.image} alt={item.name} width={50} height={50} className="mr-4 rounded-md" />
                      <div className="flex-grow">
                        <h3 className="font-semibold font-whyte">{item.name}</h3>
                        <p>${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateCartItemQuantity(index, -1)}
                            className="px-2 py-1"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-2">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateCartItemQuantity(index, 1)}
                            className="px-2 py-1"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCartItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <SheetFooter className="mt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-900 rounded text-white font-whyte">
                    Comprar
                  </Button>
                </SheetFooter>
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


          <footer className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-900 dark:to-gray-950 text-white ">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-whyte1">Atención al cliente</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline font-whyte1">Contacto</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1">Preguntas frecuentes</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1">Términos y condiciones</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-center font-whyte1">Sobre nosotros</h3>
              <ul className="space-y-2 text-center">
                <li><Link href="#" className="hover:underline font-whyte1">Quiénes somos</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1">Sucursales</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1">Trabaja con nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-right font-whyte1">Redes sociales</h3>
              <div className="flex justify-end space-x-8">
                <Link href="#" className="hover:text-gray-300"><Facebook className="h-6 w-6" /></Link>
                <Link href="#" className="hover:text-gray-300"><Instagram className="h-6 w-6" /></Link>
                <Link href="#" className="hover:text-gray-300"><Twitter className="h-6 w-6" /></Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-base font-whyte">
            © 2024 NexusGames. Todos los derechos reservados.
          </div>
          <div className="mt-6 text-center text-sm font-whyte1">
            Made by Makak0 With 💖
          </div>
        </div>
      </footer>
    </motion.div>
        
  </body>
</html>
  )
}
