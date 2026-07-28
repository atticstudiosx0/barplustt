import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, Instagram, Facebook } from "lucide-react";

interface CTAProps {
  onNavigateToQuotePage?: () => void;
}

export function CTA({ onNavigateToQuotePage }: CTAProps) {
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
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get In Touch
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready to{" "}
            <span className="text-amber-500">Raise the Bar?</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Contact Bar Plus Services today:
          </motion.p>

          {/* Contact Information Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Email */}
            <a
              href="mailto:barplusservices@gmail.com"
              className="bg-zinc-950 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 group"
            >
              <Mail className="w-8 h-8 text-amber-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white mb-2">Email</h3>
              <p className="text-gray-400 text-sm break-all">
                barplusservices@gmail.com
              </p>
            </a>

            {/* Phone */}
            <a
              href="tel:18687379390"
              className="bg-zinc-950 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 group"
            >
              <Phone className="w-8 h-8 text-amber-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white mb-2">Call Us</h3>
              <p className="text-gray-400">+1 (868) 737-9390</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/18687379390"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-950 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 group"
            >
              <MessageCircle className="w-8 h-8 text-amber-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white mb-2">WhatsApp</h3>
              <p className="text-gray-400">+1 (868) 737-9390</p>
            </a>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-300 mb-4">
              Or send us a message on social media:
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/BarPlusServicesTT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-950 border border-white/10 rounded-full hover:border-amber-500/50 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-white">@BarPlusServicesTT</span>
              </a>
              <a
                href="https://www.facebook.com/BarPlusServicesTT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-950 border border-white/10 rounded-full hover:border-amber-500/50 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-white">@BarPlusServicesTT</span>
              </a>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button
              onClick={onNavigateToQuotePage}
              className="inline-block px-10 py-5 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 text-lg"
            >
              Request a Quote
            </button>
            <p className="text-gray-500 mt-6">
              Available for events across Trinidad and Tobago
            </p>
          </motion.div>

          {/* Slogan */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-2xl md:text-3xl text-gray-300 italic">
              "Bar Plus Services:{" "}
              <span className="text-amber-500">
                Where Great Drinks Meet Great Memories
              </span>
              "
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}