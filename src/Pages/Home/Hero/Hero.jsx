const Hero = () => {
  return (
    <section
      id="home"
      className="pt-20 relative overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold inline-block">
              প্রথম দিন থেকেই প্রিমিয়াম কোয়ালিটি
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              আপনার পশুপালনের পুষ্টি,
              <span className="text-green-700"> স্বাভাবিকভাবেই</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              এসআর ট্রেডলিংক প্রিমিয়াম গবাদি পশুর খাদ্য সমাধান প্রদান করে যা
              স্বাস্থ্য, উৎপাদনশীলতা এবং বৃদ্ধি বৃদ্ধি করে। অঞ্চলজুড়ে কৃষকদের
              কাছে এটির গুণমান নিজেই কথা বলে।
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-800 transition-all hover:scale-105 shadow-md">
                পণ্যগুলি অন্বেষণ করুন
              </button>
              <button className="btn border-2 border-green-700 text-green-700 px-8 py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-50 transition-all shadow-md">
                যোগাযোগ করুন
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 max-w-xs sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-green-700">
                  ১৫০+
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">খুশি কৃষকরা</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-green-700">
                  ৮০+
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">পণ্যসমূহ</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-green-700">
                  ২+
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  বছরের অভিজ্ঞতা
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"></div>

            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/n-r.jpg"
                  alt="SR Logo"
                  className="w-full h-[130%] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
