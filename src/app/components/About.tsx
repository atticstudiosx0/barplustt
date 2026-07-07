import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import storyImage from "figma:asset/3acc98494a6f1ce94d8f2533e09262e4ea5277cb.png";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src={storyImage}
                alt="Bar Plus Services team member"
                className="w-full h-[500px] object-cover object-[center_60%] rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-amber-500/30">
                <p className="text-4xl text-amber-500 mb-1">500+</p>
                <p className="text-gray-300">Events Served</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our Story
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Making Every Event{" "}
              <span className="text-amber-500">Unforgettable</span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-gray-300 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                At Bar Plus Services, we make it our mission to bring
                outstanding bar and beverage catering to every celebration—corporate events, weddings, Carnival fetes, or
                private parties.
              </p>

              <p>
                Since 2017, we've proudly served over 500 events across Trinidad
                and Tobago. We have been trusted by our loyal clients including
                the US Embassy, Scotiabank, FLOW, YUMA Vibe, Kairi People, Maple
                Leaf International School and the UWI-Arthur Lok Jack Global
                School of Business to name a few.
              </p>

              <p>
                With a dedicated team skilled in bartending and event
                management, we handle every detail so you can enjoy your event
                stress-free. From the first drink poured to the last toast, we
                make sure your event is unforgettable.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}