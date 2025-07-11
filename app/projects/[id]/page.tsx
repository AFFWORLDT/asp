"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Bed,
  Square,
  DollarSign,
  Download,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Car,
  Waves,
  Trees,
  Dumbbell,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react"

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const carouselApiRef = useRef<any>(null)

  useEffect(() => {
    if (params.id) {
      fetchProjectDetails(params.id as string)
    }
  }, [params.id])

  const fetchProjectDetails = async (projectId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`https://kkre-api.propfusion.io/properties/projects?id=${projectId}`)
      if (!response.ok) throw new Error("Failed to fetch project details")
      const data = await response.json()
      setProject(data.projects?.[0] || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "Price on Request"
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`
    return `AED ${price.toLocaleString()}`
  }

  const formatArea = (min: number, max: number) => {
    if (min === 0 && max === 0) return "Size varies"
    if (min === max) return `${min.toLocaleString()} sq ft`
    return `${min.toLocaleString()} - ${max.toLocaleString()} sq ft`
  }

  const formatBedrooms = (min: number, max: number) => {
    if (min === max) return `${min} BR`
    return `${min}-${max} BR`
  }

  const getHandoverDate = (handoverTime?: string) => {
    if (!handoverTime) return "TBA"
    const date = new Date(handoverTime)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes("gym") || amenityLower.includes("fitness")) return <Dumbbell className="w-5 h-5" />
    if (amenityLower.includes("pool") || amenityLower.includes("swimming")) return <Waves className="w-5 h-5" />
    if (amenityLower.includes("park") || amenityLower.includes("garden")) return <Trees className="w-5 h-5" />
    if (amenityLower.includes("parking") || amenityLower.includes("garage")) return <Car className="w-5 h-5" />
    if (amenityLower.includes("mall") || amenityLower.includes("shopping")) return <ShoppingBag className="w-5 h-5" />
    if (amenityLower.includes("school") || amenityLower.includes("education"))
      return <GraduationCap className="w-5 h-5" />
    if (amenityLower.includes("hospital") || amenityLower.includes("medical"))
      return <Stethoscope className="w-5 h-5" />
    return <Building2 className="w-5 h-5" />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The project you're looking for doesn't exist."}</p>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative">
        {/* Image Gallery */}
        <div className="relative h-[70vh] overflow-hidden">
          {project.photos && project.photos.length > 0 ? (
            <>
              <div className="relative w-full h-full">
                <Image
                  src={project.photos[activeImageIndex] || "/placeholder.svg"}
                  alt={`${project.name} - Image ${activeImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Navigation Arrows */}
              {project.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? project.photos.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === project.photos.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.photos.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
              <Building2 className="w-24 h-24 text-white/50" />
            </div>
          )}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Project Header Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <div className="flex items-end justify-between">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Off-Plan
                  </Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.name}</h1>
                <div className="flex items-center text-white/90 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>
                    {project.location?.sub_community}, {project.location?.community}, {project.location?.city}
                  </span>
                </div>
              </div>
              <div className="text-right text-white">
                <div className="text-sm text-white/80 mb-1">Starting from</div>
                <div className="text-3xl md:text-4xl font-bold">{formatPrice(project.newParam?.price)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">
                    {formatBedrooms(project.newParam?.bedroomMin, project.newParam?.bedroomMax)}
                  </div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <Square className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">
                    {formatArea(project.newParam?.size_min, project.newParam?.size_max)}
                  </div>
                  <div className="text-sm text-gray-600">Area</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">
                    {project.payment_planParam?.first_installment || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Down Payment</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">
                    {getHandoverDate(project.newParam?.handoverTime)}
                  </div>
                  <div className="text-sm text-gray-600">Handover</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="overview" className="rounded-lg">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="amenities" className="rounded-lg">
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="floorplans" className="rounded-lg">
                  Floor Plans
                </TabsTrigger>
                <TabsTrigger value="payment" className="rounded-lg">
                  Payment
                </TabsTrigger>
                <TabsTrigger value="location" className="rounded-lg">
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Overview</h2>
                    <div className="prose max-w-none text-gray-600 leading-relaxed">
                      {project.description ||
                        "Experience luxury living in this exceptional off-plan development, featuring world-class amenities and prime location in the heart of Dubai."}
                    </div>

                    {/* Key Features */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Key Features</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Premium finishes and fixtures</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Smart home technology</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Energy-efficient design</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">24/7 security and concierge</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Investment Highlights</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-600">Prime Dubai location</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-600">High rental yield potential</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-600">Flexible payment plans</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-600">Reputable developer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">World-Class Amenities</h2>
                    {project.newParam?.amenities && project.newParam.amenities.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.newParam.amenities.map((amenity: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <div className="text-blue-600">{getAmenityIcon(amenity)}</div>
                            <span className="text-gray-700 font-medium">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>Amenity details will be updated soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="floorplans" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Floor Plans</h2>
                    {project.floor_plans && project.floor_plans.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.floor_plans.map((plan: any, idx: number) => (
                          <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                                  <p className="text-gray-600">{plan.Bedroom} Bedroom</p>
                                </div>
                                {plan.price > 0 && (
                                  <div className="text-right">
                                    <div className="text-xl font-bold text-blue-600">
                                      AED {plan.price.toLocaleString()}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {plan.layout && (
                                <div className="mb-4">
                                  <Image
                                    src={plan.layout || "/placeholder.svg"}
                                    alt={plan.title}
                                    width={400}
                                    height={300}
                                    className="rounded-lg w-full h-48 object-cover"
                                  />
                                </div>
                              )}

                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Size: {plan.size} sq ft</span>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Square className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>Floor plans will be available soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Flexible Payment Plan</h2>
                    {project.payment_planParam ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {project.payment_planParam.first_installment && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                              <div className="text-3xl font-bold text-blue-600 mb-2">
                                {project.payment_planParam.first_installment}%
                              </div>
                              <div className="text-gray-600 font-medium">Down Payment</div>
                              <div className="text-sm text-gray-500 mt-1">On booking</div>
                            </div>
                          )}
                          {project.payment_planParam.under_construction && (
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                              <div className="text-3xl font-bold text-green-600 mb-2">
                                {project.payment_planParam.under_construction}%
                              </div>
                              <div className="text-gray-600 font-medium">Construction</div>
                              <div className="text-sm text-gray-500 mt-1">During construction</div>
                            </div>
                          )}
                          {project.payment_planParam.on_handover && (
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center">
                              <div className="text-3xl font-bold text-orange-600 mb-2">
                                {project.payment_planParam.on_handover}%
                              </div>
                              <div className="text-gray-600 font-medium">On Handover</div>
                              <div className="text-sm text-gray-500 mt-1">At completion</div>
                            </div>
                          )}
                          {project.payment_planParam.post_handover && (
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                              <div className="text-3xl font-bold text-purple-600 mb-2">
                                {project.payment_planParam.post_handover}%
                              </div>
                              <div className="text-gray-600 font-medium">Post Handover</div>
                              <div className="text-sm text-gray-500 mt-1">After handover</div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Benefits</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-green-500" />
                              <span className="text-gray-600">Extended payment timeline</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Shield className="w-5 h-5 text-green-500" />
                              <span className="text-gray-600">Secure escrow account</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-green-500" />
                              <span className="text-gray-600">No hidden charges</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                              <span className="text-gray-600">Capital appreciation potential</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>Payment plan details will be available soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Prime Location</h2>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="w-6 h-6 text-blue-600" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                            <p className="text-gray-600">
                              {project.location?.sub_community}, {project.location?.community}, {project.location?.city}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-800">Nearby Attractions</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">Dubai Mall - 10 minutes</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">Burj Khalifa - 12 minutes</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">Dubai International Airport - 25 minutes</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">Business Bay - 8 minutes</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-800">Transportation</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600">Metro Station - 5 minutes walk</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600">Bus Stop - 2 minutes walk</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600">Sheikh Zayed Road - Direct access</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600">Taxi/Uber readily available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Request Details Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Request Details</h2>
                <form className="space-y-4">
                  {/* ... form fields ... */}
                </form>
              </CardContent>
            </Card>

            {/* Developer Card */}
            {project.developer && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Developer</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {project.developer.logoUrl ? (
                        <Image
                          src={project.developer.logoUrl || "/placeholder.svg"}
                          alt={project.developer.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{project.developer.name}</div>
                      <div className="text-sm text-gray-500">Trusted Developer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agent Contact Card */}
            {project.agent && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <Image
                        src={project.agent.avatar || "/placeholder-user.jpg"}
                        alt={project.agent.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg mx-auto"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mt-4">{project.agent.name}</h3>
                    <p className="text-gray-600">Property Consultant</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">5.0 (127 reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${project.agent.phone.replace(/\D/g, "")}?text=Hi, I'm interested in ${project.name}`,
                          "_blank",
                        )
                      }
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Now
                    </Button>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      onClick={() => window.open(`tel:${project.agent.phone}`)}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Agent
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-300 hover:border-gray-400 font-semibold py-3 rounded-xl transition-all bg-transparent"
                      onClick={() => window.open(`mailto:${project.agent.email}?subject=Inquiry about ${project.name}`)}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-white/50 rounded-xl">
                    <p className="text-sm text-gray-600 text-center">
                      💬 <strong>Quick Response:</strong> Get answers within 5 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Brochure Download */}
            {project.brochureUrl && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Download Resources</h3>
                  <Button
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl"
                    onClick={() => window.open(project.brochureUrl, "_blank")}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Project Brochure
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Facts */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Status</span>
                    <span className="font-semibold text-gray-800">{project.projectStatus || "Off-Plan"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pool Type</span>
                    <span className="font-semibold text-gray-800">{project.pool_type || "Community Pool"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Government Fees</span>
                    <span className="font-semibold text-gray-800">
                      {project.governmentFees ? `${project.governmentFees}%` : "4%"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Handover</span>
                    <span className="font-semibold text-gray-800">
                      {getHandoverDate(project.newParam?.handoverTime)}
                    </span>
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
