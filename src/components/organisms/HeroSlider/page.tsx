import React from 'react'
import Image from 'next/image'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed:  3000,
}

export default function HeroSlider() {
  return (
    <section className="mb-12">
      <Slider {...sliderSettings}>
        <div>
          <Image src="/placeholder.svg?height=400&width=1200" alt="Promoción AMD" width={1200} height={400} className="w-full" />
        </div>
        <div>
          <Image src="/placeholder.svg?height=400&width=1200" alt="Oferta Especial" width={1200} height={400} className="w-full" />
        </div>
        <div>
          <Image src="/placeholder.svg?height=400&width=1200" alt="Nuevos Productos" width={1200} height={400} className="w-full" />
        </div>
      </Slider>
    </section>
  )
}