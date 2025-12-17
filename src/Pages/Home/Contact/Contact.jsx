import { BiPhoneCall } from "react-icons/bi";
import { BsEnvelopeFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge badge-success badge-lg py-3 px-5 text-black font-semibold">
            যোগাযোগ করুন
          </span>

          <h2 className="text-4xl font-bold mt-6">
            এসআর ট্রেডলিংকের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-gray-600 text-lg mt-3 max-w-xl mx-auto">
            অর্ডারের ক্ষেত্রে আপনাকে সাহায্য করার জন্য আমরা সর্বদা এখানে আছি।
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <div className="card bg-white shadow-xl rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">যোগাযোগের তথ্য</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <BiPhoneCall className="text-3xl text-green-600" />
                <p className="text-lg">+৮৮০ ১৮২৬১৪৭১৮০</p>
              </div>

              <div className="flex items-center gap-4">
                <BsEnvelopeFill className="text-3xl text-green-600" />
                <p className="text-lg">noornabikhan100@gmail.com</p>
              </div>

              <div className="flex items-center gap-4">
                <GoLocation className="text-3xl text-green-600" />
                <p className="text-lg">ঝাড়বাড়ী, বীরগঞ্জ, দিনাজপুর </p>
              </div>
            </div>
          </div>

          {/* Contact US */}

          <div className="relative flex justify-center">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-white/20"></div>

            {/* Maps Wrapper */}
            <div className="relative w-full max-w-6xl p-6">
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 drop-shadow-sm">
                গুগল ম্যাপে আমাদের খুঁজুন
              </h3>

              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.25)] border border-white/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268.2009828345601!2d88.69285101239805!3d25.996551167496726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4a37f4fd0d773%3A0x273a9c1da148e3cf!2z4Kau4KeH4Ka44Ka-4Kaw4KeN4Ka4IOCmsOCmvuCmuOCnh-CmsiDgpo_gpqjgp43gpqEg4KaX4Kar4KeB4KawIOCmn-CnjeCmsOCnh-CmoeCmvuCmsOCnjeCmuA!5e1!3m2!1sen!2sbd!4v1765088096212!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  className="rounded-3xl"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
