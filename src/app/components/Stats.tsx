import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Award, Calendar, Users, Star } from "lucide-react";

export function Stats() {
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

  const stats = [
    {
      icon: Calendar,
      value: "8+",
      label: "Years Experience",
      description: "Serving since 2017",
    },
    {
      icon: Award,
      value: "500+",
      label: "Events Served",
      description: "Across Trinidad & Tobago",
    },
    {
      icon: Users,
      value: "50+",
      label: "Corporate Clients",
      description: "Including Fortune 500 companies",
    },
    {
      icon: Star,
      value: "100%",
      label: "Satisfaction Rate",
      description: "Stress-free events guaranteed",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden border-y border-white/5"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl text-white mt-4">
            Numbers That Speak for{" "}
            <span className="text-amber-500">Themselves</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="mb-6 inline-block p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-amber-500" />
                </div>

                {/* Value */}
                <div className="text-5xl text-white mb-2">{stat.value}</div>

                {/* Label */}
                <div className="text-xl text-gray-300 mb-2">{stat.label}</div>

                {/* Description */}
                <div className="text-gray-500">{stat.description}</div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-tr-2xl transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}