"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/atoms/button"
import { Card, CardContent } from "@/components/atoms/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import { ShoppingCart, ArrowLeft, Search, User, Menu, Sun, Moon, Package, Cpu, Tag, HelpCircle, Check, Facebook, Instagram, Twitter, Minus, Plus, X } from "lucide-react"
import { Badge } from "@/components/atoms/badge"
import { cabin } from '@/lib/fonts'
import localFont from "next/font/local"
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
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Preloader from "@/components/atoms/preloader"
import { headers } from "next/headers"

const products = [
    {
      id: 1,
      name: "Notebook Gamer Acer Nitro 15.6\" FHD i5-12450H RTX3050 8GB 512GB SSD Win11",
      price: 1212720,
      image: "/placeholder.svg?height=400&width=400",
      thumbnails: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100"
      ],
      category: "Equipos y Notebooks",
      subcategory: "Notebooks",
      description: "Potente notebook gamer con procesador de última generación y gráficos dedicados para una experiencia de juego inmersiva.",
      specifications: {
        caracteristicasGenerales: {
          Color: "Negro",
          SistemaOperativo: "Windows 11 Home",
          TipoDeCpu: "Intel",
          TipoDeGpu: "NVIDIA GeForce",
          BateriaExtraible: "No",
          ModeloGpu: "GeForce RTX 3050",
          ModeloCpu: "Core i5 12450H",
          IdiomaSistemaOperativo: "Múltiples Idiomas",
          Tipo: "Notebook",
          MemoriaGpu: "4 gb",
          LectorDeHuellas: "No",
          FamiliaDelProcesador: "Intel Core i5"
        },
        conectividad: {
          PuertosHdmi: "1",
          PuertosMiniHdmi: "0",
          PuertoMiniDp: "0",
          PuertosUsb20TipoA: "0",
          PuertosUsb30TipoA: "0",
          PuertosUsb32TipoA: "3",
          PuertosUsb32TipoC: "1",
          Bluetooth: "Sí",
          Wifi: "Norma AX",
          PuertosEthernet: "Sí",
          TipoDeThunderbolt: "No incluye",
          CantidadDePuertosThunderbolt: "0"
        },
        dimensiones: {
          Peso: "2 kg",
          Ancho: "360 mm",
          Profundidad: "271 mm",
          Alto: "26 mm"
        },
        almacenamiento: {
          SlotM2: "Sí",
          CapacidadHd: "0 gb",
          TipoDeM2: "NVMe",
          CapacidadSolido: "512 gb",
          LectorDeMemorias: "No"
        },
        pantalla: {
          TamañoDeLaPantalla: "15.60 \"",
          TipoDeDisplay: "IPS",
          Resolucion: "1920x1080",
          Touch: "No",
          FrecuenciaDeActualizacion: "144 hz"
        },
        memoria: {
          Slot1RamDisponible: "No",
          Slot2RamDisponible: "Sí",
          RamEnElSlot1: "8 gb",
          GeneracionDeMemoria: "DDR4",
          FormatoDeMemoria: "SODIMM",
          RamMaxima: "32"
        },
        extras: {
          Lectora: "Sin óptico",
          IdiomaDelTeclado: "Inglés",
          IluminacionDelTeclado: "Sí",
          PadNumerico: "Sí",
          Webcam: "Sí",
          ColorDeLaIluminacionDelTeclado: "Rojo"
        }
      }
    },
    // ... add more products as needed
  ]
// ... (keep the existing products data)

export default function ProductDetail({ params }: { params: { id?: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedComponents, setSelectedComponents] = useState({})

  const [selectedImage, setSelectedImage] = useState("")


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

    if (params.id) {
      // Simulate API call
      setTimeout(() => {
        const productData = products.find(p => p.id === parseInt(params.id))
        setProduct(productData || null)
        setSelectedImage(productData?.image || "")
        setLoading(false)
      }, 3000) // 3 second delay to show preloader
    } else {
      setLoading(false)
    }
  }, [params.id])



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }


  const navItems = [
    { name: "Productos", href: "/features/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/features/build-pc", icon: <Cpu className="mr-2 h-4 w-4" /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/features/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]

  const addToCart = () => {
    if (product) {
      const newCartItems = [...cartItems, { ...product, quantity: 1 }]
      setCartItems(newCartItems)
      localStorage.setItem('cartItems', JSON.stringify(newCartItems))
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

  if (!product && !loading) {
    return (
      
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-3xl mb-4 font-whyte1">Producto no encontrado</p>
        <Link href="../../products-page">
          <Button className="bg-blue-600 hover:bg-blue-900 text-white font-whyte font-bold py-5 px-12 rounded">
            Volver a productos
          </Button>
        </Link>
      </div>
    )
  }

  if (loading) {
    return <Preloader />
  }
  

  return (
<html>
    <body>
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-800 dark:to-gray-900 text-white">
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
                      <Button variant="ghost" className="hover:bg-[#3B82F6] rounded-xl font-whyte dark:hover:bg-gray-700 px-2 py-1">
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
                    className="hidden md:flex hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 font-whyte"
                    onClick={() => {/* Add sign-in logic */}}
                  >
                    <User className="h-4 w-4" />
                    <span className="ml-1 hidden xl:inline">Mi Cuenta</span>
                  </Button>
                </SignedOut>
              </ClerkProvider>
              <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 font-whyte">
          <ShoppingCart className="h-4 w-4" />
          <span className="ml-1 hidden xl:inline">Carrito</span>
          <Badge className="absolute -top-2 -right-2 bg-red-500">{cartItems.length}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-800 dark:border-gray-700">
      <SheetHeader>
          <SheetTitle className="text-center font-whyte">Carrito de Compras</SheetTitle>
          <SheetDescription className="font-bold text-md font-whyte">
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
                  onClick={() => removeCartItem(index)}
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
              <Button variant="ghost" onClick={toggleDarkMode} className="hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1 ">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="lg:hidden hover:bg-[#3B82F6] dark:hover:bg-gray-700 rounded-xl px-2 py-1">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6">
                    <ul className="space-y-4">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="flex items-center py-2 text-lg hover:text-[#3B82F6] dark:hover:text-gray-300"
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
                          className="w-full justify-start py-2 text-lg hover:text-[#3B82F6] dark:hover:text-gray-300 font-whyte"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            // Add navigation to account page
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

      <main className="flex-grow container-2xl px-12 py-8  bg-gray-200 dark:bg-gradient-to-t from-gray-800 via-gray-600 to-slate-700 mx-32 my-32 rounded-3xl dark:border-blue-400">
        <div className="flex items-center mb-4">
          <Link href="/products-page" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft className="mr-2" />
            <span className="hidden sm:inline font-whyte">Volver a productos</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <div className="flex justify-center space-x-4">
                {product.thumbnails.map((thumb: string, index: number) => (
                  <Image
                    key={index}
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded cursor-pointer"
                    onClick={() => setSelectedImage(thumb)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-whyte text-gray-900 dark:text-white mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">${product.price.toLocaleString()}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-whyte2">{product.description}</p>
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-whyte2">Categoría:</span>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 font-whyte1">{product.category}</span>
              </div>
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-whyte2">Subcategoría:</span>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 font-whyte1">{product.subcategory}</span>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded font-whyte1"
                    onClick={addToCart}
              >
                <ShoppingCart className="mr-2" />
                Añadir al carrito
              </Button>
              <div className="mt-4 flex items-center text-green-500">
                <Check className="mr-2" />
                <span>Stock disponible</span>
              </div>
              <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                <Package className="mr-2" />
                <span>Envíos a todo el país</span>
              </div>
            </div>
          </div>
        )}
        <Tabs defaultValue="specifications" className="mt-8">
          <TabsList className="relative">
            <TabsTrigger value="specifications" className="relative z-10">Especificaciones</TabsTrigger>
            <TabsTrigger value="questions" className="relative z-10">Preguntas</TabsTrigger>
            <TabsTrigger value="performance" className="relative z-10">Rendimiento</TabsTrigger>
            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300" style={{
              width: '33.33%',
              transform: 'translateX(0%)'
            }} />
          </TabsList>
          <TabsContent value="specifications">
            <Card className="border-blue-400 dark:border-gray-400">
              <CardContent className="pt-">
                {product && Object.entries(product.specifications).map(([section, details]: [string, any]) => (
                  <div key={section} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white uppercase">{section}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(details).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 ml-8">
                          <span className="text-sm text-gray-600  dark:text-gray-400 ml-4">{key}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-4">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="questions">
            <Card>
              <CardContent>
                <p>Contenido de preguntas aquí...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardContent>
                <p>Contenido de rendimiento aquí...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>


      <footer className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-900 dark:to-gray-950 text-white">
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
    </div>
  </body>
 </html>
)
}