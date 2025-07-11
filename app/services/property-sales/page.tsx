import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Users,
  Wrench,
  FileText,
  DollarSign,
  Phone,
  Clock,    Briefcase,
    ArrowLeft,
  
  CheckCircle,  BarChart3,
  
  Star,
  Calendar,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


export const metadata: Metadata = {
  title: "Property Sales | Ayaz Shahzad Properties Real Estate",
  description:
    "Discover a curated portfolio of Dubai's most prestigious properties, hand-picked for discerning buyers.",
}

export default function PropertySalesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
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
                  Property Sales Excellence
                  </Badge>
                </div>
      
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Property 
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Sales
                  </span>
                </h1>
      
                <p className="text-xl sm:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  Discover Dubai's most prestigious properties, hand-picked for discerning buyers. Our expert team guides you through every step, ensuring a seamless and rewarding property purchase experience.
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

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-2">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 leading-7">
            <p>
              From waterfront penthouses on Palm Jumeirah to iconic Downtown addresses, we unlock access to Dubai's most
              coveted listings.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Discrete off-market opportunities</li>
              <li>Seasoned negotiators securing best-in-class pricing</li>
              <li>Turn-key legal &amp; conveyancing support</li>
              <li>Bespoke viewing experiences (chauffeur, private jet, yacht)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Our Proven Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li>
                <strong className="block">1. Discovery.</strong> Understanding your lifestyle &amp; investment goals.
              </li>
              <li>
                <strong className="block">2. Shortlist.</strong> Curated selection tailored to your precise brief.
              </li>
              <li>
                <strong className="block">3. Negotiation.</strong> We defend your interests to secure optimal terms.
              </li>
              <li>
                <strong className="block">4. Completion.</strong> Seamless handover including interior &amp; concierge
                services.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Let's Find Your Signature Address</h2>
        <Button
          size="lg"
          className="bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] text-[#0A253A] hover:opacity-90"
        >
          Schedule a Private Consultation
        </Button>
      </section>
    </main>
  )
}