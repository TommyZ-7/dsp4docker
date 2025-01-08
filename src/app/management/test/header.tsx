'use client'

import { useState } from 'react'
import { Bell, User, Menu } from 'lucide-react'
import { Button } from '@nextui-org/react'


export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-1 border-gray-200">
      <div className="flex items-center">

        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <div className="flex items-center">
        <Button variant="ghost" className="mr-2">
          <Bell className="h-5 w-5" />
        </Button>
        
      </div>
    </header>
  )
}

