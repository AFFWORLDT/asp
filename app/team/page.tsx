import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Users, Star, MapPin, Award, MessageCircle } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  team_name: string;
  role_name: string;
  state: string;
  languages: string[];
  nationality?: string;
}

async function getAgents(): Promise<Agent[]> {
  const res = await fetch("https://kkre-api.propfusion.io/agent/all", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUyNiwicm9sZV9pZHMiOlsxMDBdLCJ0eXBlIjoiYWdlbnQiLCJleHAiOjE3NTc4MzI0MzB9.I7jfF3Gb25RQsG1Mol0YjrIN941RSKv8R6aDx0ZLQYo",
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch team");
  const data: Agent[] = await res.json();
  return data.filter((a) => a.state === "active");
}

export default async function TeamPage() {
  const agents = await getAgents();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0a253a] via-[#1a3b5c] to-[#0a253a] pt-20 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] rounded-full mb-8 shadow-2xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0C75A] to-[#D29F53]">Experts</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Dedicated professionals with years of experience in Dubai's dynamic real estate market
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#F0C75A] mb-2">{agents.length}+</div>
              <div className="text-white/80 font-medium">Expert Agents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#F0C75A] mb-2">5+</div>
              <div className="text-white/80 font-medium">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#F0C75A] mb-2">1000+</div>
              <div className="text-white/80 font-medium">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {agents.map((agent, index) => {
              const nationality = (() => {
                try {
                  return agent.nationality ? JSON.parse(agent.nationality) : null;
                } catch {
                  return null;
                }
              })();

              return (
                <div
                  key={agent.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#F0C75A]/20"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Card Header with gradient */}
                  <div className="h-24 bg-gradient-to-br from-[#F0C75A] to-[#D29F53] relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>

                  {/* Avatar */}
                  <div className="relative -mt-12 mb-6 flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={agent.avatar || "/placeholder-user.jpg"}
                            alt={agent.name}
                            width={88}
                            height={88}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0a253a] transition-colors">
                      {agent.name}
                    </h3>
                    
                    <div className="mb-4 space-y-2">
                      <div className="text-sm text-gray-600 font-medium">
                        {agent.team_name}
                      </div>
                    </div>

                    {/* Nationality */}
                    {nationality && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6 bg-gray-50 rounded-full px-4 py-2 mx-auto w-fit">
                        <MapPin className="w-4 h-4 text-[#F0C75A]" />
                        <Image
                          src={nationality.flag}
                          alt={nationality.value}
                          width={16}
                          height={12}
                          className="rounded-sm"
                        />
                        <span className="font-medium">{nationality.value}</span>
                      </div>
                    )}

                    {/* Contact Actions */}
                    <div className="flex justify-center space-x-3">
                      {agent.phone && (
                        <a
                          href={`tel:${agent.phone.replace(/\s+/g, "")}`}
                          className="group/btn flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#F0C75A] to-[#D29F53] text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                          title={`Call ${agent.name}`}
                        >
                          <Phone className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        </a>
                      )}
                      {agent.phone && (
                        <a
                          href={`https://wa.me/${agent.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${agent.name}, I'm interested in learning more about property investment opportunities in Dubai. Could you please help me?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white hover:bg-[#1DA851] hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                          title={`WhatsApp ${agent.name}`}
                        >
                          <MessageCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        </a>
                      )}
                      {agent.email && (
                        <a
                          href={`mailto:${agent.email}`}
                          className="group/btn flex items-center justify-center w-12 h-12 rounded-full bg-[#0a253a] text-white hover:bg-[#1a3b5c] hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:-rotate-3"
                          title={`Email ${agent.name}`}
                        >
                          <Mail className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0a253a] via-[#1a3b5c] to-[#0a253a] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] rounded-full mb-8 shadow-2xl">
            <Award className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0C75A] to-[#D29F53]">Journey?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with our expert team today and discover the perfect property investment opportunity in Dubai's thriving market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F0C75A] to-[#D29F53] text-white font-bold rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span>Get Started Today</span>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="tel:+971502213802"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#0a253a] transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              <span>+971562633246</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 