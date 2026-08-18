import { useState, useMemo } from "react";

const ProductsGrid = () => {
  const products = [
    {
      name: "Vhusi",
      subtitle: "High-nutrition Mota Vhusi",
      price: "50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Hot",
    },
    {
      name: "Chola Vhusi",
      subtitle: "High-nutrition Chola Vhusi",
      price: "60kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Hot",
    },
    {
      name: "Akari Dhan",
      subtitle: "Boosts healthy calf growth",
      price: "20kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Hot",
    },
    {
      name: "Soyameel",
      subtitle: "High-nutrition Soyameel",
      price: "70kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Hot",
    },
    {
      name: "Soyameel vhusi-soyahance",
      subtitle: "Premium performance blend",
      price: "50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Premium",
    },
    {
      name: "Sorisa Khoil",
      subtitle: "Premium performance blend",
      price: "55kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Farmer's Choice",
    },
    {
      name: "Medicine",
      subtitle: "Improves cattle immunity",
      price: "900 per pack",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Hot",
    },
    {
      name: "Protin Mix",
      subtitle: "Better digestion & energy",
      price: "90kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "DRB - Bran",
      subtitle: "Essential minerals for cattle health",
      price: "35kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Farmer's Choice",
    },
    {
      name: "Broyler Feed",
      subtitle: "Improves cattle immunity",
      price: "70kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Recommended",
    },
    {
      name: "Zero Feed",
      subtitle: "Better digestion & energy",
      price: "50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "Fish Feed",
      subtitle: "Essential minerals for fish health",
      price: "60kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Farmer's Choice",
    },
    {
      name: "Meet Cow Feed",
      subtitle: "Improves cattle immunity",
      price: "60kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Recommended",
    },
    {
      name: "Milk Cow Feed",
      subtitle: "Better digestion & energy",
      price: "60kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "khudi",
      subtitle: "Better digestion & energy",
      price: "35kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Musur Vanga",
      subtitle: "Better digestion & energy",
      price: "55kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "Musur Dal",
      subtitle: "Better digestion & energy",
      price: "90kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "Maskalai",
      subtitle: "Better digestion & energy",
      price: "150kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
    {
      name: "Musur Vanga",
      subtitle: "Better digestion & energy",
      price: "55kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Pakhir Mix",
      subtitle: "Better digestion & energy",
      price: "50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Musur Vanga",
      subtitle: "Better digestion & energy",
      price: "55kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Vuttar Atta",
      subtitle: "Better digestion & energy",
      price: "35kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Dabli But",
      subtitle: "Better digestion & energy",
      price: "50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Deshi Chola But",
      subtitle: "Better digestion & energy",
      price: "90kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Rice",
      subtitle: "Better digestion & energy",
      price: "70kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Karpet",
      subtitle: "Better digestion & energy",
      price: "850 per pack",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Zinc",
      subtitle: "Better digestion & energy",
      price: "120kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
     {
      name: "Mix vhusi",
      subtitle: "Better digestion & energy",
      price: "50kg",
      image: "https://i.ibb.co.com/Nnbkkb0z/product-1.webp",
      badge: "Balanced",
    },
  ]

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Search filter (Bangla + Banglish friendly)
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const term = searchTerm.toLowerCase();

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.subtitle.toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="products" className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,128,0,0.06),transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            আমাদের পণ্য
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-6">
            প্রিমিয়াম গবাদি পশুর খাদ্য ক্যাটালগ
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            এস আর থেকে আমাদের উচ্চমানের গবাদি পশুর খাদ্য পণ্যের বিস্তৃত পরিসর
            ঘুরে দেখুন।
          </p>
        </div>

        {/* 🔍 Search box */}
        <div className="flex justify-center mb-14">
          <input
            type="text"
            placeholder="🔍 পণ্যের নাম লিখুন (Bangla / Banglish)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // search করলে page reset
            }}
            className="w-full max-w-xl px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 shadow-sm"
          />
        </div>

        {/* Products */}
        {displayedProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            😔 কোনো পণ্য পাওয়া যায়নি
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedProducts.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
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

                <div className="p-7">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.subtitle}
                  </p>
                  <p className="text-green-700 font-bold text-lg mt-2 mb-4">
                    {product.price}
                  </p>

                  <button className="w-full py-3 rounded-xl font-semibold border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300">
                    বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 disabled:opacity-40"
            >
              পূর্ববর্তী
            </button>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-5 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:opacity-40"
            >
              আরও পণ্য দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
