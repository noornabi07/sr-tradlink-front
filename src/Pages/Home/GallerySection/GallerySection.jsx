const GallerySection = () => {
  const images = [
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
    "https://i.ibb.co.com/zVFCHNYh/product-2.webp",
  ];

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,128,0,0.07),transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            Our Gallery
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-6">
            A Visual Glimpse of SR Tradlink
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Explore our store, products, warehouse, and delivery operations.
          </p>
        </div>

        {/* Grid Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={src}
                alt={`gallery-${index}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Title */}
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-lg font-semibold">SR Tradlink</p>
                <p className="text-sm text-gray-200">Cattle Feed Store</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
