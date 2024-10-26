"use client"

import { useState, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"



import { ChevronRight, ChevronDown, Search, ShoppingCart, User, Menu, Sun, Moon, Facebook, Instagram, Twitter, HelpCircle, Tag, Cpu, Package, Minus, Plus, X } from "lucide-react"
import { Badge } from "@/components/atoms/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/atoms/dialog"
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion"
import { cabin } from '@/lib/fonts'
import localFont from "next/font/local"
import Preloader from "@/components/atoms/preloader"
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

export default function AyudaPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedComponents, setSelectedComponents] = useState({})
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [sortOrder, setSortOrder] = useState("default")
  const [searchQuery, setSearchQuery] = useState("")
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()



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

  const navItems = [
    { name: "Productos", href: "/features/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/features/build-pc", icon: <Cpu className="mr-2 h-4 w-4 " /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/features/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]

  const faqSections = [
    {
      title: "Section 1",
      questions: [
        { question: "What is Webflow and why is it the best website builder?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { question: "What is your favorite template from BRIX Templates?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { question: "How do you clone a template from the Showcase?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { question: "Why is BRIX Templates the best Webflow agency?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { question: "When was Webflow officially launched?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { question: "How do you integrate Jetboost with Webflow?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      ]
    },
    { title: "Section 2", questions: [] },
    { title: "Section 3", questions: [] },
  ]

  const [activeSection, setActiveSection] = useState("Section 1")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    )
  }

  const brandLogos = [
    { name: "AMD", image: "/placeholder.svg?height=50&width=100" },
    { name: "NVIDIA", image: "/placeholder.svg?height=50&width=100" },
    { name: "Intel", image: "/placeholder.svg?height=50&width=100" },
    { name: "ASUS", image: "/placeholder.svg?height=50&width=100" },
    { name: "MSI", image: "/placeholder.svg?height=50&width=100" },
    { name: "Gigabyte", image: "/placeholder.svg?height=50&width=100" },
    { name: "Corsair", image: "/placeholder.svg?height=50&width=100" },
    { name: "Logitech", image: "/placeholder.svg?height=50&width=100" },
  ]

  if (loading) {
    return <Preloader />
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
                    onClick={() => router.push('/features/auth/user')}
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

      <main className="flex-grow container-2xl px-12 py-8 bg-gray-200 dark:bg-gradient-to-t from-gray-800 via-gray-600 to-slate-700 transition-all duration-500">
        <div className="px-5">
          <h1 className="text-4xl mt-16 font-bold mb-8 dark:text-white font-whyte transition-all duration-100">Preguntas Frecuentes</h1>
          
          <div className="mb-6">
            <Tabs>
              <TabsList className="w-full bg-transparent p-0 flex justify-start space-x-4">
                {faqSections.map((section) => (
                  <TabsTrigger
                    key={section.title}
                    value={section.title}
                    onClick={() => setActiveSection(section.title)}
                    className={`py-2 px-4 text-lg font-whyte2 rounded-xl transition-all duration-300 ease-in-out
                      ${activeSection === section.title
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <Card className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-250 ease-in-out hover:border-blue-500 dark:hover:border-blue-400 border-2 border-transparent">
            <CardContent className="p-6">
              {faqSections.map((section) => (
                <div key={section.title} className={activeSection === section.title ? '' : 'hidden'}>
                  {section.questions.map((item, index) => (
                    <motion.div
                      key={index}
                      className="mb-4 last:mb-0"
                      initial={false}
                      animate={{ backgroundColor: openQuestions.includes(item.question) ? 'rgba(59, 130, 246, 0.1)'   : 'transparent' }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        className="flex justify-between items-center w-full text-left py-3 px-4 text-gray-800 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-gray-700 focus:outline-none transition-all duration-300 ease-in-out rounded-lg"
                        onClick={() => toggleQuestion(item.question)}
                      >
                        <span className="text-xl font-whyte1 font-medium">{item.question}</span>
                        <motion.div
                          animate={{ rotate: openQuestions.includes(item.question) ? 90 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {openQuestions.includes(item.question) ? (
                            <ChevronDown className="text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ChevronRight className="text-gray-400 dark:text-gray-400" />
                          )}
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openQuestions.includes(item.question) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 dark:text-white font-whyte2">{item.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {index < section.questions.length - 1 && (
                        <hr className="my-2 border-gray-200 dark:border-gray-700 transition-all duration-300" />
                      )}
                    </motion.div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white font-whyte transition-all duration-100">Servicio postventa y garantías</h2>
            <Card className="dark:border-gray-700 rounded-xl dark:bg-gray-800 bg-white shadow-2xl transition-all duration-250">
              <CardContent className="p-6 dark:border-blue-700">
                <p className="mb-4 dark:text-white text-lg font-whyte1 ">
                  Para realizar consultas/reclamos relacionados con la garantía o devolución de alguna de tus compras, debajo de esta sección contamos con el apartado "Compra Gamer te ayuda, ¿Cuál es tu consulta?" donde debes exponer tu caso, seleccionando el motivo de "Postventa" que se adapte a tu requerimiento y uno de nuestros representantes te ofrecerá la información correspondiente sobre cómo proceder.
                </p>
                <p className="mb-4 dark:text-white text-lg font-whyte1 ">
                  Para saber si tu producto califica, te aconsejamos revisar los términos y condiciones.
                </p>
                <p className="mb-4 dark:text-white text-lg font-whyte1 ">
                  También podés sacar un turno para venir en forma presencial a gestionar tu garantía.
                </p>
                <Button className="mt-auto rounded-lg text-base bg-blue-600 hover:bg-blue-900 text-white font-whyte1">Turnos Postventa/Garantias</Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-whyte mb-4 dark:text-white transition-all duration-250">NexusGames te ayuda. ¿Cuál es tu consulta?</h2>
            <Card className="dark:border-gray-700 rounded-xl dark:bg-gray-800 bg-white shadow-2xl transition-all duration-100">
              <CardContent className="p-6">
                <p className="mb-4 dark:text-white text-lg font-whyte ">
                  Para realizar una consulta es necesario que inicies sesión en tu cuenta.
                </p>
                <Dialog open={accountModalOpen} onOpenChange={setAccountModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="mt-auto rounded-lg text-base bg-blue-600 hover:bg-blue-900 text-white font-whyte1"
                    >
                      Iniciar Sesion
                    </Button>
                  </DialogTrigger>

                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <div className="bg-gray-300 dark:bg-gray-900 py-8 overflow-hidden transition-all duration-500">
        <div className="container mx-auto">
          <div className="flex animate-scroll">
            {[...brandLogos, ...brandLogos].map((brand, index) => (
              <div key={index} className="flex-shrink-0 mx-4">
                <Image src={brand.image} alt={brand.name} width={100} height={50} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-900 dark:to-gray-950 text-white transition-all duration-500">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-whyte1">Atención al cliente</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline font-whyte1 transition-all duration-300">Contacto</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1 transition-all duration-300">Preguntas frecuentes</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1 transition-all duration-300">Términos y condiciones</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-center font-whyte1">Sobre nosotros</h3>
              <ul className="space-y-2 text-center">
                <li><Link href="#" className="hover:underline font-whyte1 transition-all duration-300">Quiénes somos</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1 transition-all duration-300">Sucursales</Link></li>
                <li><Link href="#" className="hover:underline font-whyte1 transition-all duration-300">Trabaja con nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-right font-whyte1">Redes sociales</h3>
              <div className="flex justify-end space-x-8">
                <Link href="#" className="hover:text-gray-300 transition-all duration-300"><Facebook className="h-6 w-6" /></Link>
                <Link href="#" className="hover:text-gray-300 transition-all duration-300"><Instagram className="h-6 w-6" /></Link>
                <Link href="#" className="hover:text-gray-300 transition-all duration-300"><Twitter className="h-6 w-6" /></Link>
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