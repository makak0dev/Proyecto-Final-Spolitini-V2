import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import Image from 'next/image'
import { steps, components } from '@/components/organisms/Steps/page'; 

interface ComponentSelectorProps {
  currentStep: number
  handleComponentSelect: (component: any) => void
}

export default function ComponentSelector({ currentStep, handleComponentSelect }: ComponentSelectorProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState("default")
  const [searchQuery, setSearchQuery] = useState("")

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
    return filtered
  }, [currentStep, selectedBrand, searchQuery])

  const sortedComponents = useMemo(() => {
    switch (sortOrder) {
      case "price-asc":
        return [...filteredComponents].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...filteredComponents].sort((a, b) => b.price - a.price)
      case "name-asc":
        return [...filteredComponents].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...filteredComponents].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return filteredComponents
    }
  }, [filteredComponents, sortOrder])

  return (
    <div className="w-full md:w-3/4">
      <Card className="p-4 bg-blue-200 dark:bg-gray-800 rounded-xl border-blue-400 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{steps[currentStep].title}</h2>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700 rounded gray-200 dark:rounded-xl-gray-600 border-blue-400 dark:text-white">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100 dark:bg-gray-700 rounded-md shadow-md dark:text-white border-blue-400">
              <SelectItem value="default">Ordenar por</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 mb-4">
          <Button
            variant={selectedBrand === 'AMD' ? 'default' : 'outline'}
            onClick={() => setSelectedBrand(selectedBrand === 'AMD' ? null : 'AMD')}
            className="rounded bg-blue-200 text-blue-200 hover:bg-blue-400 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
          >
            AMD
          </Button>
          <Button
            variant={selectedBrand === 'Intel' ? 'default' : 'outline'}
            onClick={() => setSelectedBrand(selectedBrand === 'Intel' ? null : 'Intel')}
            className="rounded bg-blue-200 text-blue-200 hover:bg-blue-400 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
          >
            Intel
          </Button>
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 rounded gray-500 dark:border-gray-600 border-blue-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedComponents.map((component) => (
            <Card key={component.id} className="bg-white dark:bg-gray-700 rounded-xl rounded-xl-gray-200 dark:border-gray-600 border-blue-400">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <Image src={component.image} alt={component.name} width={100} height={100} className="mr-4" />
                  <div>
                    <h3 className="text-sm font-semibold mb-1 text-gray-800 dark:text-white">{component.name}</h3>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${component.price.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-green-500 mr-1">●</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Compatible</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-auto rounded bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleComponentSelect(component)}
                >
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}