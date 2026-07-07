import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Sparkles,
  Clock,
  Shield,
  Package,
  Wrench,
} from "lucide-react";

export function Capabilities() {
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

  const capabilities = [
    {
      icon: Users,
      title: "Expert Bartending",
      description:
        "Professional mixologists skilled in craft cocktails and classic drinks.",
    },
    {
      icon: Sparkles,
      title: "Event Management",
      description:
        "Seamless coordination from planning to execution for stress-free events.",
    },
    {
      icon: Clock,
      title: "Timely Service",
      description:
        "Fast, efficient service that keeps your guests happy and engaged.",
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description:
        "Fully licensed professionals with comprehensive event insurance.",
    },
    {
      icon: Package,
      title: "Complete Setup",
      description:
        "We bring everything—bar equipment, glassware, and supplies.",
    },
    {
      icon: Wrench,
      title: "Custom Packages",
      description:
        "Tailored bar services to match your event's theme and budget.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mt-4 max-w-4xl mx-auto">
            Dedicated Team, <span className="text-amber-500">Exceptional Service</span>
          </h2>
          <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
            We handle every detail so you can enjoy your event stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300 h-full hover:bg-zinc-900">
                {/* Icon */}
                <div className="mb-6 inline-block p-4 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors duration-300">
                  <capability.icon className="w-8 h-8 text-amber-500" />
                </div>

                {/* Title */}
                <h3 className="text-2xl text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {capability.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {capability.description}
                </p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-300 text-xl mb-6">
            From the first drink poured to the last toast, we make sure your
            event is unforgettable.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
          >
            Plan Your Event
          </a>
        </motion.div>
      </div>
    </section>
  );
}