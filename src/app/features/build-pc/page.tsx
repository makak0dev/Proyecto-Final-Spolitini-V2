"use client"

import { useState, useEffect, useMemo} from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { ScrollArea } from "@/components/atoms/scroll-area"

import { Search, ShoppingCart, User, Menu, Sun, Moon, ChevronDown, Facebook, Instagram, Twitter, Github, Mail, Check, HelpCircle, Tag, Cpu, Package, Plus, Minus, X } from "lucide-react"
import { Badge } from "@/components/atoms/badge"

import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion"

import { metadata } from "Metadata";
import Preloader from "@/components/atoms/preloader"


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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/atoms/dialog"

const steps = [
  { id: 'processor', title: 'Procesador' },
  { id: 'videoCard', title: 'Placa de Video' },
  { id: 'motherboard', title: 'Placa Madre' },
  { id: 'cooler', title: 'Cooler' },
  { id: 'memory', title: 'Memorias' },
  { id: 'storage', title: 'Almacenamiento' },
  { id: 'powerSupply', title: 'Fuente' },
  { id: 'case', title: 'Gabinete' },
  { id: 'monitor', title: 'Monitor' },
  { id: 'peripherals', title: 'Periféricos' },





]

const components = {
  processor: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  videoCard: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  motherboard: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  cooler: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  memory: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  storage: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  powerSupply: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  case: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  monitor: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  peripherals: [
    { id: 1, name: "Procesador Intel Core i9-11900K", price: 543150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 2, name: "Procesador CPU AMD Ryzen 9 7950X3D Raphael Zen4 AM5", price: 898990, image: "/images/1695397713_amd-1.jpg", brand: "AMD", compatible: true },
    { id: 3, name: "Procesador Intel Core i7-11700K", price: 423150, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 4, name: "Procesador AMD Athlon 3000G 3.5GHz + Radeon Vega 3 AM4X", price: 55000, image: "/images/compragamer_Imganen_general_16481_Procesador_AMD_Athlon_3000G_3.jpg", brand: "AMD", compatible: true },
    { id: 5, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 6, name: "Procesador Amd Ryzen 7 5800X 8/16 4.7Ghz S/G S/Cooler Zen3", price: 331999, image: "/images/1697727464_ryzen.jpg", brand: "AMD", compatible: true },
    { id: 7, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 8, name: "Procesador AMD Ryzen 9 7900X 12/24 5.6Ghz Raphael ZEN4 AM5", price: 549990, image: "/images/1664298759_7900x.jpg", brand: "AMD", compatible: true },
    { id: 9, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/images/1664298759_7900x.webpheight=100&width=100", brand: "Intel", compatible: true },
    { id: 10, name: "Procesador AMD Ryzen 5 7600X 5.3GHz Turbo AM5 - No incluye Cooler - C/VIDEO", price: 315500, image: "/images/compragamer_Imganen_general_34349_Procesador_AMD_Ryzen_5_7600X_5.3GHz_Turbo_AM5_-_No_incluye_Cooler_-_C_VIDEO_cf0124c7-grn.jpg", brand: "AMD", compatible: true },
    { id: 11, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 12, name: "Procesador AMD Ryzen 7 8700G 5.1GHz AM5 ", price: 344500, image: "/images/compragamer_Imganen_general_35911_Procesador_AMD_Ryzen_7_7700_5.3GHz_Turbo_AM5_b7346c3a-grn.jpg", brand: "AMD", compatible: true },
    { id: 13, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 14, name: "Procesador AMD Ryzen 3 4100 + Wraith Stealth Cooler AM4", price: 80000, image: "/images/compragamer_Imganen_general_32956_Procesador_AMD_Ryzen_3_4100___Wraith_Stealth_Cooler_AM4_5b8b5ef2-grn.jpg", brand: "AMD", compatible: true },
    { id: 15, name: "Procesador AMD Ryzen 7 5800X", price: 439500, image: "/placeholder.svg?height=100&width=100", brand: "Intel", compatible: true },
    { id: 16, name: "Procesador AMD Ryzen 5 PRO 4650G 4.2GHz Turbo + Wraith Stealth Cooler OEM", price: 135000, image: "/images/compragamer_Imganen_general_21462_Procesador_AMD_Ryzen_5_PRO_4650G_4.2GHz_Turbo___Wraith_Stealth_Cooler_OEM_52f8e46a-grn.jpg", brand: "AMD", compatible: true },
  ],
  // ... (other component categories remain the same)
}

export default function BuildYourPCPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [product, setProduct] = useState<any>(null)

  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedComponents, setSelectedComponents] = useState({})
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [sortOrder, setSortOrder] = useState("default")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()



  const [accountModalOpen, setAccountModalOpen] = useState(false)

  
    const [selectedImage, setSelectedImage] = useState("")
  
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

    
  
    interface CartItem {
      id: number
      name: string
      price: number
      quantity: number
      image: string
    }

    interface Product {
      id: number
      name: string
      price: number
      image: string
      category: string
      subcategory?: string
    }
    


  const navItems = [
    { name: "Productos", href: "/features/products-page", icon: <Package className="mr-2 h-4 w-4" /> },
    { name: "Armá tu PC", href: "/features/build-pc", icon: <Cpu className="mr-2 h-4 w-4 " /> },
    { name: "Ofertas", href: "#", icon: <Tag className="mr-2 h-4 w-4" /> },
    { name: "Ayuda", href: "/features/ayuda", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]

  const sortComponents = (components) => {
    switch (sortOrder) {
      case "price-asc":
        return [...components].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...components].sort((a, b) => b.price - a.price)
      case "name-asc":
        return [...components].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...components].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return components
    }
  }

  const filteredComponents = useMemo(() => {
    let filtered = components[steps[currentStep].id] || []
    
    if (selectedBrand) {
      filtered = filtered.filter(component => component.brand === selectedBrand)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return sortComponents(filtered)
  }, [currentStep, selectedBrand, searchQuery, sortOrder])




  const handleComponentSelect = (component) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [steps[currentStep].id]: component,
    }))
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowSummary(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setSelectedComponents((prev) => {
        const newComponents = { ...prev }
        delete newComponents[steps[currentStep].id]
        return newComponents
      })
    }
    setShowSummary(false)
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

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

  const renderSummary = () => {
    return (
      <Card className="p-4 bg-blue-200 dark:bg-gray-800 border rounded-xl border-blue-400 dark:border-gray-700  transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white font-whyte">Resumen de tu PC</h2>
        {Object.entries(selectedComponents).map(([key, component]) => (
          <div key={key} className="mb-4 flex items-center">
            <Image src={component.image} alt={component.name} width={50} height={50} className="mr-4" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white font-whyte1">{component.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-whyte1">${component.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xl font-semibold text-gray-800 dark:text-white font-whyte1">
            Total: ${totalPrice.toLocaleString()}
          </p>
          <div className="flex justify-between mt-4">
            <Button
              onClick={handleBack}
              className="rounded bg-blue-600 hover:bg-blue-900 text-white font-whyte1"
            >
              Volver atrás
            </Button>
            <Button
              onClick={addToCart}
              className="rounded bg-green-600 hover:bg-green-700 text-white font-whyte1"
            >
              Agregar al carrito
            </Button>
            <Button
              onClick={() => setShowSummary(false)}
              className="rounded bg-blue-600 hover:bg-blue-900 text-white font-whyte1"
            >
              Saltar paso
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  const renderComponentSelection = () => {
    return (
      <Card className="p-4 bg-blue-200 dark:bg-gray-800 rounded-xl border-blue-400 dark:border-gray-700  transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white font-whyte">{steps[currentStep].title}</h2>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700 rounded gray-200 dark:rounded-xl-gray-600  border-blue-400 dark:text-white font-whyte1">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent className="bg-gray-100 dark:bg-gray-700 rounded-md shadow-md  dark:text-white  border-blue-400 font-whyte1">
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
      <div className="flex gap-2 mb-4">
        <Button
          variant={selectedBrand === 'AMD' ? 'default' : 'outline'}
          onClick={() => setSelectedBrand(selectedBrand === 'AMD' ? null : 'AMD')}
          className="rounded bg-blue-200  text-blue-200 hover:bg-blue-400 dark:rounded bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 font-whyte1"
        >
          AMD
        </Button>
        <Button
          variant={selectedBrand === 'Intel' ? 'default' : 'outline'}
          onClick={() => setSelectedBrand(selectedBrand === 'Intel' ? null : 'Intel')}
          className="rounded bg-blue-200  text-blue-200 hover:bg-blue-400 dark:rounded bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 font-whyte1"
        >
          INTEL
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-gray-700 rounded gray-500 dark:border-gray-600 dark:text-white border-blue-400 font-whyte"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredComponents.map((component) => (
          <Card key={component.id} className="bg-white dark:bg-gray-700 rounded-xl rounded-xl-gray-200 dark:border-gray-600 border-blue-400">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <Image src={component.image} alt={component.name} width={100} height={100} className="mr-4 rounded-xl bg:border-gray-200" />
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-gray-800 dark:text-white font-whyte1">{component.name}</h3>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 font-whyte1">${component.price.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-green-500 mr-1">●</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-whyte">Compatible</span>
                  </div>
                </div>
              </div>
              <Button
                className="mt-auto rounded	bg-blue-600 hover:bg-blue-900 text-white font-whyte" 
                onClick={() => handleComponentSelect(component)}
              >
                Seleccionar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
    )
  }


  if (loading) {
    return <Preloader />
  }
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
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white font-whyte transition-all duration-300">Armá tu PC</h1>
        <div className="flex flex-col md:flex-row mb-8 gap-4">
          <div className="w-full md:w-1/4">
            <Card className="p-4 bg-blue-200 dark:bg-gray-800 border rounded-xl border-blue-400 dark:border-gray-700 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white font-whyte transition-all duration-300">Componentes</h2>
              <ul className="space-y-3 font-whyte1">
                {steps.map((step, index) => (
                  <li key={step.id} className={`flex items-center p-2 rounded transition-all duration-300 ${index === currentStep ? 'font-whyte1 bg-blue-400 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300'}`}>
                    <div className="w-5 h-5 mr-2 border border-gray-800 dark:border-gray-600 rounded flex items-center justify-center transition-all duration-300">
                      {selectedComponents[step.id] && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 font-whyte1" />}
                    </div>
                    <span>{step.title}</span>
                  </li>
                ))}
              </ul>
              {selectedComponents[steps[currentStep].id] && (
                <div className="mt-4 p-2 bg-white dark:bg-gray-700 rounded-lg transition-all duration-300">
                  <Image
                    src={selectedComponents[steps[currentStep].id].image}
                    alt={selectedComponents[steps[currentStep].id].name}
                    width={100}
                    height={100}
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm font-semibold text-center text-gray-800 dark:text-white font-whyte1 transition-all duration-300">
                    {selectedComponents[steps[currentStep].id].name}
                  </p>
                  <p className="text-sm text-center text-blue-600 dark:text-blue-400 font-whyte1 transition-all duration-300">
                    ${selectedComponents[steps[currentStep].id].price.toLocaleString()}
                  </p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-300">
                <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white font-whyte1 transition-all duration-300">
                  Total: ${Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0).toLocaleString()}
                </p>
                <div className="flex justify-between">
                  <Button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="rounded bg-blue-600 hover:bg-blue-900 text-white font-whyte1 transition-all duration-300"
                  >
                    Volver atrás
                  </Button>
                  <Button
                    onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="rounded bg-blue-600 hover:bg-blue-900 text-white font-whyte1 transition-all duration-300"
                  >
                    Saltar paso
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full md:w-3/4">
            {showSummary ? renderSummary() : renderComponentSelection()}
          </div>
        </div>
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
              <ul className="space-y-2  text-center">
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