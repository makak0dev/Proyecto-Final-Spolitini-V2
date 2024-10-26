import { useState, useMemo } from 'react'
import { steps, components } from '@/components/organisms/Steps/page';

export function useBuildYourPC() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedComponents, setSelectedComponents] = useState<Record<string, any>>({})

  const handleComponentSelect = (component: any) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [steps[currentStep].id]: component,
    }))
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0)
  }, [selectedComponents])

  return {
    currentStep,
    selectedComponents,
    handleComponentSelect,
    setCurrentStep,
    totalPrice,
  }
}