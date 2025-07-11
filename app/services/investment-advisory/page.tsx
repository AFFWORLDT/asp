import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Shield,
  Award,
  CheckCircle,
  Calendar,
  DollarSign,
  Building,
  ArrowRight,
  Briefcase,
} from "lucide-react"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investment Advisory | Ayaz Shahzad Properties Real Estate",
  description: "Tailored strategies delivering double-digit ROI across Dubai's prime & emerging districts.",
}

export default function InvestmentAdvisoryPage() {
  const services = [
    {
      title: "Portfolio Analysis",
      description: "Comprehensive analysis of your current real estate portfolio with optimization recommendations.",
      icon: PieChart,
      features: ["Asset Valuation", "Performance Review", "Risk Assessment", "Growth Opportunities"],
    },
    {
      title: "Market Intelligence",
      description: "In-depth market research and trend analysis for strategic investment decisions.",
      icon: BarChart3,
      features: ["Market Trends", "Price Forecasting", "Area Analysis", "Investment Timing"],
    },
    {
      title: "ROI Optimization",
      description: "Strategic planning to maximize returns on your real estate investments.",
      icon: Target,
      features: ["Yield Analysis", "Capital Growth", "Tax Optimization", "Exit Strategies"],
    },
    {
      title: "Risk Management",
      description: "Comprehensive risk assessment and mitigation strategies for your investments.",
      icon: Shield,
      features: ["Risk Profiling", "Diversification", "Insurance Planning", "Legal Protection"],
    },
  ]

  const investmentTypes = [
    {
      title: "Luxury Residential",
      description: "High-end apartments and villas in prime locations",
      roi: "8-12% Annual ROI",
      image: "/hero.jpeg",
      features: ["Prime Locations", "Capital Appreciation", "Rental Income", "Lifestyle Investment"],
      link: "/properties",
    },
    {
      title: "Commercial Properties",
      description: "Office spaces and retail units in business districts",
      roi: "10-15% Annual ROI",
      image: "/dd.png",
      features: ["Stable Income", "Long-term Leases", "Business Growth", "Portfolio Diversification"],
      link: "/rentals",
    },
    {
      title: "Off-Plan Developments",
      description: "Pre-construction properties with high growth potential",
      roi: "15-25% Capital Growth",
      image: "/placeholder.jpg",
      features: ["Early Bird Pricing", "Payment Plans", "High Appreciation", "Modern Amenities"],
      link: "/projects",
    },
  ]

  const stats = [
    { number: "AED 2.5B+", label: "Assets Under Advisory", icon: DollarSign },
    { number: "18.5%", label: "Average Annual ROI", icon: TrendingUp },
    { number: "500+", label: "Successful Investments", icon: Building },
    { number: "95%", label: "Client Retention Rate", icon: Award },
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
              Investment Advisory Excellence
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Strategic Investment
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Advisory Services
            </span>
          </h1>

          <p className="text-xl sm:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Maximize your real estate investment returns with our expert advisory services. Strategic insights, market
            intelligence, and personalized investment solutions.
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

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm mb-4">Advisory Services</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Investment
              <span className="block text-blue-600">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our expert advisory services cover every aspect of real estate investment strategy and execution.
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

      {/* Investment Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm mb-4">Investment Opportunities</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Diversified Investment
              <span className="block text-purple-600">Portfolio Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore various investment opportunities across Dubai's thriving real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentTypes.map((type, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={type.image || "/placeholder.svg"}
                    alt={type.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                      {type.roi}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>

                  <div className="space-y-3 mb-6">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link href={type.link} passHref>
                    <Button className="w-full bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] rounded-full group-hover:shadow-lg transition-all duration-300">
                      Explore Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Sections from Updates */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-2">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Performance at a Glance</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-lg">
              <li>
                <span className="font-semibold text-blue-600">18.5%+</span> average IRR (5-year)
              </li>
              <li>
                <span className="font-semibold text-blue-600">AED 2.5 B</span> assets under advisory
              </li>
              <li>Exposure across residential, hospitality &amp; logistics</li>
              <li>Dedicated research &amp; analytics desk</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">What We Deliver</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              We construct resilient, yield-focused portfolios spanning prime freehold districts and high-growth
              off-plan communities.
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Strategic asset allocation</li>
              <li>Risk-adjusted acquisition modelling</li>
              <li>Exit &amp; liquidity planning</li>
              <li>Quarterly performance reporting</li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section className="bg-[#0A253A] text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Wealth with Dubai Real Estate</h2>
        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
          Request Portfolio Review
        </Button>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A253A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Real Estate Portfolio?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Schedule a private consultation with our Ayaz Shahzad Properties Real Estate to discuss your financial goals and get a
              personalized investment strategy.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
