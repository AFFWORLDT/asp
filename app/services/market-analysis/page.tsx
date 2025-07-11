import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  PieChart,
  Target,
  Globe,
  Building,
  CheckCircle,
  Calendar,
  ArrowRight,
  Download,
  Eye,
    Briefcase,
  
  DollarSign,
} from "lucide-react"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Market Analysis | Kenan Alkabbani Real Estate",
  description: "Actionable intelligence powering data-driven real-estate decisions across the UAE.",
}

export default function MarketAnalysisPage() {
  const analysisTypes = [
    {
      title: "Market Trends Analysis",
      description: "Comprehensive analysis of current market trends, price movements, and future projections.",
      icon: TrendingUp,
      features: ["Price Trend Analysis", "Market Cycle Assessment", "Growth Forecasting", "Comparative Studies"],
    },
    {
      title: "Area Performance Reports",
      description: "Detailed performance analysis of specific areas and neighborhoods across Dubai.",
      icon: Globe,
      features: ["Location Analysis", "Infrastructure Impact", "Demographic Studies", "Investment Potential"],
    },
    {
      title: "Investment Opportunity Assessment",
      description: "Identification and evaluation of emerging investment opportunities in the market.",
      icon: Target,
      features: ["ROI Analysis", "Risk Assessment", "Market Entry Timing", "Portfolio Optimization"],
    },
    {
      title: "Property Valuation Reports",
      description: "Professional property valuations based on comprehensive market data and analysis.",
      icon: Building,
      features: ["Current Market Value", "Rental Yield Analysis", "Capital Growth Potential", "Comparative Analysis"],
    },
  ]

  const marketInsights = [
    {
      title: "Dubai Property Market Q4 2024",
      description: "Comprehensive quarterly analysis of Dubai's real estate market performance and trends.",
      type: "Quarterly Report",
      pages: "45 Pages",
      image: "/hero.jpeg",
      highlights: ["15% YoY Growth", "New Project Launches", "Investment Hotspots", "Price Predictions"],
    },
    {
      title: "Luxury Segment Analysis",
      description: "In-depth analysis of Dubai's luxury real estate segment and high-end investment opportunities.",
      type: "Sector Report",
      pages: "32 Pages",
      image: "/dd.png",
      highlights: ["Premium Locations", "Ultra-High Net Worth Trends", "Luxury Amenities Impact", "Future Outlook"],
    },
    {
      title: "Off-Plan Investment Guide",
      description: "Strategic guide to off-plan investments with risk analysis and opportunity assessment.",
      type: "Investment Guide",
      pages: "28 Pages",
      image: "/placeholder.jpg",
      highlights: ["Developer Analysis", "Payment Plan Comparison", "Completion Risk Assessment", "ROI Projections"],
    },
  ]

  const stats = [
    { number: "500+", label: "Market Reports Published", icon: BarChart3 },
    { number: "95%", label: "Forecast Accuracy", icon: Target },
    { number: "AED 10B+", label: "Market Data Analyzed", icon: DollarSign },
    { number: "1000+", label: "Properties Analyzed", icon: Building },
  ]

  const benefits = [
    "Make informed investment decisions",
    "Identify emerging market opportunities",
    "Understand market cycles and timing",
    "Optimize portfolio performance",
    "Minimize investment risks",
    "Access exclusive market insights",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero */}
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
                    Market Analysis Excellence
                  </Badge>
                </div>
      
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Market 
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Analysis
                  </span>
                </h1>
      
                <p className="text-xl sm:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
                 Actionable intelligence and in-depth research to power your real estate decisions. Access comprehensive market reports, trend analysis, and expert insights for Dubai's property market.
                </p>
      
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
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
            <CardTitle className="text-2xl">What We Cover</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc list-inside space-y-1">
              <li>Macro &amp; micro market trends</li>
              <li>District &amp; project performance</li>
              <li>Luxury segment forecasting</li>
              <li>Off-plan opportunity mapping</li>
              <li>Property valuations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-lg">
              <li>
                <span className="font-semibold text-blue-600">95%</span> forecast accuracy
              </li>
              <li>
                <span className="font-semibold text-blue-600">500+</span> reports published
              </li>
              <li>Used by top banks &amp; sovereign funds</li>
            </ul>
          </CardContent>
        </Card>
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

      {/* Analysis Types Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm mb-4">Analysis Services</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Market
              <span className="block text-blue-600">Research Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional market analysis services covering all aspects of Dubai's real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {analysisTypes.map((analysis, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <analysis.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{analysis.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{analysis.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {analysis.features.map((feature, idx) => (
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

      {/* Market Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm mb-4">Market Insights</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Exclusive Market
              <span className="block text-purple-600">Reports & Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Download our latest market reports for in-depth analysis and strategic insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {marketInsights.map((insight, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-100 text-blue-800">{insight.type}</Badge>
                    <Badge className="bg-white text-gray-900">{insight.pages}</Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <Badge className="bg-blue-100 text-blue-800 mb-4">{insight.type}</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{insight.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{insight.description}</p>

                  <div className="space-y-3 mb-6">
                    {insight.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <Button className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] rounded-full group-hover:shadow-lg transition-all duration-300">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <div className="text-sm text-gray-500">{insight.pages}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm mb-4">Key Benefits</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Unlock Your Investment
                <span className="block text-blue-600">Potential with Data</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our market analysis empowers you with the data and insights to make confident investment decisions.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A] px-8 py-4 text-lg rounded-full"
                >
                  Get Custom Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">Real-time Data</div>
                    <p className="text-gray-600">Live market data and analytics</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 mt-8">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">Trend Analysis</div>
                    <p className="text-gray-600">Predictive market trends</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 -mt-4">
                  <CardContent className="p-6 text-center">
                    <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">Strategic Insights</div>
                    <p className="text-gray-600">Actionable investment strategies</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 mt-4">
                  <CardContent className="p-6 text-center">
                    <PieChart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">Portfolio Analysis</div>
                    <p className="text-gray-600">Comprehensive portfolio review</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A253A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Get Actionable Market Intelligence</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Request a custom market analysis report tailored to your specific investment interests.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Request Custom Report
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
