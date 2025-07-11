"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Heart,
  Share2,
  Phone,
  Calendar,
  Eye,
  Loader2,
  MessageCircle,
  Mail,
  CalendarDays,
  Home,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Property {
  id: number
  propertyId: string
  title: string
  description: string
  photos: string[]
  listingType: string
  property_type: string
  location: {
    city: string
    community: string
    sub_community: string
    latitude: number
    longitude: number
  }
  price: number
  size: number
  bedRooms: number
  bathrooms: string
  parking: number
  buildYear: string
  completionStatus: string
  developer?: {
    name?: string
    logoUrl?: string
  }
  agent?: {
    name?: string
    email?: string
    phone?: string
    avatar?: string
  }
  amenities: string[]
  videoLink?: string
}

interface ApiResponse {
  totalProperties: number
  properties: Property[]
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalProperties, setTotalProperties] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [viewingDate, setViewingDate] = useState("")
  const [viewingTime, setViewingTime] = useState("")
  const [viewerName, setViewerName] = useState("")
  const [viewerPhone, setViewerPhone] = useState("")
  const [viewerEmail, setViewerEmail] = useState("")
  const [filterModalOpen, setFilterModalOpen] = useState(false)

  const observer = useRef<IntersectionObserver>()

  const loadMoreProperties = () => {
    if (!loadingMore && hasMore) {
      fetchProperties(false)
    }
  }

  const lastPropertyElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProperties()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, loadingMore, hasMore, observer],
  )

  const PROPERTIES_PER_PAGE = 12

  useEffect(() => {
    fetchProperties(true)
  }, [])

  // Reset and refetch when filters change
  useEffect(() => {
    if (currentPage > 1) {
      setProperties([])
      setCurrentPage(1)
      setHasMore(true)
      fetchProperties(true)
    }
  }, [searchQuery, priceRange, propertyType, bedrooms, sortBy])

  const fetchProperties = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true)
        setError(null)
      } else {
        setLoadingMore(true)
      }

      const page = reset ? 1 : currentPage
      const offset = (page - 1) * PROPERTIES_PER_PAGE

      // Build query parameters
      const params = new URLSearchParams({
        size: PROPERTIES_PER_PAGE.toString(),
        offset: offset.toString(),
        status: "ACTIVE",
        listing_type: "SELL",
      })

      // Add filters if they exist
      if (propertyType) params.append("property_type", propertyType)
      if (bedrooms) params.append("bedrooms", bedrooms)
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(
        `https://asp-api.propfusion.io/properties/get_properties_for_main_site?${params.toString()}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch properties")
      }

      const data: ApiResponse = await response.json()

      if (reset) {
        setProperties(data.properties)
        setTotalProperties(data.totalProperties)
      } else {
        setProperties((prev) => [...prev, ...data.properties])
      }

      // Check if there are more properties to load
      const totalLoaded = reset ? data.properties.length : properties.length + data.properties.length
      setHasMore(totalLoaded < data.totalProperties && data.properties.length === PROPERTIES_PER_PAGE)

      if (!reset) {
        setCurrentPage((prev) => prev + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`
    }
    return `AED ${price.toLocaleString()}`
  }

  const formatArea = (size: number) => {
    return `${size.toLocaleString()} sq ft`
  }

  const getCompletionBadge = (status: string) => {
    switch (status) {
      case "off_plan_primary":
        return { text: "Off Plan", color: "bg-orange-100 text-orange-800" }
      case "ready":
        return { text: "Ready", color: "bg-green-100 text-green-800" }
      default:
        return { text: "Available", color: "bg-blue-100 text-blue-800" }
    }
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    const message = encodeURIComponent("Hi, I'm interested in your property listing. Can you provide more details?")
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  const handleEmail = (email: string, propertyTitle: string) => {
    const subject = encodeURIComponent(`Inquiry about: ${propertyTitle}`)
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the property: ${propertyTitle}\n\nPlease provide more details.\n\nThank you.`,
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self")
  }

  const handleScheduleViewing = (property: Property) => {
    setSelectedProperty(property)
  }

  const submitViewingRequest = () => {
    if (!selectedProperty || !viewingDate || !viewingTime || !viewerName || !viewerPhone) {
      alert("Please fill in all required fields")
      return
    }

    const subject = encodeURIComponent(`Property Viewing Request: ${selectedProperty.title}`)
    const body = encodeURIComponent(
      `Hi,\n\nI would like to schedule a viewing for the property: ${selectedProperty.title}\n\nPreferred Date: ${viewingDate}\nPreferred Time: ${viewingTime}\n\nContact Details:\nName: ${viewerName}\nPhone: ${viewerPhone}\nEmail: ${viewerEmail}\n\nPlease confirm the viewing appointment.\n\nThank you.`,
    )

    if (selectedProperty.agent?.email) {
      window.open(`mailto:${selectedProperty.agent.email}?subject=${subject}&body=${body}`, "_self")
    }

    // Reset form
    setSelectedProperty(null)
    setViewingDate("")
    setViewingTime("")
    setViewerName("")
    setViewerPhone("")
    setViewerEmail("")
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      !searchQuery ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.community.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !propertyType || property.property_type === propertyType
    const matchesBedrooms = !bedrooms || property.bedRooms.toString() === bedrooms

    let matchesPrice = true
    if (priceRange) {
      const price = property.price
      switch (priceRange) {
        case "1-2m":
          matchesPrice = price >= 1000000 && price <= 2000000
          break
        case "2-5m":
          matchesPrice = price >= 2000000 && price <= 5000000
          break
        case "5-10m":
          matchesPrice = price >= 5000000 && price <= 10000000
          break
        case "10m+":
          matchesPrice = price >= 10000000
          break
      }
    }

    return matchesSearch && matchesType && matchesBedrooms && matchesPrice
  })

  // Structured Data for Properties Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Properties for Sale in Dubai",
    description:
      "Browse premium properties for sale in Dubai including apartments, villas, penthouses, and townhouses in Dubai Marina, Downtown Dubai, Palm Jumeirah, and other prestigious locations.",
    url: "https://investmentexperts.ae/properties",
    numberOfItems: totalProperties,
    itemListElement: properties.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: property.title,
        description: property.description,
        image: property.photos?.[0] || "/placeholder.svg",
        url: `https://investmentexperts.ae/properties/${property.id}`,
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: "AED",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "RealEstateAgent",
            name: "Ayaz Shahzad Properties Real Estate LLC",
          },
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Bedrooms",
            value: property.bedRooms,
          },
          {
            "@type": "PropertyValue",
            name: "Bathrooms",
            value: property.bathrooms,
          },
          {
            "@type": "PropertyValue",
            name: "Size",
            value: `${property.size} sq ft`,
          },
          {
            "@type": "PropertyValue",
            name: "Property Type",
            value: property.property_type,
          },
        ],
      },
    })),
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading properties</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => fetchProperties(true)} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script
        id="properties-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Compact Header */}
        <div className="bg-[#0A253A] sticky top-20 z-40 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            {/* Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Properties for Sale</h1>
                </div>
              </div>
              <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 hover:text-white"
                  >
                    <Filter className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filter Properties</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="relative">
                      <Input
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-10 bg-gray-100 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-gray-500"
                      />
                      <Search className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
                    </div>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">All Types</option>
                      <option value="APARTMENT">Apartment</option>
                      <option value="VILLA">Villa</option>
                      <option value="PENTHOUSE">Penthouse</option>
                      <option value="TOWNHOUSE">Townhouse</option>
                    </select>

                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Beds</option>
                      <option value="1">1 BR</option>
                      <option value="2">2 BR</option>
                      <option value="3">3 BR</option>
                      <option value="4">4+ BR</option>
                    </select>

                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Price</option>
                      <option value="1-2m">1M-2M</option>
                      <option value="2-5m">2M-5M</option>
                      <option value="5-10m">5M-10M</option>
                      <option value="10m+">10M+</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price ↑</option>
                      <option value="price-high">Price ↓</option>
                      <option value="size-large">Size ↓</option>
                    </select>
                    <Button onClick={() => setFilterModalOpen(false)} className="w-full bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A]">
                      Apply Filters
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="container mx-auto px-4 py-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-6 w-1/3 mb-3" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredProperties.length} of {totalProperties} properties
                </p>
                {loadingMore && (
                  <div className="flex items-center text-blue-600">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span className="text-sm">Loading more...</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProperties.map((property, index) => {
                  const completionBadge = getCompletionBadge(property.completionStatus)
                  const isLast = index === filteredProperties.length - 1

                  return (
                    <Card
                      key={property.id}
                      ref={isLast ? lastPropertyElementRef : null}
                      className="bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={property.photos?.[0] || "/placeholder.svg"}
                          alt={property.title}
                          width={400}
                          height={240}
                          className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-48"
                        />

                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          <Badge className={`${completionBadge.color} text-xs px-2 py-1`}>{completionBadge.text}</Badge>
                          {property.videoLink && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                              <Eye className="w-3 h-3 mr-1" />
                              Video
                            </Badge>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3">
                          <div className="text-lg font-bold text-white drop-shadow-lg">
                            {formatPrice(property.price)}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {property.title}
                          </h3>
                        </div>

                        <div className="flex items-center text-gray-500 mb-3">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="text-sm">
                            {property.location.sub_community}, {property.location.community}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 text-gray-600 mb-3 text-sm">
                          <div className="flex items-center">
                            <Bed className="w-3 h-3 mr-1" />
                            <span>{property.bedRooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-3 h-3 mr-1" />
                            <span>{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-3 h-3 mr-1" />
                            <span>{formatArea(property.size)}</span>
                          </div>
                          {property.parking > 0 && (
                            <div className="flex items-center">
                              <Car className="w-3 h-3 mr-1" />
                              <span>{property.parking}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={property.developer?.logoUrl || "/placeholder.svg"}
                              alt={property.developer?.name || "Developer"}
                              width={20}
                              height={20}
                              className="rounded"
                            />
                            <span className="text-xs text-gray-600 font-medium">{property.developer?.name || "—"}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {property.buildYear || "—"}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Image
                                src={property.agent?.avatar || "/placeholder.svg"}
                                alt={property.agent?.name || "Agent"}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                              <div>
                                <div className="font-medium text-sm text-gray-800">
                                  {property.agent?.name || "Our Agent"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contact Actions - Icons Only */}
                          <div className="grid grid-cols-4 gap-2 mb-3">
                            {property.agent?.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCall(property.agent!.phone!)}
                                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white h-8 w-8 p-0"
                                title="Call"
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                            )}

                            {property.agent?.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleWhatsApp(property.agent!.phone!)}
                                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white h-8 w-8 p-0"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            )}

                            {property.agent?.email && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEmail(property.agent!.email!, property.title)}
                                className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white h-8 w-8 p-0"
                                title="Email"
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            )}

                            {/* Schedule Viewing Button */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleScheduleViewing(property)}
                                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white h-8 w-8 p-0"
                                  title="Schedule Viewing"
                                >
                                  <CalendarDays className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Schedule Property Viewing</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium text-sm mb-2">{property.title}</h4>
                                    <p className="text-xs text-gray-600">
                                      {property.location.sub_community}, {property.location.community}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferred Date *
                                      </label>
                                      <Input
                                        type="date"
                                        value={viewingDate}
                                        onChange={(e) => setViewingDate(e.target.value)}
                                        className="text-sm"
                                        min={new Date().toISOString().split("T")[0]}
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferred Time *
                                      </label>
                                      <select
                                        value={viewingTime}
                                        onChange={(e) => setViewingTime(e.target.value)}
                                        className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm"
                                      >
                                        <option value="">Select Time</option>
                                        <option value="09:00 AM">09:00 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="01:00 PM">01:00 PM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                        <option value="06:00 PM">06:00 PM</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                    <Input
                                      type="text"
                                      value={viewerName}
                                      onChange={(e) => setViewerName(e.target.value)}
                                      placeholder="Enter your full name"
                                      className="text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Phone Number *
                                    </label>
                                    <Input
                                      type="tel"
                                      value={viewerPhone}
                                      onChange={(e) => setViewerPhone(e.target.value)}
                                      placeholder="+971 50 123 4567"
                                      className="text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Email Address
                                    </label>
                                    <Input
                                      type="email"
                                      value={viewerEmail}
                                      onChange={(e) => setViewerEmail(e.target.value)}
                                      placeholder="your.email@example.com"
                                      className="text-sm"
                                    />
                                  </div>

                                  <div className="flex space-x-3 pt-4">
                                    <DialogTrigger asChild>
                                      <Button variant="outline" className="flex-1 bg-transparent">
                                        Cancel
                                      </Button>
                                    </DialogTrigger>
                                    <Button
                                      onClick={submitViewingRequest}
                                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                                    >
                                      Schedule Viewing
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <Link href={`/properties/${property.id}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-9 text-sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {loadingMore && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
                  <span className="text-gray-600 text-sm">Loading more properties...</span>
                </div>
              )}

              {!hasMore && properties.length > 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">You've reached the end of all properties</p>
                </div>
              )}

              {!loading && filteredProperties.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500 text-lg mb-3">No properties found</div>
                  <p className="text-gray-400 mb-4 text-sm">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setPropertyType("")
                      setBedrooms("")
                      setPriceRange("")
                    }}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
