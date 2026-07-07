import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { sendEmailViaWeb3Forms } from "../utils/emailService";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate email on change
    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final email validation
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);

    // Format the email content
    const emailBody = `
New Quote Request from Bar Plus Services Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company/Organisation: ${formData.company || "N/A"}
Event Type: ${formData.eventType}
Event Date: ${formData.eventDate}
Expected Guest Count: ${formData.guestCount}

Additional Details:
${formData.message || "N/A"}
    `;

try {
  const success = await sendEmailViaWeb3Forms(formData);
  
  if (success) {
    toast.success("Your quote request has been received! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      message: "",
    });
    setEmailError("");
    onClose();
  } else {
    toast.error("Something went wrong. Please try again.");
  }
  setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-[#0a0a0a] border border-amber-500/30 rounded-2xl w-full max-w-2xl my-8 relative shadow-2xl shadow-amber-500/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative glow effect - only on edges */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl opacity-20 blur-xl -z-10"></div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="relative p-6 md:p-8">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 mb-3">
                    Get In Touch
                  </span>
                  <h2 className="text-white">Request Your Quote</h2>
                  <p className="text-gray-400 mt-2">Tell us about your event and we'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">
                        Full Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Full Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">
                        Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 bg-black/50 border rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                          emailError 
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                            : "border-gray-800 focus:border-amber-500 focus:ring-amber-500/20"
                        }`}
                        placeholder="Email"
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 mb-2">
                        Phone <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Number"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-gray-300 mb-2">
                        Company/Organisation
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Company/Organisation"
                      />
                    </div>
                  </div>

                  {/* Event Type and Date */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="eventType" className="block text-gray-300 mb-2">
                        Event Type <span className="text-amber-500">*</span>
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      >
                        <option value="">Select event type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Carnival Fete">Carnival Fete</option>
                        <option value="Private Party">Private Party</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="eventDate" className="block text-gray-300 mb-2">
                        Event Date <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label htmlFor="guestCount" className="block text-gray-300 mb-2">
                      Expected Guest Count <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      required
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="Expected Guest Count"
                      min="1"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                      placeholder="Tell us more about your event..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !!emailError}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/50"
                  >
                    {isSubmitting ? "Sending..." : "Submit Quote Request"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}