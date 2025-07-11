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
  Calendar,
  Building,
  Phone,
  MessageCircle,
  Mail,
  Share2,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
  Eye,
  Wifi,
  Waves,
  Shield,
  ParkingCircle,
  Trees,
  Utensils,
  ShoppingBag,
  Stethoscope,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

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
  permitNumber?: string
  price_on_application?: string
}

const amenityIcons: { [key: string]: any } = {
  ST: Shield, // Security
  PG: ParkingCircle, // Parking
  SE: Shield, // Security
  MR: Utensils, // Maid Room
  PA: ParkingCircle, // Parking
  PP: Waves, // Pool
  PR: Trees, // Park
  CP: ParkingCircle, // Covered Parking
  BR: Utensils, // Balcony
  LB: Building, // Lobby
  BA: Bath, // Bathroom
  PJ: Trees, // Landscaped
  AC: Wifi, // AC
  PY: Trees, // Play Area
  SP: Waves, // Swimming Pool
  PN: Trees, // Garden
  MZ: Building, // Mezzanine
  AN: Wifi, // Amenities
  DN: Utensils, // Dining
  SS: Shield, // Security System
  SY: Shield, // Security
  CS: Shield, // CCTV
  MS: Stethoscope, // Medical
  BW: Waves, // Beach/Water
  WC: Wifi, // WiFi/Connectivity
  BK: ShoppingBag, // Shopping
  VW: Eye, // View
  BL: Building, // Building
  VC: Eye, // View/Connectivity
  CO: Wifi, // Connectivity
}

export default function PropertyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchPropertyDetails(params.id as string)
    }
  }, [params.id])

  const fetchPropertyDetails = async (propertyId: string) => {
    try {
      setLoading(true)
      // For now, we'll fetch from the main API and find the specific property
      // In a real app, you'd have a dedicated endpoint for single property details
      const response = await fetch(
        `https://asp-api.propfusion.io/properties/get_properties_for_main_site?size=100&status=ACTIVE&listing_type=SELL`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch property details")
      }

      const data = await response.json()
      const foundProperty = data.properties.find((p: Property) => p.id.toString() === propertyId)

      if (!foundProperty) {
        throw new Error("Property not found")
      }

      setProperty(foundProperty)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
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
    const message = encodeURIComponent(
      `Hi, I'm interested in the property: ${property?.title}. Can you provide more details?`,
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  const handleEmail = (email: string) => {
    const subject = encodeURIComponent(`Inquiry about: ${property?.title}`)
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the property: ${property?.title}\nLocation: ${property?.location.sub_community}, ${property?.location.community}\nPrice: ${formatPrice(property?.price || 0)}\n\nPlease provide more details.\n\nThank you.`,
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
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm)
    setShowContactForm(false)
    // Reset form
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
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            {error ? "Error Loading Property" : "Property Not Found"}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const completionBadge = getCompletionBadge(property.completionStatus)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
          onClick={() => setLightboxIndex((lightboxIndex - 1 + property.photos.length) % property.photos.length)}
          disabled={property.photos.length <= 1}
        >
          <ChevronLeft className="w-8 h-8 text-gray-800" />
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogTrigger asChild>
                  <button
                    className="relative h-96 w-full rounded-xl overflow-hidden focus:outline-none"
                    onClick={() => {
                      setLightboxIndex(currentImageIndex)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={property.photos[currentImageIndex] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge className={completionBadge.color}>{completionBadge.text}</Badge>
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
                          onClick={e => { e.stopPropagation(); prevImage(); }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={e => { e.stopPropagation(); nextImage(); }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl w-full flex flex-col items-center !bg-transparent shadow-none border-none ring-0 p-0">
                  <div className="relative w-full h-[70vh] flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
                      onClick={() => setLightboxIndex((lightboxIndex - 1 + property.photos.length) % property.photos.length)}
                      disabled={property.photos.length <= 1}
                    >
                      <ChevronLeft className="w-8 h-8 text-gray-800" />
                    </Button>
                    <Image
                      src={property.photos[lightboxIndex] || "/placeholder.svg"}
                      alt={`Zoomed ${lightboxIndex + 1}`}
                      fill
                      className="object-contain select-none bg-white"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
                      onClick={() => setLightboxIndex((lightboxIndex + 1) % property.photos.length)}
                      disabled={property.photos.length <= 1}
                    >
                      <ChevronRight className="w-8 h-8 text-gray-800" />
                    </Button>
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/60 px-3 py-1 rounded-full text-sm">
                      {lightboxIndex + 1} / {property.photos.length}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-4 mb-4 overflow-x-auto px-4">
                    {property.photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxIndex(idx)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${idx === lightboxIndex ? "border-blue-500" : "border-transparent"}`}
                      >
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Thumb ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              {/* Thumbnail Gallery */}
              {property.photos.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => { setCurrentImageIndex(index); setLightboxIndex(index); setLightboxOpen(true); }}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${index === currentImageIndex ? "ring-2 ring-blue-500" : ""}`}
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                  <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {formatPrice(property.price)}
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
                      <div className="font-semibold">{property.bedRooms}</div>
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

              {/* Property Features */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Property Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{property.property_type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Built in {property.buildYear}</span>
                    </div>
                    {property.permitNumber && (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Permit: {property.permitNumber}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity] || Building
                        return (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <IconComponent className="w-4 h-4 text-blue-600" />
                            <span>{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

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
                      Send Message
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
                        placeholder="Your Message"
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
                    <span className="text-gray-600">Completion</span>
                    <span className="font-semibold">{completionBadge.text}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Build Year</span>
                    <span className="font-semibold">{property.buildYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-semibold">{property.propertyId}</span>
                  </div>
                  {property.price_on_application === "Yes" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price on Application</span>
                      <span className="font-semibold">Contact for Price</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
