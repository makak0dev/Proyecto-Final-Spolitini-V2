import React from 'react'
import { Button } from '@/components/atoms/button'

const categories = [
  { name: "Notebooks", image: "/placeholder.svg?height=100&width=100" },
  { name: "Placas de Video", image: "/placeholder.svg?height=100&width=100" },
  { name: "Procesadores", image: "/placeholder.svg?height=100&width=100" },
  { name: "Monitores", image: "/placeholder.svg?height=100&width=100" },
]

export default function PopularCategories() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Categorías Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Button key={category.name} variant="outline" className="h-24 text-lg dark:text-white dark:border-gray-600">
            {category.name}
          </Button>
        ))}
      </div>
    </section>
  )
}