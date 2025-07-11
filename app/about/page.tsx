"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Quote Section */}
        <div className="text-center mb-10">
          <blockquote className="text-2xl sm:text-3xl font-semibold italic text-blue-900 mb-2">
            “In the real estate business, you learn more about people, and you learn more about community issues, you learn more about life, you learn more about the impact of government, probably than any other profession that I know of.”
          </blockquote>
          <span className="block text-lg text-gray-500 font-medium">— Johnny Isakson</span>
        </div>

        {/* General Manager Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-xl shadow-lg p-6 mb-10">
          <Image
            src="/placeholder-user.jpg"
            alt="Kenan Alkabbani"
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-200 shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-1">General Manager</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Kenan Alkabbani</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              My passion for real estate began earlier. I have always been interested in the real estate market, and I looked forward to the day I could purchase my first home In Dubai; this opportunity came early in 2017. Since then, I have bought and sold multiple properties across the Emirates.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Today, we service numerous clients in Real Estate Brokerage and Home Rentals.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Whether you are a new buyer or a seasoned investor, Kenan Alkabbani Real Estate will provide you with the highest detail related to your needs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Our philosophy is simple–love what you do.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our passion for real estate motivates us. It fuels us to continually learn and keep a finger on the market's pulse.
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Kenan Alkabbani Real Estate is a premier real estate solution provider of high-quality services tailored to your specific needs. Our ability to develop and execute customized strategic solutions to support our client's unique goals and assess further exemplifies our commitment to creating enduring, successful partnerships.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            Our success in attaining these goals, along with our well-regarded reputation, has enabled us to forge relationships and partnerships with our clients around the United Arab Emirates. Kenan Alkabbani Real Estate serves customers in buying, selling and leasing properties.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            At Kenan Alkabbani Real Estate, we have one guiding principle: to serve our customers beyond their expectations. By partnering with our clients, we take the time to understand and assess your unique challenges and issues. We then create a complete, custom-made solution set to help you to achieve the best returns.
          </p>
        </section>

        {/* Mission, Vision, Philosophy */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Our Mission</h3>
            <p className="text-gray-700 text-base">
              We aim to guide clients through every step of their real estate journey when buying or selling property. Kenan Alkabbani Real Estate is ready to provide our clients with everything they need.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Our Vision</h3>
            <p className="text-gray-700 text-base">
              To be the UAE’s leading real estate solutions provider while delivering high-quality services across all real estate spectrums.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Our Philosophy</h3>
            <p className="text-gray-700 text-base">
              We believe in hard work, dedication, and providing the highest quality of services to achieve our ultimate goal of customer satisfaction.
            </p>
          </div>
        </section>

        {/* Practices, Experience, Why Us */}
        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Practices and Values</h3>
              <p className="text-gray-700">
                We provide the highest level of customer service with complete transparency and integrity every step of the way.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Experience and Expertise</h3>
              <p className="text-gray-700">
                Our team of professionals are experts in their roles at Kenan Alkabbani Real Estate. We continuously learn from the market and empower ourselves with new information, trends, and knowledge to provide our customers with the most accurate and timely information they need in their real estate journey.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Why Us?</h3>
            <p className="text-gray-700 mb-2">
              Whether you are a new buyer or a seasoned investor, we will provide you with the highest level of service related to your needs.
            </p>
            <p className="text-gray-700 mb-2">
              Real Estate-life experiences with extensive corporate marketing backgrounds have collectively contributed to developing our team of strategic, informed, and savvy real estate professionals –both on the buying and selling side.
            </p>
            <p className="text-gray-700 mb-2">
              Our team thoroughly understands the appropriate steps and considerations required when purchasing or selling residential or investment property, thus ensuring that the service we provide focuses on your specific circumstances.
            </p>
            <p className="text-gray-700">
              Our mandate is not to make a sale but to ensure that you, as the client, feel that you have had the most successful outcome. It is upon that which we measure our success.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 