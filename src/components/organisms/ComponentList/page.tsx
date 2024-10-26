import React from 'react'
import { Card } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { Check } from 'lucide-react'
import { steps, components } from '@/components/organisms/Steps/page'; 

interface ComponentListProps {
  currentStep: number
  selectedComponents: Record<string, any>
  setCurrentStep: (step: number) => void
  totalPrice: number
  addToCart: () => void
}

export default function ComponentList({
  currentStep,
  selectedComponents,
  setCurrentStep,
  totalPrice,
  addToCart
}: ComponentListProps) {
  return (
    <div className="w-full md:w-1/4">
      <Card className="p-4 bg-blue-200 dark:bg-gray-800 border rounded-xl border-blue-400 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Componentes</h2>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={step.id} className={`flex items-center p-2 rounded ${index === currentStep ? 'bg-blue-400 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300'}`}>
              <div className="w-5 h-5 mr-2 border border-gray-800 dark:border-gray-600 rounded flex items-center justify-center">
                {selectedComponents[step.id] && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>
              <span>{step.title}</span>
              {selectedComponents[step.id] && (
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedComponents[step.id].name}
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Total: ${totalPrice.toLocaleString()}
          </p>
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Volver atrás
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Saltar paso
            </Button>
          </div>
          {Object.keys(selectedComponents).length === steps.length && (
            <Button
              onClick={addToCart}
              className="w-full mt-4 rounded bg-green-600 hover:bg-green-700 text-white"
            >
              Agregar al carrito
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}