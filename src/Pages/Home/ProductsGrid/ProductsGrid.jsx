import { useState } from "react";

const ProductsGrid = () => {
  const products = [
    {
      name: "Premium Cattle Feed",
      subtitle: "High-nutrition balanced feed",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Best Seller",
    },
    {
      name: "Dairy Booster Mix",
      subtitle: "Enhances milk production",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Top Rated",
    },
    {
      name: "Calf Starter Feed",
      subtitle: "Boosts healthy calf growth",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "New Arrival",
    },
    {
      name: "Protein Rich Pellet",
      subtitle: "Extra protein for strong cattle",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Hot",
    },
    {
      name: "SR Elite Feed",
      subtitle: "Premium performance blend",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Premium",
    },
    {
      name: "Mineral Mix Pack",
      subtitle: "Essential minerals for cattle health",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Farmer's Choice",
    },
    {
      name: "Omega Boost Mix",
      subtitle: "Improves cattle immunity",
      price: "₹1150 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Recommended",
    },
    {
      name: "Fiber Rich Feed",
      subtitle: "Better digestion & energy",
      price: "₹780 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "Mineral Mix Pack",
      subtitle: "Essential minerals for cattle health",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Farmer's Choice",
    },
    {
      name: "Omega Boost Mix",
      subtitle: "Improves cattle immunity",
      price: "₹1150 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Recommended",
    },
    {
      name: "Fiber Rich Feed",
      subtitle: "Better digestion & energy",
      price: "₹780 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "Mineral Mix Pack",
      subtitle: "Essential minerals for cattle health",
      price: "₹850 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Farmer's Choice",
    },
    {
      name: "Omega Boost Mix",
      subtitle: "Improves cattle immunity",
      price: "₹1150 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Recommended",
    },
    {
      name: "Fiber Rich Feed",
      subtitle: "Better digestion & energy",
      price: "₹780 / 50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="products" className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,128,0,0.06),transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            Our Products
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-6">
            Premium Cattle Feed Catalog
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Explore our wide range of high-quality cattle feed products from SR
            Tradlink.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProducts.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-58 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="group-hover:scale-110 w-58 h-62 m-auto transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{product.subtitle}</p>
                <p className="text-green-700 font-bold text-lg mt-2 mb-4">
                  {product.price}
                </p>

                <button className="w-full py-3 rounded-xl font-semibold border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}

        <div className="flex justify-center mt-12 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-5 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 disabled:opacity-40"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-5 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:opacity-40"
            disabled={currentPage === totalPages}
          >
            See More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
