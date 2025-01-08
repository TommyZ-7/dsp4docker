
"use client"
import Link from 'next/link'
import { Home, BarChart2, Users, Settings } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: Home, label: 'home', href: '/management/test' },
  { icon: BarChart2, label: '問題登録', href: '/management/test/import' },
  { icon: Users, label: '問題編集', href: '/management/test/editor' },
  { icon: Users, label: '教員登録', href: '/management/test/teacherRegister' },
  { icon: Settings, label: 'データベース出力', href: '/management/test/export' },
  { icon: Settings, label: 'データベース入力', href: '/management/test/dbimport' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`flex flex-col  bg-gray-800 ${isOpen ? 'w-12' : 'w-64'}`}>
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl uppercase text-indigo-500">{isOpen ? "ご" : "ごいりょくん"}</h1>
        
      </div>
      <ul className="flex flex-col py-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex flex-row items-center h-12 transform  transition-transform ease-in duration-200 text-gray-500 hover:text-gray-200">
              <span className={`inline-flex items-center justify-center h-12 w-12 text-lg `}>
                <item.icon className="h-5 w-5" />
              </span>
              {isOpen ? null : <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setIsOpen(!isOpen)} className="text-white">
        C
      </button>
    </div>
  )
}

