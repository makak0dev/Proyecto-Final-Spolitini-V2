'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import Link from "next/link"
import Image from "next/image"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion, AnimatePresence } from "framer-motion"
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Search, ShoppingCart, User, Menu, MapPin, Phone, Mail, Globe, Moon, Sun, Facebook, Instagram, Twitter, Package, Cpu, Tag, HelpCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/atoms/sheet"
import { Badge } from "@/components/atoms/badge"
import { ScrollArea } from "@/components/atoms/scroll-area"

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    setDarkMode(savedDarkMode === 'true')

    const savedCartItems = localStorage.getItem('cartItems')
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems))
    }
  }, [])

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

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Message sent successfully!')
        reset()
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    }
    setIsSubmitting(false)
  }

  const navItems = [
    { name: "Productos", href: "/features/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/features/build-pc", icon: <Cpu className="mr-2 h-4 w-4 " /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/features/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]

  return (
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

      <main className="flex-grow container mx-auto px-4 py-8 transition-all duration-500">
        <h1 className="text-4xl font-bold mb-8 dark:text-white transition-all duration-300 font-whyte">¡Contactanos!</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="bg-blue-200 dark:bg-blue-900 p-12 rounded-lg shadow-2xl transition-all duration-300">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 font-whyte1">Nombre Completo</label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Nombre es necesario' })}
                    className="mt-1 block w-full bg-white dark:bg-gray-700 transition-all duration-300"
                    placeholder="Nombre"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-all duration-300">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 font-whyte1">Correo Eletronico</label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'El Email es necesario',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "El valor ingresado no coincide con el formato del correo electrónico"
                      }
                    })}
                    className="mt-1 block w-full bg-white dark:bg-gray-700 transition-all duration-300"
                    placeholder="Email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-all duration-300">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-base font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 font-whyte1">Problema</label>
                  <Input
                    id="subject"
                    {...register('subject', { required: 'El problema es necesario' })}
                    className="mt-1 block w-full bg-white dark:bg-gray-700 transition-all duration-300"
                    placeholder="Problema"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-all duration-300">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-base font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 font-whyte1">Mensaje</label>
                  <Textarea
                    id="message"
                    {...register('message', { required: 'Message es necesario' })}
                    className="mt-1 block w-full bg-white dark:bg-gray-700 transition-all duration-300"
                    rows={4}
                    placeholder="Mensaje"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-all duration-300">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-900 text-white transition-all duration-300">
                  {isSubmitting ? 'Enviando...' : 'Mandar Mensaje'}
                </Button>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 dark:text-white transition-all duration-300 font-whyte1">Se produjo un error.</h2>
                <p className="text-gray-600 dark:text-gray-400 transition-all duration-300 font-whyte2">Esta página no cargó bien Google Maps. Consulta la consola de JavaScript para obtener los detalles técnicos.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4  rounded-lg shadow-2xl transition-all duration-300">
            <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
              <MapPin size={24} />
            </div>
            <p className="text-center dark:text-white transition-all duration-300">Direccion: Corrientes 950, Buenos Aires</p>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl transition-all duration-300">
            <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
              <Phone size={24} />
            </div>
            <p className="text-center dark:text-white transition-all duration-300">Telefono: +54 911 355 987</p>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl transition-all duration-300">
            <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
              <Mail size={24} />
            </div>
            <p className="text-center dark:text-white transition-all duration-300">Email: info@nexusgames.com</p>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl transition-all duration-300">
            <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
              <Globe size={24} />
            </div>
            <p className="text-center dark:text-white transition-all duration-300">Pagina web: nexusgames.vercel.app</p>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </main>

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
  )
}

export default ContactPage