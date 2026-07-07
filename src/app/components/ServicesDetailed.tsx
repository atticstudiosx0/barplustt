import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Wine,
  Calendar,
  Users,
  Check,
  Briefcase,
  Heart,
  PartyPopper,
  UserPlus,
  Award,
  Smile,
  ShieldCheck,
  Clock,
} from "lucide-react";
import staffImage from "figma:asset/27983012fd48aa5f2c5b1d43c387c2988b820ec1.png";
import barServicesImage from "figma:asset/1dece309e16771ba9eb63918f2a7c3bd44ef8c32.png";

export function ServicesDetailed() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const services = [
    {
      icon: Wine,
      title: "Professional Bar Services",
      description:
        "Managing a bar is an art, and we're the masters. With Bar Plus Services, you can sit back, relax, and enjoy your event while our team does all the work.",
      image: barServicesImage,
      features: [
        "Fully stocked open bars",
        "Cash bars",
        "Custom branded bars",
        "Signature cocktail design",
        "Beverage consultation (free with your booking!)",
      ],
      highlight:
        "Bring your own alcohol or let us supply it for you, either way, you keep any leftover stock. Our professional bartenders and mixologists stay on top of new trends and timeless classics to keep your guests sipping and smiling.",
      eventTypes: [
        { icon: Briefcase, name: "Corporate Events" },
        { icon: Heart, name: "Weddings" },
        { icon: PartyPopper, name: "Carnival Fetes" },
        { icon: UserPlus, name: "Private Parties" },
      ],
    },
    {
      icon: Calendar,
      title: "Event Planning & Coordination",
      description:
        "Dreaming of a stress-free event? We handle it all, from venue sourcing and décor to entertainment and event management on the day.",
      image:
        "https://images.unsplash.com/photo-1755704282977-340323fa52df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbnQlMjBwYXJ0eXxlbnwxfHx8fDE3NTk4Nzc1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: [
        "Venue sourcing and selection",
        "Event décor and styling",
        "Entertainment coordination",
        "On-the-day event management",
        "Trusted supplier network",
      ],
      highlight:
        "Our team and trusted suppliers make your vision a reality, flawlessly and on budget. All you have to worry about is looking your best—we handle the rest.",
      eventTypes: [
        { icon: Briefcase, name: "Product Launches" },
        { icon: Heart, name: "Anniversaries" },
        { icon: PartyPopper, name: "Birthday Parties" },
        { icon: UserPlus, name: "Fundraisers" },
      ],
    },
    {
      icon: Users,
      title: "Professional Staffing",
      description:
        "A great event runs on great people. Our friendly, professional staff ensures every detail is handled with care.",
      image: staffImage,
      features: [
        "Expert bartenders",
        "Experienced wait staff",
        "Ushers & registration support",
        "Professional event coordinators",
        "Customer service specialists",
      ],
      highlight:
        "Our team is trained to handle every detail so you can focus on making memories with your guests.",
      eventTypes: [
        { icon: Award, name: "Highly Trained" },
        { icon: Smile, name: "Friendly & Personable" },
        { icon: ShieldCheck, name: "Licensed & Insured" },
        { icon: Clock, name: "Punctual & Reliable" },
      ],
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mt-4 max-w-4xl mx-auto">
            Comprehensive Event{" "}
            <span className="text-amber-500">Solutions</span>
          </h2>
          <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
            From professional bar services to complete event planning, we're
            your one-stop solution for unforgettable celebrations.
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Image Side */}
              <div
                className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="relative group">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl"></div>

                  {/* Icon on Image */}
                  <div className="absolute top-6 left-6 p-4 bg-black/80 backdrop-blur-sm rounded-xl border border-amber-500/30">
                    <service.icon className="w-8 h-8 text-amber-500" />
                  </div>

                  {/* Event Types Badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-amber-500/30">
                      <p className="text-sm text-gray-400 mb-2">
                        {service.title === "Professional Staffing" ? "Our team is:" : "Perfect for:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.eventTypes.map((type, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full"
                          >
                            <type.icon className="w-3 h-3" />
                            <span>{type.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  animate={
                    isVisible
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? 30 : -30 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-amber-500/10 rounded-full">
                          <Check className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlight Box */}
                  <div className="bg-zinc-950 border border-amber-500/30 rounded-xl p-6 mt-6">
                    <p className="text-gray-300 leading-relaxed italic">
                      {service.highlight}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}