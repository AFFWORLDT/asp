"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Phone,
  MessageCircle,
  Mail,
  Share2,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  CreditCard,
  Clock,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface RentalProperty {
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
  permitNumber?: string
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

export default function RentalDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<RentalProperty | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    if (params.id) {
      fetchPropertyDetails(params.id as string)
    }
  }, [params.id])

  const fetchPropertyDetails = async (propertyId: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://asp-api.propfusion.io/properties/get_properties_for_main_site?size=100&status=ACTIVE&listing_type=RENT`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch rental property details")
      }

      const data = await response.json()
      const foundProperty = data.properties.find((p: RentalProperty) => p.id.toString() === propertyId)

      if (!foundProperty) {
        throw new Error("Rental property not found")
      }

      setProperty(foundProperty)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
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

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    const message = encodeURIComponent(
      `Hi, I'm interested in renting the property: ${property?.title}. Can you provide more details about viewing and availability?`,
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  const handleEmail = (email: string) => {
    const subject = encodeURIComponent(`Rental Inquiry: ${property?.title}`)
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in renting the property: ${property?.title}\nLocation: ${property?.location.sub_community}, ${property?.location.community}\nRent: ${formatPrice(property?.price || 0, property?.priceType)}\n\nPlease provide more details about viewing arrangements and availability.\n\nThank you.`,
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self")
  }

  const nextImage = () => {
    if (property?.photos) {
      setCurrentImageIndex((prev) => (prev + 1) % property.photos.length)
    }
  }

  const prevImage = () => {
    if (property?.photos) {
      setCurrentImageIndex((prev) => (prev - 1 + property.photos.length) % property.photos.length)
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    setShowContactForm(false)
    setContactForm({ name: "", email: "", phone: "", message: "" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full mb-6" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading rental property</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const furnishedBadge = getFurnishedBadge(property.isFurnished)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={property.photos[currentImageIndex] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className={furnishedBadge.color}>{furnishedBadge.text}</Badge>
                  <Badge className="bg-blue-100 text-blue-800">For Rent</Badge>
                  {property.videoLink && (
                    <Badge className="bg-red-500 text-white">
                      <Eye className="w-3 h-3 mr-1" />
                      Video Tour
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.photos.length}
                </div>
                {property.photos.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.photos.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(property.price, property.priceType)}
                  </div>
                </div>

                <div className="flex items-center text-gray-500 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>
                    {property.location.sub_community}, {property.location.community}, {property.location.city}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
                    <Bed className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">{property.bedRooms === 0 ? "Studio" : property.bedRooms}</div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
                    <Bath className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
                    <Square className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">{formatArea(property.size)}</div>
                      <div className="text-sm text-gray-500">Area</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
                    <Car className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">{property.parking}</div>
                      <div className="text-sm text-gray-500">Parking</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Description</h2>
                  <div className="text-gray-600 whitespace-pre-line">{property.description}</div>
                </CardContent>
              </Card>

              {/* Rental Terms */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Rental Terms</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.cheques && (
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{property.cheques} Cheques</span>
                      </div>
                    )}
                    {property.deposit && (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Security Deposit</span>
                      </div>
                    )}
                    {property.floor && (
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Floor {property.floor}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {property.occupancy === "Vacant" ? "Available Now" : "Contact Agent"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Tour */}
              {property.videoLink && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Video Tour</h2>
                    <Button
                      onClick={() => window.open(property.videoLink, "_blank")}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video Tour
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {property.agent && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src={property.agent.avatar || "/placeholder.svg"}
                      alt={property.agent.name || "Agent"}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-lg">{property.agent.name}</div>
                      <div className="text-gray-500">Real Estate Agent</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {property.agent.phone && (
                      <Button
                        onClick={() => handleCall(property.agent.phone!)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    )}

                    {property.agent.phone && (
                      <Button
                        onClick={() => handleWhatsApp(property.agent.phone!)}
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    )}

                    {property.agent.email && (
                      <Button onClick={() => handleEmail(property.agent.email!)} variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    )}

                    <Button onClick={() => setShowContactForm(!showContactForm)} variant="outline" className="w-full">
                      Schedule Viewing
                    </Button>
                  </div>

                  {/* Contact Form */}
                  {showContactForm && (
                    <form onSubmit={handleContactSubmit} className="mt-6 space-y-4 border-t pt-6">
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Your Phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                      <Textarea
                        placeholder="Message (e.g., preferred viewing time)"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={4}
                        required
                      />
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Developer Info */}
            {property.developer && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Developer</h2>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={property.developer.logoUrl || "/placeholder.svg"}
                      alt={property.developer.name || "Developer"}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <div className="font-semibold">{property.developer.name}</div>
                      <div className="text-sm text-gray-500">Trusted Developer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Facts */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Quick Facts</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-semibold">{property.property_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Furnishing</span>
                    <span className="font-semibold">{furnishedBadge.text}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-semibold">
                      {property.occupancy === "Vacant" ? "Available" : "Contact Agent"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-semibold">{property.propertyId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
