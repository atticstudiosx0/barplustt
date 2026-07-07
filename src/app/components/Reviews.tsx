import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  name: string;
  title?: string;
  event?: string;
  text: string;
  rating: number;
}

export function Reviews() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
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

  const reviews: Review[] = [
    {
      name: "Reannah Corbie",
      title: "Arthur Lok Jack Global School of Business",
      text: "Exceptional service from set-up to break-down, pleasant staff who go above and beyond. Highly recommended!",
      rating: 5,
    },
    {
      name: "Marvin Pacheco",
      title: "UWI",
      text: "Bar Plus handled my wedding bar flawlessly, accurate estimates, amazing service, and stayed within budget.",
      rating: 5,
    },
    {
      name: "Adrian & Rossana",
      event: "Wedding – 3rd November 2024 | Dennis P. Ramdhan Complex",
      text: "We couldn't have asked for a better bar catering experience at our wedding! From start to finish, the team delivered exceptional service that truly elevated our special day. The staff was incredibly attentive, professional, and a joy to work with — always pleasant and accommodating to our guests' needs. What really set them apart were the custom-crafted cocktails, thoughtfully designed to match both our wedding theme and personal tastes. Every drink felt unique and meaningful, and our guests are still raving about how delicious and creative they were! We're so grateful for their role in making our day so memorable. Highly recommended for anyone looking for top-tier bar service with a personal touch.",
      rating: 5,
    },
    {
      name: "Garvin Harewood",
      title: "Promoter/Band Leader",
      text: "Choosing the right bar service for my J'ouvert Band was a crucial decision and Bar Plus absolutely exceeded all our expectations! From the initial consultation to the last drink poured, their professionalism and dedication were truly outstanding. The bartenders weren't just skilled at mixing drinks; they were friendly, engaging and genuinely seemed to enjoy being part of our celebration. Our Masqueraders consistently commented on how wonderful they were keeping lines moving smoothly and always serving with a smile. Since then I have worked with them on other projects and the service has been consistent.",
      rating: 5,
    },
    {
      name: "Jason and Shivani",
      event: "Wedding Reception",
      text: "Hiii! A huge thank you for the amazing job you did at our wedding reception! The drinks were not only delicious but beautifully presented. Your team truly brought a touch of elegance and fun to the entire evening. Our guests couldn't stop talking about how great the cocktails were. The bar was definitely one of the most popular spots of the night! You handled everything so smoothly and with such great energy💃 Thank you again for being part of our special day and helping make it so memorable. We're so grateful and we'll definitely be recommending you to friends and family for future events! 🤗",
      rating: 5,
    },
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % reviews.length;
      } else {
        return prevIndex === 0 ? reviews.length - 1 : prevIndex - 1;
      }
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mt-4 max-w-4xl mx-auto">
            What Our <span className="text-amber-500">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied clients
            across Trinidad and Tobago.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel */}
          <div className="relative h-[500px] md:h-[450px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-amber-500/50 transition-all duration-300 group relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Quote className="w-12 h-12 text-amber-500" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: reviews[currentIndex].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-500 text-amber-500"
                        />
                      )
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    "{reviews[currentIndex].text}"
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mb-6"></div>

                  {/* Author Info */}
                  <div>
                    <p className="text-white text-xl mb-1">
                      {reviews[currentIndex].name}
                    </p>
                    {reviews[currentIndex].title && (
                      <p className="text-gray-400">
                        {reviews[currentIndex].title}
                      </p>
                    )}
                    {reviews[currentIndex].event && (
                      <p className="text-amber-500/70 italic mt-2">
                        {reviews[currentIndex].event}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-amber-500 w-8"
                    : "bg-amber-500/30 hover:bg-amber-500/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-400">
            Ready to create your own unforgettable experience?{" "}
            <a
              href="#contact"
              className="text-amber-500 hover:text-amber-400 transition-colors underline"
            >
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
