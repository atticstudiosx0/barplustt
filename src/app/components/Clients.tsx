import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Building2, GraduationCap, Wifi, Smartphone } from "lucide-react";
import usEmbassyLogo from "figma:asset/8fa024c7262bb5906cd38fc3b5b7bbbca06520ad.png";
import scotiabankLogo from "figma:asset/db043ae5092426d2dc8b757319f33cffaf057ab3.png";
import flowLogo from "figma:asset/fc0d9fcedc2b611080eb25324ae2daaa2b445ba6.png";
import yumaLogo from "figma:asset/a403133dde068f36f4fe0709ce9fbcbc9111225c.png";
import kairiLogo from "figma:asset/3cf406cca808d838f38b8350d17b3a39ee7cc26a.png";
import mapleLeafLogo from "figma:asset/2607bfaa1c3a41782f2974217c1b940bd50482f4.png";
import uwiLogo from "figma:asset/2c603bb0d3ebfc5b4713d6262d20a66ea3d3588a.png";
import tcjLogo from "../../assets/tcje.png";

export function Clients() {
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

  const clients = [
    { name: "US Embassy", icon: Building2, image: usEmbassyLogo },
    { name: "Scotiabank", icon: Building2, image: scotiabankLogo },
    { name: "FLOW", icon: Wifi, image: flowLogo },
    { name: "YUMA Vibe", icon: Smartphone, image: yumaLogo },
    { name: "Kairi People", icon: Building2, image: kairiLogo },
    { name: "Maple Leaf Int. School", icon: GraduationCap, image: mapleLeafLogo },
    { name: "UWI Arthur Lok Jack", icon: GraduationCap, image: uwiLogo },
    { name: "TCJ Events", icon: Building2, image: tcjLogo },
  ];

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden border-y border-white/5"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 0), linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Trusted By
          </span>
          <h2 className="text-4xl md:text-5xl text-white mt-4">
            Our <span className="text-amber-500">Valued Clients</span>
          </h2>
          <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
            We're honored to serve some of Trinidad and Tobago's most respected
            organizations and institutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-zinc-950 border border-white/10 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:bg-zinc-900">
                {/* Icon or Image */}
                {client.image ? (
                  <div className="mb-4 w-32 h-32 flex items-center justify-center">
                    <img 
                      src={client.image} 
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-colors duration-300">
                    <client.icon className="w-8 h-8 text-amber-500" />
                  </div>
                )}

                {/* Client Name */}
                <h3 className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {client.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-400 text-lg">
            Join our growing list of satisfied clients who trust us with their
            most important events.
          </p>
        </motion.div>
      </div>
    </section>
  );
}