import React from 'react';

const Hero = () => {
  return (
    <div>
      <section
        id="home"
        className="pt-20 relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  প্রথম দিন থেকেই প্রিমিয়াম কোয়ালিটি
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                আপনার পশুপালনের পুষ্টি,
                <span className="text-green-700"> স্বাভাবিকভাবেই</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                এসআর ট্রেডলিংক প্রিমিয়াম গবাদি পশুর খাদ্য সমাধান প্রদান করে যা
                স্বাস্থ্য, উৎপাদনশীলতা এবং বৃদ্ধি বৃদ্ধি করে। অঞ্চলজুড়ে কৃষকদের
                কাছে এটির গুণমান নিজেই কথা বলে।
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all transform hover:scale-105 hover:shadow-xl">
                  পণ্যগুলি অন্বেষণ করুন
                </button>
                <button className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all">
                  যোগাযোগ করুন
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-green-700">১৫০+</div>
                  <div className="text-gray-600 text-sm">খুশি কৃষকরা</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-700">৮০+</div>
                  <div className="text-gray-600 text-sm">পণ্যসমূহ </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-700">২+</div>
                  <div className="text-gray-600 text-sm">বছরের অভিজ্ঞতা</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <div className="bg-white p-8 rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Leaf className="w-32 h-32 text-green-700" />
              </div> */}
                <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src="../../../../public/images/sr-logo.jpeg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;