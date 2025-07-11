"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import {
  Home,
  MapPin,
  Calendar,
  Bed,
  Square,
  Heart,
  Share2,
  Phone,
  Eye,
  Loader2,
  MessageCircle,
  Mail,
  Download,
  DollarSign,
  CalendarDays,
  Filter,
} from "lucide-react"

interface Project {
  id: number
  name: string
  photos: string[]
  description: string
  location?: {
    city: string
    community: string
    sub_community?: string
  }
  developer?: {
    name?: string
    logoUrl?: string
  }
  agent: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  newParam: {
    price: number
    size_min: number
    size_max: number
    bedroomMin: number
    bedroomMax: number
    handoverTime?: string
  }
  propertyTypes?: string[]
  payment_planParam: {
    first_installment?: number
    under_construction?: number
    on_handover?: number
    post_handover?: number
  }
  brochureUrl?: string
  projectStatus: string
  floor_plans?: Array<{
    title: string
    Bedroom: string
    price: number
    size: number
    property_type: string
  }>
}

interface ProjectsResponse {
  totalProjects: number
  projects: Project[]
  page: number
  size: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalProjects, setTotalProjects] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [developer, setDeveloper] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const [viewingModalOpen, setViewingModalOpen] = useState(false)
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [viewingForm, setViewingForm] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const observer = useRef<IntersectionObserver>()
  const lastProjectElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProjects()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, loadingMore, hasMore],
  )

  const PROJECTS_PER_PAGE = 12

  useEffect(() => {
    fetchProjects(true)
  }, [])

  useEffect(() => {
    if (currentPage > 1) {
      setProjects([])
      setCurrentPage(1)
      setHasMore(true)
      fetchProjects(true)
    }
  }, [searchQuery, priceRange, propertyType, developer, sortBy])

  const fetchProjects = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true)
        setError(null)
      } else {
        setLoadingMore(true)
      }

      const page = reset ? 1 : currentPage
      const params = new URLSearchParams({
        size: PROJECTS_PER_PAGE.toString(),
        page: page.toString(),
        status: "ACTIVE",
      })

      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`https://asp-api.propfusion.io/properties/projects?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data: ProjectsResponse = await response.json()

      if (reset) {
        setProjects(data.projects)
        setTotalProjects(data.totalProjects)
      } else {
        setProjects((prev) => [...prev, ...data.projects])
      }

      const totalLoaded = reset ? data.projects.length : projects.length + data.projects.length
      setHasMore(totalLoaded < data.totalProjects && data.projects.length === PROJECTS_PER_PAGE)

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

  const loadMoreProjects = () => {
    if (!loadingMore && hasMore) {
      fetchProjects(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "Price on Request"
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`
    }
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

  const formatLocation = (loc?: Project["location"]) => {
    if (!loc) return "Dubai"
    if (loc.sub_community) return `${loc.sub_community}, ${loc.community}`
    return `${loc.community}, ${loc.city}`
  }

  const getHandoverDate = (handoverTime?: string) => {
    if (!handoverTime) return "TBA"
    const date = new Date(handoverTime)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { text: "Available", color: "bg-green-100 text-green-800" }
      case "sold_out":
        return { text: "Sold Out", color: "bg-red-100 text-red-800" }
      case "coming_soon":
        return { text: "Coming Soon", color: "bg-blue-100 text-blue-800" }
      default:
        return { text: "Available", color: "bg-green-100 text-green-800" }
    }
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    const message = encodeURIComponent("Hi, I'm interested in your project. Can you provide more details?")
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  const handleEmail = (email: string, projectName: string) => {
    const subject = encodeURIComponent(`Project Inquiry: ${projectName}`)
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the project: ${projectName}\n\nPlease provide more details about pricing, floor plans, and availability.\n\nThank you.`,
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self")
  }

  const handleScheduleViewing = (project: Project) => {
    setSelectedProject(project)
    setViewingModalOpen(true)
  }

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!viewingForm.name || !viewingForm.phone || !viewingForm.date || !viewingForm.time) {
      alert("Please fill in all required fields")
      return
    }

    const subject = encodeURIComponent(`Viewing Request: ${selectedProject?.name}`)
    const body = encodeURIComponent(
      `Hi,\n\nI would like to schedule a viewing for the project: ${selectedProject?.name}\n\nPreferred Date: ${viewingForm.date}\nPreferred Time: ${viewingForm.time}\nName: ${viewingForm.name}\nPhone: ${viewingForm.phone}\nEmail: ${viewingForm.email}\n\nAdditional Message: ${viewingForm.message}\n\nThank you.`,
    )

    if (selectedProject?.agent?.email) {
      window.open(`mailto:${selectedProject.agent.email}?subject=${subject}&body=${body}`, "_self")
    }

    setViewingModalOpen(false)
    setViewingForm({ date: "", time: "", name: "", phone: "", email: "", message: "" })
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.location?.community && project.location.community.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = !propertyType || (project.propertyTypes && project.propertyTypes.includes(propertyType))
    const matchesDeveloper =
      !developer || (project.developer?.name && project.developer.name.toLowerCase().includes(developer.toLowerCase()))

    let matchesPrice = true
    if (priceRange) {
      const price = project.newParam.price
      switch (priceRange) {
        case "1-5m":
          matchesPrice = price >= 1000000 && price <= 5000000
          break
        case "5-10m":
          matchesPrice = price >= 5000000 && price <= 10000000
          break
        case "10-25m":
          matchesPrice = price >= 10000000 && price <= 25000000
          break
        case "25m+":
          matchesPrice = price >= 25000000
          break
      }
    }

    return matchesSearch && matchesType && matchesDeveloper && matchesPrice
  })

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dubai Off-Plan & New Projects",
    description:
      "Discover Dubai's latest off-plan and new development projects from top developers. Explore luxury apartments, villas, and townhouses with flexible payment plans and world-class amenities.",
    url: "https://investmentexperts.ae/projects",
    numberOfItems: totalProjects,
    itemListElement: projects.slice(0, 10).map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: project.name,
        description: project.description,
        image: project.photos?.[0] || "/placeholder.svg",
        url: `https://investmentexperts.ae/projects/${project.id}`,
        offers: {
          "@type": "Offer",
          price: project.newParam.price,
          priceCurrency: "AED",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "RealEstateAgent",
            name: "Kenan Alkabbani Real Estate LLC",
          },
        },
        brand: {
          "@type": "Brand",
          name: project.developer?.name || "Developer",
        },
      },
    })),
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading projects</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => fetchProjects(true)} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script
        id="projects-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-[#0A253A] sticky top-20 z-40 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Off-Plan Projects</h1>
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
                    <DialogTitle>Filter Projects</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="relative">
                      <Input
                        placeholder="Search projects..."
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
                      value={developer}
                      onChange={(e) => setDeveloper(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">All Developers</option>
                      <option value="Emaar">Emaar</option>
                      <option value="Damac">Damac</option>
                      <option value="Sobha">Sobha</option>
                      <option value="Nakheel">Nakheel</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full h-10 bg-gray-100 border-gray-200 rounded-md px-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="newest">Newest</option>
                      <option value="popular">Popular</option>
                      <option value="handover-soon">Handover Soon</option>
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
                  Showing {filteredProjects.length} of {totalProjects} projects
                </p>
                {loadingMore && (
                  <div className="flex items-center text-blue-600">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span className="text-sm">Loading more...</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProjects.map((project, index) => {
                  const statusBadge = getStatusBadge(project.projectStatus)
                  const isLast = index === filteredProjects.length - 1

                  return (
                    <Card
                      key={project.id}
                      ref={isLast ? lastProjectElementRef : null}
                      className="bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={project.photos?.[0] || "/placeholder.svg"}
                          alt={project.name}
                          width={400}
                          height={240}
                          className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-48"
                        />

                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          <Badge className={`${statusBadge.color} text-xs px-2 py-1`}>{statusBadge.text}</Badge>
                          <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
                            {project.propertyTypes?.[0] || "Property"}
                          </Badge>
                          {project.newParam.handoverTime && (
                            <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {getHandoverDate(project.newParam.handoverTime)}
                            </Badge>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3">
                          <div className="text-lg font-bold text-white drop-shadow-lg">
                            {formatPrice(project.newParam.price)}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {project.name}
                          </h3>
                        </div>

                        <div className="flex items-center text-gray-500 mb-3">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="text-sm">{formatLocation(project.location)}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <Bed className="w-3 h-3 text-blue-600" />
                            <span>{formatBedrooms(project.newParam.bedroomMin, project.newParam.bedroomMax)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Square className="w-3 h-3 text-blue-600" />
                            <span className="text-xs">
                              {formatArea(project.newParam.size_min, project.newParam.size_max)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3 text-blue-600" />
                            <span className="text-xs">{project.payment_planParam?.first_installment || 0}% Down</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={project.developer?.logoUrl || "/placeholder.svg"}
                              alt={project.developer?.name || "Developer"}
                              width={20}
                              height={20}
                              className="rounded"
                            />
                            <span className="text-xs text-gray-600 font-medium">
                              {project.developer?.name || "Developer"}
                            </span>
                          </div>
                          {project.brochureUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(project.brochureUrl, "_blank")}
                              className="text-xs h-7 px-2"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Brochure
                            </Button>
                          )}
                        </div>

                        {project.payment_planParam && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Payment Plan</div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              {project.payment_planParam.first_installment && (
                                <div className="text-center">
                                  <div className="font-bold text-blue-600">
                                    {project.payment_planParam.first_installment}%
                                  </div>
                                  <div className="text-gray-500">Down</div>
                                </div>
                              )}
                              {project.payment_planParam.under_construction && (
                                <div className="text-center">
                                  <div className="font-bold text-green-600">
                                    {project.payment_planParam.under_construction}%
                                  </div>
                                  <div className="text-gray-500">Construction</div>
                                </div>
                              )}
                              {project.payment_planParam.on_handover && (
                                <div className="text-center">
                                  <div className="font-bold text-orange-600">
                                    {project.payment_planParam.on_handover}%
                                  </div>
                                  <div className="text-gray-500">Handover</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Image
                                src={project.agent.avatar || "/placeholder.svg"}
                                alt={project.agent.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                              <div>
                                <div className="font-medium text-sm text-gray-800">{project.agent.name}</div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-2 mb-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCall(project.agent.phone)}
                              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white h-8 w-8 p-0"
                              title="Call Agent"
                            >
                              <Phone className="w-3 h-3" />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWhatsApp(project.agent.phone)}
                              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white h-8 w-8 p-0"
                              title="WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEmail(project.agent.email, project.name)}
                              className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white h-8 w-8 p-0"
                              title="Send Email"
                            >
                              <Mail className="w-3 h-3" />
                            </Button>

                            <Dialog open={viewingModalOpen} onOpenChange={setViewingModalOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleScheduleViewing(project)}
                                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white h-8 w-8 p-0"
                                  title="Schedule Viewing"
                                >
                                  <CalendarDays className="w-3 h-3" />
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                          </div>

                          <Link href={`/projects/${project.id}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-9 text-sm">
                              <Eye className="w-3 h-3 mr-2" />
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
                  <span className="text-gray-600 text-sm">Loading more projects...</span>
                </div>
              )}

              {!hasMore && projects.length > 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">You've reached the end of all projects</p>
                </div>
              )}

              {!loading && filteredProjects.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500 text-lg mb-3">No projects found</div>
                  <p className="text-gray-400 mb-4 text-sm">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setPropertyType("")
                      setDeveloper("")
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
        <Dialog open={viewingModalOpen} onOpenChange={setViewingModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Project Viewing</DialogTitle>
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
