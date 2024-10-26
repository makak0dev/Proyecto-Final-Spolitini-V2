'use client'

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Search, ShoppingCart, User, Menu, Sun, Moon, ChevronDown, Facebook, Instagram, Twitter, Github, Mail, HelpCircle, Tag, Cpu, Package, Star, Truck, CreditCard, Clock, Shield, Minus, Plus, X, Mails } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { cabin } from '@/lib/fonts'
import localFont from "next/font/local"
import Preloader from '@/components/atoms/preloader'
import { ScrollArea } from "@/components/atoms/scroll-area"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const featuredProducts = [
  { id: 1, name: "Notebook Gamer", price: 599999, image: "/placeholder.svg?height=300&width=400", rating: 4.5 },
  { id: 2, name: "PC Gamer", price: 799999, image: "/placeholder.svg?height=300&width=400", rating: 4.8 },
  { id: 3, name: "Monitor Gaming", price: 199999, image: "/placeholder.svg?height=300&width=400", rating: 4.3 },
  { id: 4, name: "Teclado Mecánico", price: 49999, image: "/placeholder.svg?height=300&width=400", rating: 4.6 },
]

const categories = [
  { name: "Notebooks", image: "/placeholder.svg?height=100&width=100" },
  { name: "Placas de Video", image: "/placeholder.svg?height=100&width=100" },
  { name: "Procesadores", image: "/placeholder.svg?height=100&width=100" },
  { name: "Monitores", image: "/placeholder.svg?height=100&width=100" },
]

const brands = ['AMD', 'Intel', 'NVIDIA', 'Corsair', 'Logitech', 'Razer', 'ASUS', 'MSI', 'Gigabyte', 'HyperX']

export default function HomePage({ params }: { params: { id?: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedComponents, setSelectedComponents] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const router = useRouter()


  interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    setDarkMode(savedDarkMode === 'true')

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

  const addToCart = (product: CartItem) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCartItems(updatedItems)
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
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
    { name: "Contacto", href: "/features/contacto", icon: <Mails className="mr-2 h-4 w-4" /> },
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

      <main className="flex-grow container-xl px-12 py-8 bg-gray-200 dark:bg-gradient-to-t from-gray-800 via-gray-600 to-slate-700 transition-all duration-500" >
        <section className="mb-12 overflow-hidden">
          <Slider {...sliderSettings}>
            <div className="bg-blue-600 dark:bg-[#313a47] p-2 rounded-3xl">
              <Image src="/images/fotopromocional1.jpg" alt="Oferta Especial" width={1200} height={400} className="w-full rounded-3xl" />
            </div>
            <div className="bg-blue-600 dark:bg-[#313a47] p-2 rounded-3xl">
              <Image src="/images/fotopromocional2.jpg" alt="Oferta Especial" width={1200} height={400} className="w-full rounded-3xl " />
            </div>
            <div className="bg-blue-600 dark:bg-[#313a47] p-2 rounded-3xl">
              <Image src="/images/fotopromocional3.jpg" alt="Nuevos Productos" width={1200} height={400} className="w-full rounded-3xl" />
            </div>
          </Slider>
        </section>

        <section className="mb-12 overflow-hidden transition-all duration-300">
          <div className="bg-blue-600 dark:bg-gray-700 p-6 rounded-xl">
            <h2  className="text-3xl font-whyte font-bold mb-6 text-center dark:text-white transition-all duration-100">Conocé nuestros productos destacados</h2>
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rounded-xl bg-blue-700">
                <TabsTrigger value="todos" className="data-[state=active]:bg-blue-500 rounded-xl  dark:text-white font-whyte">Todos</TabsTrigger>
                <TabsTrigger value="notebooks" className="data-[state=active]:bg-blue-500 rounded-xl dark:text-white font-whyte">Notebooks</TabsTrigger>
                <TabsTrigger value="componentes" className="data-[state=active]:bg-blue-500 rounded-xl dark:text-white font-whyte">Componentes</TabsTrigger>
                <TabsTrigger value="perifericos" className="data-[state=active]:bg-blue-500 rounded-xl dark:text-white font-whyte">Periféricos</TabsTrigger>
              </TabsList>
              <TabsContent value="todos">
                <div className="relative rounded-xl transition-all duration-300">
                  <Slider {...productSliderSettings}>
                    {featuredProducts.map((product) => (
                      <div key={product.id} className="p-6">
                        <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden dark:border-gray-600 shadow-xl">
                          <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-48 object-cover" />
                          <CardContent className="p-4">
                            <h3 className="text-lg font-whyte1 font-semibold mb-2 dark:text-white">{product.name}</h3>
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 ">{product.rating}</span>
                            </div>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price.toLocaleString()}</p>
                            <Button 
                              className="w-full mt-4 bg-blue-600 hover:bg-blue-900 text-white font-whyte rounded" 
                              onClick={() => addToCart(product)}
                            >
                              Agregar al carrito
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </Slider>
                </div>
              </TabsContent>
              <TabsContent value="notebooks">
                {/* Similar content as "todos" tab, filtered for notebooks */}
              </TabsContent>
              <TabsContent value="componentes">
                {/* Similar content as "todos" tab, filtered for components */}
              </TabsContent>
              <TabsContent value="perifericos">
                {/* Similar content as "todos" tab, filtered for peripherals */}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-left dark:text-white font-whyte1 transition-all duration-100">Categorías destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-300">
            {categories.map((category) => (
              <Link href="/features/products-page" key={category.name} className="block">
                <div className="bg-[#7a7a7aa6] dark:bg-gray-700 p-5 font-whyte2 shadow-xl text-center hover:bg-gray-400 transition-hover duration-400 rounded-xl">
                  <Image src={category.image} alt={category.name} width={100} height={100} className="mx-auto mb-2 rounded-full" />
                  <h3 className="font-semibold dark:text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-left dark:text-white font-whyte1 transition-all duration-100">¡Las mejores marcas están en NexusGames!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 transition-all duration-300">
            {brands.map((brand) => ( 
              <div key={brand} className="bg-[#ecedee] dark:bg-gray-700 p-4 shadow-xl flex items-center justify-center rounded-2xl">
                <Image src={`/images/brands/${brand.toLowerCase()}.png`} alt={brand} width={80} height={40} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-left dark:text-white font-whyte1 transition-all duration-100">¿Por qué elegir NexusGames?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300">
            {[
              { title: "Envíos a todo el país", description: "Rápidos y seguros", icon: <Truck className="h-10 w-10" /> },
              { title: "Garantía oficial", description: "En todos nuestros productos", icon: <Shield className="h-8 w-8" /> },
              { title: "Los mejores precios", description: "Calidad al mejor costo", icon: <CreditCard className="h-8 w-8" /> },
              { title: "Atención 24/7", description: "Estamos para ayudarte baires", icon: <Clock className="h-8 w-8" /> }
            ].map((item) => (
              <Card key={item.title} className="bg-[#ecedee] dark:bg-gray-700 dark:border-gray-500 border-gray-400 rounded-3xl">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white font-whyte1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-whyte2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-left dark:text-white font-whyte1 transition-all duration-100">Nuestros clientes nos recomiendan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-200">
            {[
              { name: "Juan Pérez", comment: "Excelente servicio y productos de calidad. Totalmente recomendado.", avatar: "/placeholder.svg?height=50&width=50" },
              { name: "María González", comment: "Los mejores precios del mercado y envío super rápido.", avatar: "/placeholder.svg?height=50&width=50" },
              { name: "Carlos Rodríguez", comment: "Atención al cliente de primera. Resolvieron todas mis dudas.", avatar: "/placeholder.svg?height=50&width=50" }
            ].map((review, i) => (
              <Card key={i} className="bg-[#ecedee] dark:bg-gray-700 border-gray-300 dark:border-gray-500 rounded font-whyte1">
                <CardContent className="p-6">
                <div className="flex items-center">
                    <Image src={review.avatar} alt={review.name} width={50} height={50} className="rounded-full mr-3" />
                    <p className="font-semibold dark:text-white">{review.name}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className=" h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 dark:text-gray-300 font-whyte2">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-900 dark:to-gray-950 text-white transition-all duration-500">
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