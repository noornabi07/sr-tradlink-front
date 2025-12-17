const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-20 pb-10 overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl"></div>

      {/* Glassmorphism Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-lime-300 to-green-500 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Top Footer Content */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              এসআর ট্রেডলিংক
            </h2>
            <p className="text-gray-400 leading-relaxed">
              প্রিমিয়াম গবাদি পশুর খাদ্য, সাইলেজ, শস্য এবং খামারের পুষ্টি
              সরবরাহে আপনার বিশ্বস্ত অংশীদার।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                আমাদের সম্পর্কে
              </li>
              <li className="hover:text-white transition cursor-pointer">
                পণ্য
              </li>
              <li className="hover:text-white transition cursor-pointer">
                গ্যালারি
              </li>
              <li className="hover:text-white transition cursor-pointer">
                যোগাযোগ
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              যোগাযোগের তথ্য
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📍 ঝাড়বাড়ী, বীরগঞ্জ, দিনাজপুর </li>
              <li>📞 +880 1826147180</li>
              <li>✉️ noornabikhan100@gmail.com</li>
              <li>🕒 সকাল ৯:০০ - রাত ৯:০০</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              নিউজ লেটার
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              নতুন পণ্যের আগমনের আপডেট পেতে সাবস্ক্রাইব করুন।
            </p>

            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="আপনার ইমেল লিখুন"
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 outline-none"
              />
              <button className="px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                যোগদান করুন
              </button>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-14 mb-8 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">এসআর ট্রেডলিংক</span>.
            সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <a className="hover:text-white transition">গোপনীয়তা নীতি</a>
            <a className="hover:text-white transition">শর্তাবলী</a>
            <a className="hover:text-white transition">সমর্থন</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
