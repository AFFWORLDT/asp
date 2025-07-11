"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setError("Please fill out all required fields.")
      setLoading(false)
      return
    }

    try {
      // Create payload with only filled fields
      const payload: any = {
        name: formState.name,
        email: formState.email,
        leads_message: formState.message,
        clientSource: "website",
        status: "ACTIVE",
        clientType: "ENQUIRY",
        project: "general_inquiry",
        body: formState.message
      }

      // Add optional fields only if they have values
      if (formState.phone.trim()) {
        payload.phone = formState.phone
      }

      if (formState.subject.trim()) {
        payload.clientSubSource = formState.subject
      }

      // Get user's IP address (optional)
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        payload.ip_address = ipData.ip
      } catch (ipError) {
        console.log("Could not get IP address:", ipError)
      }

      // Call the API
      const response = await fetch('https://asp-api.propfusion.io/properties/create_leads_for_website', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Lead created successfully:", result)

      setLoading(false)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Failed to send message. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 pt-20">
      <div className="bg-[#0a253a]">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-300">
            We&apos;re here to help with all your real estate needs. Contact us today!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Our Office</h3>
                  <a
                    href="https://maps.app.goo.gl/iBGGbKJzhfMExrmA6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 not-italic"
                  >
                    Prime. TOWER  Tower, Al Barsha 5 South, Dubai, UAE
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Email Us</h3>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:asproperty2025@gmail.com" className="text-gray-600 hover:text-blue-600">
                      asproperty2025@gmail.com
                    </a>
                    <a href="mailto:amina@aspalest.com" className="text-gray-600 hover:text-blue-600">
                      amina@aspalest.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Get in Touch</h3>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+971562633246" className="text-gray-600 hover:text-blue-600">
                      +971562633246
                    </a>
                    <a href="tel:+971551803344" className="text-gray-600 hover:text-blue-600">
                      +971551803344
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <h3 className="mt-4 text-xl font-medium text-gray-800">Thank you!</h3>
                    <p className="mt-2 text-gray-600">Your message has been sent successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={formState.name}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number (Optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formState.subject}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Inquiry about properties"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Your message..."
                      />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#F0C75A] via-[#D29F53] to-[#8F6125] hover:opacity-90 text-[#0A253A]"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 