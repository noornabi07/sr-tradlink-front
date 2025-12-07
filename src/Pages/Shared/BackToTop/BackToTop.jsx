import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-7 right-7 z-50 
            bg-green-600 hover:bg-green-700 
            text-white p-4 rounded-full 
            shadow-xl shadow-green-500/30 
            transition-all duration-300
            hover:scale-110
          "
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
