"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Bed,
  Bath,
  Square,
  Car,
  TrendingUp,
  Shield,
  Award,
  Users,
  Building,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Heart,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  const services = [
    {
      title: "Property Sales",
      description:
        "Exclusive luxury properties with personalized service and expert market knowledge.",
      icon: Building,
      href: "/services/property-sales",
      features: ["Premium Listings", "Market Analysis", "Negotiation Support"],
    },
    {
      title: "Investment Advisory",
      description:
        "Strategic investment guidance for maximizing returns in Dubai's real estate market.",
      icon: TrendingUp,
      href: "/services/investment-advisory",
      features: ["Portfolio Analysis", "ROI Optimization", "Market Insights"],
    },
    {
      title: "Property Management",
      description:
        "Comprehensive property management services for landlords and investors.",
      icon: Shield,
      href: "/services/property-management",
      features: ["Tenant Management", "Maintenance", "Financial Reporting"],
    },
    {
      title: "Market Analysis",
      description:
        "In-depth market research and analytics for informed real estate decisions.",
      icon: BarChart3,
      href: "/services/market-analysis",
      features: ["Trend Analysis", "Price Forecasting", "Investment Reports"],
    },
  ];

  const quickLinks = [
    { name: "Buy Properties", href: "/properties" },
    { name: "Rent Properties", href: "/rentals" },
    { name: "New Projects", href: "/projects" },
    { name: "Our Team", href: "/team" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/aspalest" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/aspalest/" },
    { name: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@aspalest22" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ];

  return (
    <>
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#0a253a] via-[#1a3b5c] to-[#0a253a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Updated with Market Insights
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest property trends, investment opportunities, and market analysis delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#F0C75A] focus:ring-[#F0C75A]"
              />
              <Button className="bg-gradient-to-r from-[#F0C75A] to-[#D29F53] hover:shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#0A253A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex-shrink-0 group mb-6 inline-block">
                <Image
                  src="/logo.png"
                  alt="Ayaz Shahzad Properties Real Estate"
                  width={180}
                  height={60}
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                Dubai's premier real estate consultancy, specializing in luxury
                properties and investment opportunities across the emirate's
                most prestigious locations.
              </p>
              
              {/* Social Media */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#F0C75A] hover:to-[#D29F53] transition-all duration-300 transform hover:scale-110"
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+971521007734"
                  className="group flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="font-medium">Call Now</span>
                </a>
                <a
                  href="mailto:kkabbani@aspalest.com"
                  className="group flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="font-medium">Email Us</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-gray-400 hover:text-[#F0C75A] transition-colors duration-200"
                    >
                      <service.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-gray-400 hover:text-[#F0C75A] transition-colors duration-200"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact Info</h3>
              <div className="space-y-4">
                <a
                  href="tel:+971521007734"
                  className="group flex items-center text-gray-400 hover:text-[#F0C75A] transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full mr-3 group-hover:bg-[#F0C75A]/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">+971521007734</div>
                  </div>
                </a>
                
                <a
                  href="mailto:kkabbani@aspalest.com"
                  className="group flex items-center text-gray-400 hover:text-[#F0C75A] transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full mr-3 group-hover:bg-[#F0C75A]/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">kkabbani@aspalest.com</div>
                  </div>
                </a>
                
                <a
                  href="https://maps.app.goo.gl/iBGGbKJzhfMExrmA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start text-gray-400 hover:text-[#F0C75A] transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full mr-3 mt-1 group-hover:bg-[#F0C75A]/20 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="font-medium leading-relaxed">
                      Unit 2317 Al Jawhara Tower, Al Barsha 5 South,<br />Dubai, UAE
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                             <div className="text-gray-400 text-center md:text-left">
                 <p>&copy; 2024 Ayaz Shahzad Properties Real Estate. All rights reserved.</p>
                 <p className="text-sm mt-1 flex items-center justify-center md:justify-start">
                   Built with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" /> by <a href="https://propfusion.io" target="_blank" rel="noopener noreferrer" className="ml-1 text-[#F0C75A] hover:text-[#D29F53] transition-colors font-medium">PropFusion</a>
                 </p>
               </div>
              <div className="flex items-center space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-[#F0C75A] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#F0C75A] transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#F0C75A] transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
