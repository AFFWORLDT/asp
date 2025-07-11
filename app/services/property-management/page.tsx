import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  Wrench,  ArrowLeft,
    BarChart3,
  
  FileText,
  DollarSign,
  Phone,
  Clock,    Briefcase,
  
  CheckCircle,
  Star,
  Calendar,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Property Management | Ayaz Shahzad Properties Real Estate",
  description: "End-to-end management maximising yield and preserving asset value for global landlords.",
}

export default function PropertyManagementPage() {
  const services = [
    {
      title: "Tenant Management",
      description: "Complete tenant screening, placement, and relationship management services.",
      icon: Users,
      features: ["Tenant Screening", "Lease Management", "Rent Collection", "Tenant Relations"],
    },
    {
      title: "Maintenance & Repairs",
      description: "24/7 maintenance services and emergency repairs to keep your property in perfect condition.",
      icon: Wrench,
      features: ["Preventive Maintenance", "Emergency Repairs", "Quality Contractors", "Cost Management"],
    },
    {
      title: "Financial Management",
      description: "Comprehensive financial reporting and rent collection with transparent accounting.",
      icon: FileText,
      features: ["Monthly Reports", "Expense Tracking", "Tax Documentation", "Budget Planning"],
    },
    {
      title: "Property Marketing",
      description: "Professional marketing and advertising to minimize vacancy periods.",
      icon: TrendingUp,
      features: ["Professional Photography", "Online Listings", "Market Analysis", "Pricing Strategy"],
    },
  ]

  const benefits = [
    {
      title: "Maximize Rental Income",
      description: "Strategic pricing and tenant placement to optimize your rental returns.",
      icon: DollarSign,
      stat: "15% Higher Rental Yields",
    },
    {
      title: "Minimize Vacancy Periods",
      description: "Professional marketing and tenant screening to reduce empty periods.",
      icon: Clock,
      stat: "Average 7 Days Vacancy",
    },
    {
      title: "Property Value Protection",
      description: "Regular maintenance and inspections to preserve your investment value.",
      icon: Shield,
      stat: "98% Property Condition Rating",
    },
    {
      title: "Stress-Free Ownership",
      description: "Complete hands-off management allowing you to focus on other priorities.",
      icon: Award,
      stat: "24/7 Support Available",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Property Assessment",
      description: "Comprehensive evaluation of your property and market positioning analysis.",
    },
    {
      step: "02",
      title: "Marketing & Tenant Placement",
      description: "Professional marketing campaign and thorough tenant screening process.",
    },
    {
      step: "03",
      title: "Lease Management",
      description: "Complete lease administration, rent collection, and tenant communication.",
    },
    {
      step: "04",
      title: "Ongoing Management",
      description: "Continuous property maintenance, reporting, and optimization services.",
    },
  ]

  const testimonials = [
    {
      name: "Fatima Al Zahra",
      role: "Property Investor",
      content:
        "Outstanding service! My properties are always well-maintained and tenanted. The monthly reports are detailed and transparent.",
      rating: 5,
      properties: "3 Properties Managed",
    },
    {
      name: "James Mitchell",
      role: "Expatriate Owner",
      content:
        "Living abroad, I needed reliable property management. They handle everything professionally and keep me informed regularly.",
      rating: 5,
      properties: "2 Properties Managed",
    },
    {
      name: "Omar Hassan",
      role: "Real Estate Developer",
      content:
        "They manage our entire residential complex. Excellent tenant relations and maintenance standards. Highly recommended.",
      rating: 5,
      properties: "50+ Units Managed",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[105vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28">
              <div className="absolute inset-0 z-0">
                <Image src="/hero.jpeg" alt="Investment Advisory" fill className="object-cover" priority />
              </div>
      
              <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
      
                <div className="mb-6 sm:mb-8">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-base mb-6">
                    Property Management Excellence
                  </Badge>
                </div>
      
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Property 
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                   Management
                  </span>
                </h1>
      
                <p className="text-xl sm:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  End-to-end property management solutions for landlords and investors. We maximize your rental yields, minimize vacancies, and ensure your assets are always protected and well-maintained.
                </p>
      
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] px-10 py-5 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Investment Plan
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-lg rounded-full backdrop-blur-sm bg-white/10"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Market Report
                  </Button>
                </div>
              </div>
            </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-2">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Service Suite</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc list-inside space-y-1">
              <li>Tenant sourcing &amp; screening</li>
              <li>24/7 maintenance &amp; repairs</li>
              <li>Rent collection &amp; financial reporting</li>
              <li>Strategic rent reviews</li>
              <li>Premium staging &amp; marketing</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Our Track Record</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-lg">
              <li>
                Vacancy reduced to <span className="font-semibold text-blue-600">7 days</span> average
              </li>
              <li>
                Rental yields boosted by <span className="font-semibold text-blue-600">15%</span>
              </li>
              <li>
                <span className="font-semibold text-blue-600">98%</span> client satisfaction rating
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm mb-4">Why Choose Our Management</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Maximize Your Property
              <span className="block text-blue-600">Investment Returns</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our professional management services deliver superior results and peace of mind for property owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 text-center"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm mb-4">Management Services</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Property
              <span className="block text-purple-600">Management Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Full-service property management covering every aspect of your investment property needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm mb-4">Our Simple Process</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Efficient & Transparent
              <span className="block text-blue-600">Property Management</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From initial assessment to ongoing management, we ensure a smooth transition and optimal results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="text-5xl font-bold text-blue-200">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm mb-4">Client Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Property
              <span className="block text-purple-600">Investors Worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8 text-left">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-purple-600 font-medium mt-1">{testimonial.properties}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A253A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Get a Free Property Management Quote</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Contact us today for a complimentary consultation and quote for managing your property portfolio.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#0A253A] hover:bg-gray-100 px-10 py-5 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
