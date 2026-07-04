"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: true,
    });

    // Update ScrollTrigger on every Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker instead of requestAnimationFrame
    const update = (time) => {
      lenis.raf(time * 1000); // GSAP gives time in seconds
    };

    gsap.ticker.add(update);

    // Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}