"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Bed,
  Bath,
  Square,
  Car,
  TrendingUp,
  Shield,
  Award,
  Users,
  Building,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import Navbar from "@/components/navbar"
import type { RentalProperty as RentalPropertyType } from "./rentals/page"

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<RentalPropertyType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://asp-api.propfusion.io/properties/get_properties_for_main_site?listing_type=RENT&size=12&status=ACTIVE"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch rental properties")
        }
        const data = await response.json()
        setFeaturedProperties(data.properties.slice(0, 3))
      } catch (error) {
        console.error("Error fetching featured properties:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProperties()
  }, [])

  const services = [
    {
      title: "Property Sales",
      description: "Exclusive luxury properties with personalized service and expert market knowledge.",
      icon: Building,
      href: "/services/property-sales",
      features: ["Premium Listings", "Market Analysis", "Negotiation Support"],
    },
    {
      title: "Investment Advisory",
      description: "Strategic investment guidance for maximizing returns in Dubai's real estate market.",
      icon: TrendingUp,
      href: "/services/investment-advisory",
      features: ["Portfolio Analysis", "ROI Optimization", "Market Insights"],
    },
    {
      title: "Property Management",
      description: "Comprehensive property management services for landlords and investors.",
      icon: Shield,
      href: "/services/property-management",
      features: ["Tenant Management", "Maintenance", "Financial Reporting"],
    },
    {
      title: "Market Analysis",
      description: "In-depth market research and analytics for informed real estate decisions.",
      icon: BarChart3,
      href: "/services/market-analysis",
      features: ["Trend Analysis", "Price Forecasting", "Investment Reports"],
    },
  ]

  const stats = [
    { number: "500+", label: "Properties Sold", icon: Building },
    { number: "AED 2B+", label: "Total Sales Value", icon: TrendingUp },
    { number: "98%", label: "Client Satisfaction", icon: Award },
    { number: "15+", label: "Years Experience", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28">
        <div className="absolute inset-0 z-0">
          <Image src="/hero.jpeg" alt="Luxury Real Estate" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm sm:text-base mb-4 sm:mb-6">
              Premium Real Estate Experts
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-xl text-white">
            Invest in Dubai's Fastest Growing Real Estate Market
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-8 sm:mb-12 text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Explore Off-Plan Projects, Ready Villas, and Exclusive Investment Deals Across Dubai's Prime Locations
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/rentals">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10 w-full sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-[#0A253A] text-white px-4 py-2 text-sm mb-4">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Premium Real Estate
              <span className="block text-[#0A253A]">Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive real estate services tailored for discerning clients seeking excellence in Dubai's luxury
              market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm h-full">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="mt-6 bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] rounded-full group-hover:shadow-lg transition-all duration-300 w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-[#0A253A] text-white px-4 py-2 text-sm mb-4">Featured Properties</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Exclusive Luxury
              <span className="block text-[#0A253A]">Collections</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked premium properties in Dubai's most sought-after locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="border-0 bg-white">
                    <div className="relative h-64 sm:h-72 bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-6">
                      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-6"></div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 w-1/2 bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : featuredProperties
                  .filter((property) => property && property.id)
                  .slice(0, 3)
                  .map((property) => (
                    <Card
                      key={property.id}
                      className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 bg-white"
                    >
                      <div className="relative h-64 sm:h-72 overflow-hidden">
                        <Image
                          src={property.photos?.[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-blue-600 text-white">Rent</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">
                            {property.title}
                          </h3>
                          <p className="text-gray-600 flex items-center truncate">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.location.sub_community}, {property.location.community}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Bed className="h-4 w-4 mr-2" />
                            {property.bedRooms === 0 ? "Studio" : `${property.bedRooms} Beds`}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Bath className="h-4 w-4 mr-2" />
                            {property.bathrooms} Baths
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Square className="h-4 w-4 mr-2" />
                            {property.size.toLocaleString()} sqft
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Car className="h-4 w-4 mr-2" />
                            {property.parking} Parking
                          </div>
                        </div> 

                        <div className="flex items-center justify-between">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                            AED {property.price.toLocaleString()}
                            <span className="text-base font-normal">/{property.priceType.toLowerCase()}</span>
                          </div>
                          <Link href={`/rentals/${property.id}`}>
                            <Button className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] rounded-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] px-8 py-4 text-lg rounded-full"
              >
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0A253A] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Find Your
            <span className="block">Dream Property?</span>
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-blue-100 leading-relaxed">
            Connect with our expert team for personalized service and exclusive access to Dubai's finest properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#F0C75A] text-[#F0C75A] hover:bg-gradient-to-r hover:from-[#F0C75A] hover:via-[#D29F53] hover:to-[#8F6125] hover:text-[#0A253A] px-8 py-4 text-lg rounded-full w-full sm:w-auto bg-transparent transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Market Report
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#0A253A] text-white px-4 py-2 text-sm mb-4">Follow Us</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Connect with Us on Instagram
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with our latest properties, real estate news, and exclusive offers.
          </p>
          <div className="flex justify-center my-8">
            <a
              href="https://www.instagram.com/aspalest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9A3.75 3.75 0 0120.25 7.5v9a3.75 3.75 0 01-3.75 3.75h-9A3.75 3.75 0 013.75 16.5v-9A3.75 3.75 0 017.5 3.75z" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.25" cy="6.75" r="0.75" />
              </svg>
              Follow us on Instagram @aspalest
            </a>
          </div>
          <div className="flex justify-center my-8">
            <iframe
              src="https://www.instagram.com/aspalest/embed/"
              width="400"
              height="480"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              className="rounded-xl shadow-lg border border-gray-200"
              title="Instagram Feed"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <Image src="/logo.png" alt="Ayaz Shahzad Properties Real Estate" width={150} height={50} className="h-12 w-auto mb-6" />
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Dubai's premier real estate consultancy, specializing in luxury properties and investment opportunities
                across the emirate's most prestigious locations.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 rounded-full">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +971 50 123 4567
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@investmentexperts.ae
                </p>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  Dubai International Financial Centre, Dubai, UAE
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ayaz Shahzad Properties Real Estate. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
