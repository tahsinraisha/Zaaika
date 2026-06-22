import Hero from "@/components/Hero";
import PopularStrip from "@/components/PopularStrip";
import MenuSection from "@/components/MenuSection";
import About from "@/components/About";
import CartDrawer from "@/components/CartDrawer";
import FloatingCartButton from "@/components/FloatingCartButton";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularStrip />
      <MenuSection />
      <About />
      <CartDrawer />
      <FloatingCartButton />
    </>
  );
}
