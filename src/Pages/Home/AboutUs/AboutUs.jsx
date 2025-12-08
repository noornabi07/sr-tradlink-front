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
              আমাদের{" "}
              <span class="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                দোকান সম্পর্কে
              </span>
            </h2>

            <p class="text-lg text-gray-600 leading-relaxed">
              আমরা আধুনিক নকশা এবং উদ্ভাবনী কারুশিল্প সহ প্রিমিয়াম মানের পণ্য
              সরবরাহ করতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হল উৎকর্ষতা প্রদান করা
              এবং আমাদের গ্রাহকদের সাথে দীর্ঘস্থায়ী আস্থা তৈরি করা।
            </p>

            <p class="text-gray-600 leading-relaxed">
              বছরের পর বছর অভিজ্ঞতার মাধ্যমে, আমরা বিশ্বমানের জিনিসপত্র তৈরির
              শিল্পে দক্ষতা অর্জন করেছি যা সত্যিই আলাদা। প্রতিটি পণ্য সাবধানে
              নির্ভুলতা এবং আবেগের সাথে ডিজাইন করা হয়েছে।
            </p>

            <div class="grid grid-cols-2 gap-6 pt-4">
              <div class="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <h3 class="text-3xl font-bold text-green-600">২+</h3>
                <p class="text-gray-700">বছরের অভিজ্ঞতা</p>
              </div>

              <div class="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <h3 class="text-3xl font-bold text-green-600">১৫০+</h3>
                <p class="text-gray-700">খুশি ক্লায়েন্ট</p>
              </div>
            </div>

            <a
              href="#"
              class="inline-block mt-4 px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              আরও জানুন
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
