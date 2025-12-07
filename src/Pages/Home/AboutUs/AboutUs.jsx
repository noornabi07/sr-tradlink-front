import React from "react";

const AboutUs = () => {
  return (
    <div>
      <section id="about" class="relative py-20 bg-gray-50 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl opacity-30"></div>

        <div class="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div class="relative group">
            <div class="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl opacity-40 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              class="rounded-3xl shadow-2xl relative z-10 group-hover:scale-105 transition-all duration-700"
            />
          </div>

          <div class="space-y-6">
            <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              About{" "}
              <span class="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Our Company
              </span>
            </h2>

            <p class="text-lg text-gray-600 leading-relaxed">
              We are committed to providing premium quality products with modern
              design and innovative craftsmanship. Our mission is to deliver
              excellence and build long-lasting trust with our customers.
            </p>

            <p class="text-gray-600 leading-relaxed">
              With years of experience, we have mastered the art of creating
              world-class items that truly stand out. Every product is carefully
              designed with precision and passion.
            </p>

            <div class="grid grid-cols-2 gap-6 pt-4">
              <div class="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <h3 class="text-3xl font-bold text-green-600">10+</h3>
                <p class="text-gray-700">Years Experience</p>
              </div>

              <div class="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <h3 class="text-3xl font-bold text-green-600">5000+</h3>
                <p class="text-gray-700">Happy Clients</p>
              </div>
            </div>

            <a
              href="#"
              class="inline-block mt-4 px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
