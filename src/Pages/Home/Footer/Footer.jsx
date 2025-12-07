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
            <h2 className="text-3xl font-bold text-white mb-4">SR Tradlink</h2>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner in premium cattle feed, silage, grains & farm
              nutrition supplies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                About Us
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Products
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Gallery
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📍 Jharbari, dinajpur, Bangladesh</li>
              <li>📞 +880 1826147180</li>
              <li>✉️ noornabikhan100@gmail.com</li>
              <li>🕒 9:00 AM – 9:00 PM</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get updates on new product arrivals.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 outline-none"
              />
              <button className="px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                Join
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
            <span className="text-white font-semibold">SR Tradlink</span>. All
            Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <a className="hover:text-white transition">Privacy Policy</a>
            <a className="hover:text-white transition">Terms</a>
            <a className="hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
