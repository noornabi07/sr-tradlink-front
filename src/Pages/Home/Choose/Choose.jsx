const Choose = () => {
  return (
    <section id="choose" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,128,0,0.05),transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            কেনো বাছাই করবেন
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-6">
            নির্ভরযোগ্য গবাদি পশুর খাদ্য যা আপনি নির্ভর করতে পারেন
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            এসআর ট্রেডলিংক উচ্চমানের খাদ্য নিশ্চিত করে যা গবাদি পশুর বৃদ্ধি
            বৃদ্ধি করে, দুধ উৎপাদন উন্নত করে এবং আপনার গবাদি পশুকে সুস্থ
            রাখে—স্বাভাবিকভাবেই।
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🥛
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              দুধ উৎপাদন বৃদ্ধি করে
            </h3>
            <p className="text-gray-600">
              বৈজ্ঞানিকভাবে তৈরি খাদ্য যা প্রাকৃতিকভাবে দুধের উৎপাদন বৃদ্ধিতে
              সাহায্য করে।
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🌾
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              প্রিমিয়াম মানের উপকরণ
            </h3>
            <p className="text-gray-600">
              আমরা শুধুমাত্র সেরা কাঁচামাল ব্যবহার করি—তাজা, নিরাপদ এবং
              পরীক্ষিত।
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🚛
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              দ্রুত এবং নির্ভরযোগ্য ডেলিভারি
            </h3>
            <p className="text-gray-600">
              পাইকারি বা খুচরা—আপনার অর্ডারগুলি দ্রুত এবং নিরাপদে আপনার কাছে
              পৌঁছে যাবে।
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🔍
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              ১০০% স্বচ্ছ গুণমান
            </h3>
            <p className="text-gray-600">
              প্রতিটি ব্যাচ পরীক্ষা-নিরীক্ষা করা হয় - মানের সাথে কোনও আপস করা
              হয় না।
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              💰
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              বাজারে সেরা দাম
            </h3>
            <p className="text-gray-600">
              পাইকারি ও খুচরা মূল্য যা কৃষকদের সর্বোচ্চ মূল্য দেয়।
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5 text-3xl font-bold">
              🤝
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              ১৫০+ কৃষকের বিশ্বস্ত
            </h3>
            <p className="text-gray-600">
              ধারাবাহিক কর্মক্ষমতা সহ কৃষকদের সেবা করার বছরের অভিজ্ঞতা।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;