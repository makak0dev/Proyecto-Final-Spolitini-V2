"use client"

import { useState, useEffect, useMemo} from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/atoms/card"

import { Dialog, DialogContent, DialogTrigger } from "@/components/atoms/dialog"
import { Checkbox } from "@/components/atoms/checkbox"
import Preloader from "@/components/atoms/preloader"
import { motion, AnimatePresence } from "framer-motion"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select"
import { Search, ShoppingCart, User, Menu, Sun, Moon, ChevronDown, ChevronRight, Facebook, Instagram, Twitter, Github, Mail, Tag, HelpCircle, Package, Cpu, Minus, Plus, X  } from "lucide-react"
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/atoms/collapsible"
import { ScrollArea } from "@/components/atoms/scroll-area"


import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cabin } from '@/lib/fonts'
import localFont from "next/font/local"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  subcategory?: string
}

interface CartItem extends Product {
  quantity: number
}

interface Category {
  name: string
  subcategories?: string[]
}

const categories: Category[] = [
  { name: "Equipos y Notebooks", subcategories: ["Notebooks", "PCs de escritorio", "All in One"] },
  { name: "Kits de actualización", subcategories: ["AMD", "Intel"] },
  { name: "Procesadores", subcategories: ["AMD", "Intel"] },
  { name: "Mothers", subcategories: ["AMD", "Intel"] },
  { name: "Placas de Video", subcategories: ["NVIDIA", "AMD"] },
  { name: "Memorias RAM", subcategories: ["DDR4", "DDR5"] },
  { name: "Almacenamiento", subcategories: ["SSD", "HDD", "M.2"] },
  { name: "Refrigeración", subcategories: ["Aire", "Líquida"] },
  { name: "Gabinetes" , subcategories: ["Gabinetes", "Modding | Cables, Iluminación y otros"] },
  { name: "Fuentes" ,  subcategories: ["Fuentes de alimentación",] },
  { name: "Monitores" ,  subcategories: ["Monitores y pantallas",] },
  { name: "Periféricos", subcategories: ["Teclados", "Mouses", "Auriculares", "Webcam", "Joysticks", "Mouse Pads", "Parlantes", "Combos de Teclados, Mouses y otros", "Microfonos", "Volantes - Simuladores de manejo", "Stream Deck"] },
  { name: "Sillas Gamers",  subcategories: ["Sillas Gamers",]  },
  { name: "Robots",  subcategories: ["Robots",]  },
  { name: "Conectividad",  subcategories: ["Placas de red inalambricas", "Routers WiFi",]  },
  { name: "Estabilizadores y UPS",  subcategories: ["Estabilizadores", "UPS",]  },
  { name: "Cables y Adaptadores",  subcategories: ["Cables y adaptadores",]  },
  { name: "Celulares y Smartwatch",  subcategories: ["Celulares","Accesorios de celulares",]  },
  { name: "Impresoras e Insumos",  subcategories: ["Impresoras y Multifunciones", "Insumos Originales",]  },
  { name: "Televisores",  subcategories: ["Televisores",]  },
]

const products: Product[] = [
  { id: 1, name: "Notebook Gamer Acer Nitro 5", price: 899999, image: "/images/acer.webp", category: "Equipos y Notebooks", subcategory: "Notebooks" },
  { id: 2, name: "PC de escritorio Gamer AMD Ryzen 5", price: 599999, image: "/placeholder.svg?height=200&width=200", category: "Equipos y Notebooks", subcategory: "PCs de escritorio" },
  { id: 3, name: "All in One Lenovo IdeaCentre", price: 449999, image: "/placeholder.svg?height=200&width=200", category: "Equipos y Notebooks", subcategory: "All in One" },
  { id: 4, name: "Kit Actualización AMD Ryzen 5 + Mother A520", price: 299999, image: "/placeholder.svg?height=200&width=200", category: "Kits de actualización", subcategory: "AMD" },
  { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 349999, image: "/placeholder.svg?height=200&width=200", category: "Procesadores", subcategory: "AMD" },
  { id: 6, name: "Procesador Intel Core i7-11700K", price: 379999, image: "/placeholder.svg?height=200&width=200", category: "Procesadores", subcategory: "Intel" },
  { id: 7, name: "Mother ASUS ROG STRIX B550-F GAMING", price: 189999, image: "/placeholder.svg?height=200&width=200", category: "Mothers", subcategory: "AMD" },
  { id: 8, name: "Placa de Video NVIDIA GeForce RTX 3070", price: 799999, image: "/placeholder.svg?height=200&width=200", category: "Placas de Video", subcategory: "NVIDIA" },
  { id: 9, name: "Memoria RAM Corsair Vengeance 16GB DDR4", price: 89999, image: "/placeholder.svg?height=200&width=200", category: "Memorias RAM", subcategory: "DDR4" },
  { id: 10, name: "SSD Samsung 970 EVO Plus 1TB M.2", price: 149999, image: "/placeholder.svg?height=200&width=200", category: "Almacenamiento", subcategory: "M.2" },
]

export default function ProductsPage({ params }: { params: { id?: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({})
  const [sortOrder, setSortOrder] = useState("default")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComponents, setSelectedComponents] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const [showSummary, setShowSummary] = useState(false)


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



  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    )
  }

  const handleFilterChange = (category: string, subcategory: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev }
      if (!updatedFilters[category]) {
        updatedFilters[category] = []
      }
      if (checked) {
        updatedFilters[category] = [...updatedFilters[category], subcategory]
      } else {
        updatedFilters[category] = updatedFilters[category].filter((sub) => sub !== subcategory)
      }
      if (updatedFilters[category].length === 0) {
        delete updatedFilters[category]
      }
      return updatedFilters
    })
  }

  const sortProducts = (productsToSort: Product[]) => {
    switch (sortOrder) {
      case "price-asc":
        return [...productsToSort].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...productsToSort].sort((a, b) => b.price - a.price)
      case "name-asc":
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...productsToSort].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return productsToSort
    }
  }

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (Object.keys(selectedFilters).length === 0) return true
      return Object.entries(selectedFilters).some(([category, subcategories]) => {
        if (product.category === category) {
          return subcategories.length === 0 || subcategories.includes(product.subcategory || '')
        }
        return false
      })
    })

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return sortProducts(filtered)
  }, [selectedFilters, searchQuery, sortOrder])



  

  const navItems = [
    { name: "Productos", href: "/features/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/features/build-pc", icon: <Cpu className="mr-2 h-4 w-4 " /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/features/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]


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
        <div className="flex flex-col md:flex-row gap-8 transition-all duration-250">
          <aside className="w-full md:w-1/4">
            <h2 className="text-2xl font-bold mb-2 dark:text-white text-black mx-40 font-whyte transition-all duration-100">Categorías</h2>
            <div className="space-y-4 p-5 dark:bg-gray-800 bg-gray-200 border-blue-400 rounded-xl shadow-xl my-7 shadow-black/20 dark:shadow-cyan-500/20">
              {categories.map((category) => (
                <Collapsible
                  key={category.name}
                  open={openCategories.includes(category.name)}
                  onOpenChange={() => toggleCategory(category.name)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <span className="text-sm font-medium dark:text-white font-whyte1">{category.name}</span>
                    {category.subcategories && (
                      openCategories.includes(category.name) ? (
                        <ChevronDown className="h-4 w-4 dark:text-white font-whyte1" />
                      ) : (
                        <ChevronRight className="h-4 w-4 dark:text-white font-whyte1" />
                      )
                    )}
                  </CollapsibleTrigger>
                  {category.subcategories && (
                    <CollapsibleContent className="pl-4 mt-2 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <Checkbox
                            id={`${category.name}-${subcategory}`}
                            checked={selectedFilters[category.name]?.includes(subcategory)}
                            onCheckedChange={(checked) => handleFilterChange(category.name, subcategory, checked as boolean)}
                            className="bg-gray-400 dark:bg-gray-200"
                          />
                          <label
                            htmlFor={`${category.name}-${subcategory}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white font-whyte2"
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ))}
            </div>
          </aside>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white dark:bg-gray-700 rounded gray-500 dark:border-gray-600 dark:text-white border-blue-400 font-whyte transition-all duration-100 "
              />
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700 rounded gray-200 dark:rounded-xl-gray-600 border-blue-400 dark:text-white font-whyte1">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-gray-100 dark:bg-gray-700 rounded-md shadow-md dark:text-white border-blue-400 font-whyte1">
                  <SelectItem value="default" className="hover:bg-gray-700 dark:hover:bg-gray-600 font-whyte1">
                    Ordenar por
                  </SelectItem>
                  <SelectItem value="price-asc" className="hover:bg-gray-700 dark:hover:bg-gray-600 font-whyte1">
                    Precio: Menor a Mayor
                  </SelectItem>
                  <SelectItem value="price-desc" className="hover:bg-gray-700 dark:hover:bg-gray-600 font-whyte1">
                    Precio: Mayor a Menor
                  </SelectItem>
                  <SelectItem value="name-asc" className="hover:bg-gray-700 dark:hover:bg-gray-600 font-whyte1">
                    Nombre: A-Z
                  </SelectItem>
                  <SelectItem value="name-desc" className="hover:bg-gray-700 dark:hover:bg-gray-600 font-whyte1">
                    Nombre: Z-A
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="dark:bg-gray-800 flex flex-col rounded-xl bg-gray-200 shadow-xl shadow-black/20 dark:shadow-cyan-500/20 dark:border-gray-800 transition-all duration-250">
                  <CardContent className="p-4 flex-grow">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover mb-4 font-whyte1"
                    />
                    <h3 className="text-lg font-semibold mb-2 dark:text-white font-whyte1 transition-all duration-100">{product.name}</h3>
                    <p className="text-2xl font-bold text-[#0046BE] dark:text-[#4B9FFF] transition-all duration-100">
                      ${product.price.toLocaleString()}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link href={`../features/products-page/product/${product.id}`} className="w-full">
                      <Button className="w-full mt-auto rounded bg-blue-600 hover:bg-blue-900 text-white font-whyte transition-all duration-100">
                        Ver más
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
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