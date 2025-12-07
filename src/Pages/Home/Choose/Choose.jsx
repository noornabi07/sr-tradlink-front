const Choose = () => {
  return (
    <section id="choose" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,128,0,0.05),transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-6">
            Trusted Cattle Feed You Can Rely On
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            SR Tradlink ensures top-quality feed that boosts cattle growth,
            improves milk production, and keeps your livestock
            healthy—naturally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🥛
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Boosts Milk Production
            </h3>
            <p className="text-gray-600">
              Scientifically formulated feeds that help increase milk yield
              naturally.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🌾
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Premium Quality Ingredients
            </h3>
            <p className="text-gray-600">
              We use only the best raw materials—fresh, safe, and tested.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🚛
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Fast & Reliable Delivery
            </h3>
            <p className="text-gray-600">
              Bulk or retail—your orders reach you quickly and safely.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🔍
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              100% Transparent Quality
            </h3>
            <p className="text-gray-600">
              Every batch is checked and verified—no compromise on quality.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              💰
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Best Prices in Market
            </h3>
            <p className="text-gray-600">
              Wholesale & retail rates that give maximum value to farmers.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🤝
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Trusted by 500+ Farmers
            </h3>
            <p className="text-gray-600">
              Years of experience serving farmers with consistent performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;