import BackToTop from "../../Shared/BackToTop/BackToTop";
import AboutUs from "../AboutUs/AboutUs";
import Choose from "../Choose/Choose";
import ContactSection from "../Contact/Contact";
import Footer from "../Footer/Footer";
import GallerySection from "../GallerySection/GallerySection";
import Hero from "../Hero/Hero";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <Choose></Choose>
      <ProductsGrid></ProductsGrid>
      {/* <GallerySection></GallerySection> */}
      <AboutUs></AboutUs>
      <ContactSection></ContactSection>
      <Footer></Footer>
      <BackToTop></BackToTop>
    </>
  );
};

export default Home;
