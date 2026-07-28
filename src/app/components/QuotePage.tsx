import { motion } from "motion/react";
import { QuoteForm } from "./QuoteForm";
import { Toaster } from "./ui/sonner";

interface QuotePageProps {
  onBack: () => void;
}

export function QuotePage({ onBack }: QuotePageProps) {
  return (
    <section className="min-h-screen py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
          >
            ← Back to homepage
          </button> */}
          <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-4">
            Request a Quote
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Tell us about your event
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Provide your event details, budget preferences, and desired experience so we can send you a custom quote.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-amber-500/10">
          <QuoteForm />
        </div>
      </div>

      {/* Renders the success/error toasts on the quote page itself */}
      <Toaster position="top-center" richColors />
    </section>
  );
}
