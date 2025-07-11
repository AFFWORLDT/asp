"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    // { name: "Home", href: "/" },
    { name: "Buy", href: "/properties" },
    { name: "Rent", href: "/rentals" },
    { name: "Projects", href: "/projects" },
    { name: "Team", href: "/team" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a253a] border-b border-gray-200/20"
          : "bg-[#0a253a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 sm:h-16 lg:h-16`}>
          {/* Mobile Logo - centered, only visible on mobile */}
          <div className="flex-1 flex justify-center items-center lg:hidden">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Ayaz Shahzad Properties Real Estate"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>
          {/* Desktop Logo - hidden on mobile */}
          <Link href="/" className="flex-shrink-0 group hidden lg:block">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Ayaz Shahzad Properties Real Estate"
                width={160}
                height={55}
                className="h-12 sm:h-14 lg:h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-all duration-300 group ${
                  isScrolled ? "text-gray-100 hover:text-white" : "text-white hover:text-gray-100"
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+971521007734"
              className={`flex items-center space-x-2 transition-colors duration-300 ${
                isScrolled ? "text-gray-200 hover:text-white" : "text-white hover:text-gray-100"
              }`}
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+971521007734</span>
            </a>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${
                isScrolled
                  ? "text-gray-100 hover:text-white hover:bg-gray-100/10"
                  : "text-white hover:text-gray-100 hover:bg-white/10"
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" stroke="#FFD700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/20">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-3 border-t border-gray-200/30 mt-3">
              <a
                href="tel:+971521007734"
                className="flex items-center space-x-2 text-gray-600 mb-3 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">+971521007734</span>
              </a>
              <Link href="/contact" className="w-full">
                <Button className="w-full bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] py-2 rounded-full transition-all duration-300 shadow-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
