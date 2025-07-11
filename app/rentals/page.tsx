"use client"

import type React from "react"
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
  Eye,
  Loader2,
  MessageCircle,
  Mail,
  Home,
  CreditCard,
  Clock,
  CalendarDays,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface RentalProperty {
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
  // Rental-specific fields
  cheques: string
  deposit: string
  isFurnished: string
  availabilityDate: string
  occupancy: string
  floor: string
  acFee?: string
  serviceCharge?: string
  priceType: string
}

interface ApiResponse {
  totalProperties: number
  properties: RentalProperty[]
}

export default function RentalsPage() {
  const [properties, setProperties] = useState<RentalProperty[]>([])
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
  const [furnishedStatus, setFurnishedStatus] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const [viewingModalOpen, setViewingModalOpen] = useState(false)
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<RentalProperty | null>(null)
  const [viewingForm, setViewingForm] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const observer = useRef<IntersectionObserver>()
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
    [loading, loadingMore, hasMore],
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
  }, [searchQuery, priceRange, propertyType, bedrooms, furnishedStatus, sortBy])

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
        listing_type: "RENT",
      })

      // Add filters if they exist
      if (propertyType) params.append("property_type", propertyType)
      if (bedrooms) params.append("bedrooms", bedrooms)
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(
        `https://asp-api.propfusion.io/properties/get_properties_for_main_site?${params.toString()}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch rental properties")
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

  const loadMoreProperties = () => {
    if (!loadingMore && hasMore) {
      fetchProperties(false)
    }
  }

  const formatPrice = (price: number, priceType?: string) => {
    const period = priceType ? `/${priceType.toLowerCase()}` : "/year"
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M${period}`
    }
    return `AED ${price.toLocaleString()}${period}`
  }

  const formatArea = (size: number) => {
    return `${size.toLocaleString()} sq ft`
  }

  const getFurnishedBadge = (furnished: string) => {
    switch (furnished.toLowerCase()) {
      case "yes":
        return { text: "Furnished", color: "bg-green-100 text-green-800" }
      case "no":
        return { text: "Unfurnished", color: "bg-gray-100 text-gray-800" }
      case "partly":
        return { text: "Semi-Furnished", color: "bg-blue-100 text-blue-800" }
      default:
        return { text: "Not Specified", color: "bg-gray-100 text-gray-800" }
    }
  }

  const getOccupancyBadge = (occupancy: string) => {
    switch (occupancy.toLowerCase()) {
      case "vacant":
        return { text: "Available Now", color: "bg-green-100 text-green-800" }
      case "occupied":
        return { text: "Occupied", color: "bg-red-100 text-red-800" }
      default:
        return { text: "Contact Agent", color: "bg-blue-100 text-blue-800" }
    }
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    const message = encodeURIComponent(
      "Hi, I'm interested in your rental property listing. Can you provide more details?",
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  const handleEmail = (email: string, propertyTitle: string) => {
    const subject = encodeURIComponent(`Rental Inquiry: ${propertyTitle}`)
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in renting the property: ${propertyTitle}\n\nPlease provide more details about availability and viewing arrangements.\n\nThank you.`,
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self")
  }

  const handleScheduleViewing = (property: RentalProperty) => {
    setSelectedProperty(property)
    setViewingModalOpen(true)
  }

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!viewingForm.name || !viewingForm.phone || !viewingForm.date || !viewingForm.time) {
      alert("Please fill in all required fields")
      return
    }

    const subject = encodeURIComponent(`Viewing Request: ${selectedProperty?.title}`)
    const body = encodeURIComponent(
      `Hi,\n\nI would like to schedule a viewing for the property: ${selectedProperty?.title}\n\nPreferred Date: ${viewingForm.date}\nPreferred Time: ${viewingForm.time}\nName: ${viewingForm.name}\nPhone: ${viewingForm.phone}\nEmail: ${viewingForm.email}\n\nAdditional Message: ${viewingForm.message}\n\nThank you.`,
    )

    if (selectedProperty?.agent?.email) {
      window.open(`mailto:${selectedProperty.agent.email}?subject=${subject}&body=${body}`, "_self")
    }

    setViewingModalOpen(false)
    setViewingForm({ date: "", time: "", name: "", phone: "", email: "", message: "" })
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      !searchQuery ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.community.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !propertyType || property.property_type === propertyType
    const matchesBedrooms = !bedrooms || property.bedRooms.toString() === bedrooms
    const matchesFurnished = !furnishedStatus || property.isFurnished.toLowerCase() === furnishedStatus.toLowerCase()

    let matchesPrice = true
    if (priceRange) {
      const price = property.price
      switch (priceRange) {
        case "50-100k":
          matchesPrice = price >= 50000 && price <= 100000
          break
        case "100-200k":
          matchesPrice = price >= 100000 && price <= 200000
          break
        case "200-300k":
          matchesPrice = price >= 200000 && price <= 300000
          break
        case "300k+":
          matchesPrice = price >= 300000
          break
      }
    }

    return matchesSearch && matchesType && matchesBedrooms && matchesFurnished && matchesPrice
  })

  // Structured Data for Rentals Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Properties for Rent in Dubai",
    description:
      "Browse premium rental properties in Dubai including apartments, villas, penthouses, and townhouses in Dubai Marina, Downtown Dubai, Palm Jumeirah, and more.",
    url: "https://investmentexperts.ae/rentals",
    numberOfItems: totalProperties,
    itemListElement: properties.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: property.title,
        description: property.description,
        image: property.photos?.[0] || "/placeholder.svg",
        url: `https://investmentexperts.ae/rentals/${property.id}`,
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
          <div className="text-red-500 text-xl mb-4">Error loading rental properties</div>
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
        id="rentals-structured-data"
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
                  <h1 className="text-xl font-bold text-white">Properties for Rent</h1>
                </div>
              </div>

              {/* Mobile-Optimized Search and Filters */}
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
                        placeholder="Search rentals..."
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
                      <option value="0">Studio</option>
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
                      <option value="50-100k">50K-100K</option>
                      <option value="100-200k">100K-200K</option>
                      <option value="200-300k">200K-300K</option>
                      <option value="300k+">300K+</option>
                    </select>

                    <select
                      value={furnishedStatus}
                      onChange={(e) => setFurnishedStatus(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Furnishing</option>
                      <option value="yes">Furnished</option>
                      <option value="no">Unfurnished</option>
                      <option value="partly">Semi-Furnished</option>
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
                  Showing {filteredProperties.length} of {totalProperties} rental properties
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
                  const furnishedBadge = getFurnishedBadge(property.isFurnished)
                  const occupancyBadge = getOccupancyBadge(property.occupancy)
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
                          <Badge className={`${furnishedBadge.color} text-xs px-2 py-1`}>{furnishedBadge.text}</Badge>
                          <Badge className={`${occupancyBadge.color} text-xs px-2 py-1`}>{occupancyBadge.text}</Badge>
                          {property.videoLink && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                              <Eye className="w-3 h-3 mr-1" />
                              Video
                            </Badge>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3">
                          <div className="text-lg font-bold text-white drop-shadow-lg">
                            {formatPrice(property.price, property.priceType)}
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
                            <span>{property.bedRooms === 0 ? "Studio" : property.bedRooms}</span>
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

                        {/* Rental-specific info */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                          {property.cheques && (
                            <div className="flex items-center text-gray-600">
                              <CreditCard className="w-3 h-3 mr-1" />
                              <span>{property.cheques} Cheques</span>
                            </div>
                          )}
                          {property.floor && (
                            <div className="flex items-center text-gray-600">
                              <Home className="w-3 h-3 mr-1" />
                              <span>Floor {property.floor}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {property.developer?.logoUrl && (
                              <Image
                                src={property.developer.logoUrl || "/placeholder.svg"}
                                alt={property.developer.name || "Developer"}
                                width={20}
                                height={20}
                                className="rounded"
                              />
                            )}
                            <span className="text-xs text-gray-600 font-medium">{property.developer?.name || "—"}</span>
                          </div>
                          {property.availabilityDate && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Available
                            </div>
                          )}
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

                          {/* Contact Actions */}
                          <div className="grid grid-cols-4 gap-2 mb-3">
                            {property.agent?.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCall(property.agent!.phone!)}
                                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white h-8 w-8 p-0"
                                title="Call Agent"
                              >
                                <Phone className="w-3 h-3" />
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
                                <MessageCircle className="w-3 h-3" />
                              </Button>
                            )}

                            {property.agent?.email && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEmail(property.agent!.email!, property.title)}
                                className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white h-8 w-8 p-0"
                                title="Send Email"
                              >
                                <Mail className="w-3 h-3" />
                              </Button>
                            )}

                            <Dialog open={viewingModalOpen} onOpenChange={setViewingModalOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleScheduleViewing(property)}
                                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white h-8 w-8 p-0"
                                  title="Schedule Viewing"
                                >
                                  <CalendarDays className="w-3 h-3" />
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                          </div>

                          <Link href={`/rentals/${property.id}`}>
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
                  <p className="text-gray-500 text-sm">You've reached the end of all rental properties</p>
                </div>
              )}

              {!loading && filteredProperties.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500 text-lg mb-3">No rental properties found</div>
                  <p className="text-gray-400 mb-4 text-sm">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setPropertyType("")
                      setBedrooms("")
                      setPriceRange("")
                      setFurnishedStatus("")
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
        {/* Viewing Scheduler Modal */}
        <Dialog open={viewingModalOpen} onOpenChange={setViewingModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Property Viewing</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleViewingSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="viewing-date">Preferred Date *</Label>
                <Input
                  id="viewing-date"
                  type="date"
                  value={viewingForm.date}
                  onChange={(e) => setViewingForm({ ...viewingForm, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="viewing-time">Preferred Time *</Label>
                <select
                  id="viewing-time"
                  value={viewingForm.time}
                  onChange={(e) => setViewingForm({ ...viewingForm, time: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-md px-3 focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitor-name">Your Name *</Label>
                <Input
                  id="visitor-name"
                  value={viewingForm.name}
                  onChange={(e) => setViewingForm({ ...viewingForm, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitor-phone">Phone Number *</Label>
                <Input
                  id="visitor-phone"
                  type="tel"
                  value={viewingForm.phone}
                  onChange={(e) => setViewingForm({ ...viewingForm, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitor-email">Email Address</Label>
                <Input
                  id="visitor-email"
                  type="email"
                  value={viewingForm.email}
                  onChange={(e) => setViewingForm({ ...viewingForm, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="viewing-message">Additional Message</Label>
                <Textarea
                  id="viewing-message"
                  value={viewingForm.message}
                  onChange={(e) => setViewingForm({ ...viewingForm, message: e.target.value })}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={() => setViewingModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Schedule Viewing
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
