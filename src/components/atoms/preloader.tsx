import React from 'react'

const Preloader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative w-24 h-24">
        <svg className="animate-spin-slow w-full h-full" viewBox="25 25 50 50">
          <circle
            className="animate-dash stroke-current text-red-500"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  )
}

export default Preloader