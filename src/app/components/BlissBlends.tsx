import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Wine, DollarSign } from "lucide-react";
import mojitoImage from "../../assets/mojito1.jpeg";
import martiniImage from "../../assets/martini1.jpeg";
import blueHawaiianImage from "../../assets/blue_hawaiian1.jpeg";
import margaritaImage from "../../assets/margarita1.jpeg";
import amarettoSourImage from "../../assets/amaretto_sour1.jpeg";
//import strawberryMojitoImage from "figma:asset/ec55fe09d58b6cc31b3be64993d2e10475e01520.png";

interface Cocktail {
  name: string;
  image: string;
  price350: number;
  price750: number;
  isChristmas?: boolean;
}

export function BlissBlends() {
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

  const cocktails: Cocktail[] = [
    {
      name: "Mango Margarita",
      image: margaritaImage,
      price350: 100,
      price750: 250,
    },
    {
      name: "Blue Hawaiian",
      image: blueHawaiianImage,
      price350: 100,
      price750: 250,
    },
    // {
    //   name: "Triple Berry Caipirinha",
    //   image:
    //     "https://images.unsplash.com/photo-1725790803859-edc661663bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJyeSUyMGNhaXBpcmluaGElMjBjb2NrdGFpbHxlbnwxfHx8fDE3NjAxMzMxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   price350: 75,
    //   price750: 185,
    // },
    {
      name: "Strawberry Mojito",
      image: mojitoImage,
      price350: 100,
      price750: 250,
    },
    // {
    //   name: "Sorrel Daiquiri",
    //   image:
    //     "https://images.unsplash.com/photo-1630823184409-1c6014968038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3JyZWwlMjBoaWJpc2N1cyUyMGRyaW5rfGVufDF8fHx8MTc2MDEzMzEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   price350: 75,
    //   price750: 185,
    //   isChristmas: true,
    // },
    // {
    //   name: "Coquito",
    //   image:
    //     "https://images.unsplash.com/photo-1708195992982-68e5420e089e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3F1aXRvJTIwY29jb251dCUyMGRyaW5rfGVufDF8fHx8MTc2MDEzMzEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   price350: 75,
    //   price750: 185,
    //   isChristmas: true,
    // },
    {
      name: "Amaretto Sour",
      image: amarettoSourImage,
      price350: 100,
      price750: 250,
    },
    {
      name: "Espresso Martini",
      image: martiniImage,
      price350: 100,
      price750: 250,
    },
    // {
    //   name: "Strawberry Mojito",
    //   image: strawberryMojitoImage,
    //   price350: 90,
    //   price750: 225,
    // },
  ];

  return (
    <section
      id="bliss-blends"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Our Signature Products
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mt-4 max-w-4xl mx-auto">
            Bliss Blends <span className="text-amber-500">Cocktails</span>
          </h2>
          <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto">
            Freshly blended, bottled cocktails powered by Bar Plus Services.
            Perfect for relaxing at home, on vacation, hosting intimate dinners,
            social gatherings, or a beach lime.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/50 transition-all duration-300">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-white mb-2">Natural Ingredients</h3>
            <p className="text-gray-400 text-sm">
              No additives or preservatives - just pure, natural taste
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/50 transition-all duration-300">
            <Wine className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-white mb-2">Restaurant Quality</h3>
            <p className="text-gray-400 text-sm">
              Experience the authentic taste as if dining at a fine restaurant
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/50 transition-all duration-300">
            <DollarSign className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-white mb-2">Two Sizes Available</h3>
            <p className="text-gray-400 text-sm">
              Choose from 350ml or 750ml bottles to suit your occasion
            </p>
          </div>
        </motion.div>

        {/* Cocktails Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {cocktails.map((cocktail, index) => (
            <motion.div
              key={index}
              className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={cocktail.image}
                    alt={cocktail.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Christmas Badge */}
                  {cocktail.isChristmas && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-white text-xs">
                      🎄 Christmas Blend
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl text-white mb-4 group-hover:text-amber-500 transition-colors duration-300">
                    {cocktail.name}
                  </h3>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-gray-300 border-b border-white/10 pb-2">
                      <span className="text-sm">350ml</span>
                      <span className="text-amber-500">${cocktail.price350}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="text-sm">750ml</span>
                      <span className="text-amber-500">${cocktail.price750}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-zinc-950 border border-amber-500/30 rounded-2xl p-8">
            <h3 className="text-2xl md:text-3xl text-white mb-4">
              Explore the <span className="text-amber-500">BLISSFUL</span>{" "}
              Experience
            </h3>
            <p className="text-gray-300 mb-6">
              All eight blends are crafted with care, offering a variety of
              fruity cocktails and conventional favorites. Perfect for any
              occasion.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
            >
              Order Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
