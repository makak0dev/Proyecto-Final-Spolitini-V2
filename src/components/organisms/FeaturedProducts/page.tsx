import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const featuredProducts = [
  { id: 1, name: "Notebook Gamer", price: 599999, image: "/placeholder.svg?height=300&width=400" },
  { id: 2, name: "PC Gamer", price: 799999, image: "/placeholder.svg?height=300&width=400" },
  { id: 3, name: "Monitor Gaming", price: 199999, image: "/placeholder.svg?height=300&width=400" },
  { id: 4, name: "Teclado Mecánico", price: 49999, image: "/placeholder.svg?height=300&width=400" },
]

const productSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
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

export default function FeaturedProducts() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
      <Slider {...productSliderSettings}>
        {featuredProducts.map((product) => (
          <div key={product.id} className="px-2">
            <Card>
              <CardContent className="p-4">
                <Image src={product.image} alt={product.name} width={400} height={300} className="w-full mb-4" />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-blue-600">${product.price.toLocaleString()}</p>
                <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </section>
  )
}