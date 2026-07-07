import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Target, Sparkles } from "lucide-react";

export function Vision() {
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
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mt-4 max-w-4xl mx-auto">
            Vision & <span className="text-amber-500">Mission</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Vision */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-amber-500/50 transition-all duration-300 h-full">
              {/* Icon */}
              <div className="mb-6 inline-block p-4 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors duration-300">
                <Target className="w-10 h-10 text-amber-500" />
              </div>

              {/* Title */}
              <h3 className="text-3xl text-white mb-4 group-hover:text-amber-500 transition-colors duration-300">
                Our Vision
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                To become the Caribbean's leading bar and event services
                company, offering innovative, out-of-the-box experiences for
                every client.
              </p>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-700"></div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-amber-500/50 transition-all duration-300 h-full">
              {/* Icon */}
              <div className="mb-6 inline-block p-4 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors duration-300">
                <Sparkles className="w-10 h-10 text-amber-500" />
              </div>

              {/* Title */}
              <h3 className="text-3xl text-white mb-4 group-hover:text-amber-500 transition-colors duration-300">
                Our Mission
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                To deliver the ultimate 'wow' factor through exceptional bar
                services, creative event experiences, and unforgettable
                customer service.
              </p>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-700"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
