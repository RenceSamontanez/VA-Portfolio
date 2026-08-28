"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import ProcessObject from "@/components/ProcessObject";
import Services from "@/components/Services";
import Thoughts from "@/components/Thoughts";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ShowreelModal from "@/components/ShowreelModal";

export default function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Work />
      
      {/* 5-Phase Interactive Modular Cube Process */}
      <ProcessObject />

      <Services />

      <Thoughts />

      <Testimonials />
      
      <ContactForm />

      <Footer />
      
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
    </main>
  );
}