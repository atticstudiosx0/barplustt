import { useState } from "react";
import { toast } from "sonner";
import { sendEmailViaWeb3Forms } from "../utils/emailService";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventVenue: "",
  sameVenue: "",
  eventDate: "",
  eventTime: "",
  guestCount: "",
  serviceInterest: "",
  budgetPriority: "",
  drinkingPreference: "",
  lastingImpression: "",
  cocktailPreference: "",
  desiredBudget: "",
  message: "",
};

type FormData = typeof initialFormData;
type FieldErrors = Partial<Record<keyof FormData, string>>;

interface QuoteFormProps {
  onSuccess?: () => void;
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function QuoteForm({ onSuccess }: QuoteFormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const isWedding = formData.eventType === "Wedding";

  const validateField = (name: keyof FormData, value: string, data: FormData): string => {
    const trimmed = value.trim();

    // Conditional fields: only one of these is shown/required at a time.
    if (name === "sameVenue" && data.eventType !== "Wedding") return "";
    if (name === "eventDate" && data.eventType === "Wedding") return "";

    if (!trimmed) return "This field is required";

    if (name === "email" && !validateEmail(trimmed)) {
      return "Please enter a valid email address";
    }

    if (name === "guestCount" && Number(trimmed) < 1) {
      return "Please enter a valid number of guests";
    }

    return "";
  };

  const validateAll = (data: FormData): FieldErrors => {
    const errors: FieldErrors = {};
    (Object.keys(data) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, data[key], data);
      if (error) errors[key] = error;
    });
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    const nextFormData: FormData = {
      ...formData,
      [fieldName]: value,
    };

    if (fieldName === "eventType" && value !== "Wedding") {
      nextFormData.sameVenue = "";
    }

    setFormData(nextFormData);

    // Live-clear a field's error once it becomes valid.
    setFieldErrors((prev) => {
      const next = { ...prev };
      const error = validateField(fieldName, value, nextFormData);
      if (error) {
        next[fieldName] = error;
      } else {
        delete next[fieldName];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateAll(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fill in all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendEmailViaWeb3Forms(formData);

      if (success) {
        toast.success("Your quote request has been received! We'll contact you soon.");
        setFormData(initialFormData);
        setFieldErrors({});
        onSuccess?.();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared input styling; border turns red when the field has an error.
  const fieldClass = (field: keyof FormData, extra = "") =>
    `w-full px-4 py-2.5 bg-black/50 border rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${extra} ${
      fieldErrors[field]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-800 focus:border-amber-500 focus:ring-amber-500/20"
    }`;

  const FieldError = ({ field }: { field: keyof FormData }) =>
    fieldErrors[field] ? (
      <p className="text-red-500 text-sm mt-1">{fieldErrors[field]}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Full Name <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={fieldClass("name")}
            placeholder="Full Name"
          />
          <FieldError field="name" />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email Address <span className="text-amber-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldClass("email")}
            placeholder="Email Address"
          />
          <FieldError field="email" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-2">
            Contact Number <span className="text-amber-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={fieldClass("phone")}
            placeholder="Contact Number"
          />
          <FieldError field="phone" />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-gray-300 mb-2">
            What type of event are you planning? <span className="text-amber-500">*</span>
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className={fieldClass("eventType")}
          >
            <option value="">Select event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Graduation">Graduation</option>
            <option value="Corporate">Corporate</option>
            <option value="Fete/Party - All Inclusive">Fete/Party - All Inclusive</option>
            <option value="Fete/Party - Cash Bar">Fete/Party - Cash Bar</option>
            <option value="Other">Other</option>
          </select>
          <FieldError field="eventType" />
        </div>

        <div>
          <label htmlFor="eventVenue" className="block text-gray-300 mb-2">
            Event Venue <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            id="eventVenue"
            name="eventVenue"
            value={formData.eventVenue}
            onChange={handleChange}
            className={fieldClass("eventVenue")}
            placeholder="Event Venue"
          />
          <FieldError field="eventVenue" />
        </div>

        {!isWedding ? (
          <div>
            <label htmlFor="eventDate" className="block text-gray-300 mb-2">
              Date of Event? <span className="text-amber-500">*</span>
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className={fieldClass("eventDate", "quote-date-input")}
            />
            <FieldError field="eventDate" />
          </div>
        ) : (
          <div>
            <label htmlFor="sameVenue" className="block text-gray-300 mb-2">
              For weddings, will both the ceremony and reception be held at the same venue? <span className="text-amber-500">*</span>
            </label>
            <select
              id="sameVenue"
              name="sameVenue"
              value={formData.sameVenue}
              onChange={handleChange}
              className={fieldClass("sameVenue")}
            >
              <option value="">Select one</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <FieldError field="sameVenue" />
          </div>
        )}

        <div>
          <label htmlFor="eventTime" className="block text-gray-300 mb-2">
            What time will your event begin and end? <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            id="eventTime"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
            className={fieldClass("eventTime")}
            placeholder="e.g. 6:00 PM - 11:00 PM"
          />
          <FieldError field="eventTime" />
        </div>

        <div>
          <label htmlFor="guestCount" className="block text-gray-300 mb-2">
            How many guests are you expecting? <span className="text-amber-500">*</span>
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className={fieldClass("guestCount")}
            placeholder="Guest Count"
            min="10"
          />
          <FieldError field="guestCount" />
        </div>

        <div>
          <label htmlFor="serviceInterest" className="block text-gray-300 mb-2">
            Which of our services are you interested in? <span className="text-amber-500">*</span>
          </label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            className={fieldClass("serviceInterest")}
          >
            <option value="">Select one</option>
            <option value="Full Services">Full Services (drinks, glassware, staff, cocktails, ice etc.)</option>
            <option value="Staff ONLY">Staff ONLY</option>
            <option value="Glassware rental ONLY">Glassware rental ONLY</option>
          </select>
          <FieldError field="serviceInterest" />
        </div>

        <div>
          <label htmlFor="drinkingPreference" className="block text-gray-300 mb-2">
            How would you describe your guests' drinking preferences? <span className="text-amber-500">*</span>
          </label>
          <select
            id="drinkingPreference"
            name="drinkingPreference"
            value={formData.drinkingPreference}
            onChange={handleChange}
            className={fieldClass("drinkingPreference")}
          >
            <option value="">Select one</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Heavy">Heavy</option>
            <option value="Other">Other</option>
          </select>
          <FieldError field="drinkingPreference" />
        </div>

        <div>
          <label htmlFor="cocktailPreference" className="block text-gray-300 mb-2">
            Would you like cocktails, mocktails, or both for your event? <span className="text-amber-500">*</span>
          </label>
          <select
            id="cocktailPreference"
            name="cocktailPreference"
            value={formData.cocktailPreference}
            onChange={handleChange}
            className={fieldClass("cocktailPreference")}
          >
            <option value="">Select one</option>
            <option value="Cocktails">Cocktails</option>
            <option value="Mocktails">Mocktails</option>
            <option value="Both">Both - Cocktails and Mocktails</option>
          </select>
          <FieldError field="cocktailPreference" />
        </div>

        <div>
          <label htmlFor="desiredBudget" className="block text-gray-300 mb-2">
            What is your desired budget? <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            id="desiredBudget"
            name="desiredBudget"
            value={formData.desiredBudget}
            onChange={handleChange}
            className={fieldClass("desiredBudget")}
            placeholder="Desired Budget"
          />
          <FieldError field="desiredBudget" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="budgetPriority" className="block text-gray-300 mb-2">
            Which is more important to you: maximizing budget or delivering a premium guest experience? <span className="text-amber-500">*</span>
          </label>
          <select
            id="budgetPriority"
            name="budgetPriority"
            value={formData.budgetPriority}
            onChange={handleChange}
            className={fieldClass("budgetPriority")}
          >
            <option value="">Select one</option>
            <option value="Maximizing budget">Maximizing budget</option>
            <option value="Premium guest experience">Premium guest experience</option>
          </select>
          <FieldError field="budgetPriority" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="lastingImpression" className="block text-gray-300 mb-2">
            What lasting impression would you like your event to leave on your guests? <span className="text-amber-500">*</span>
          </label>
          <textarea
            id="lastingImpression"
            name="lastingImpression"
            rows={3}
            value={formData.lastingImpression}
            onChange={handleChange}
            className={fieldClass("lastingImpression", "resize-none")}
            placeholder="Describe the lasting impression you want to create..."
          />
          <FieldError field="lastingImpression" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-gray-300 mb-2">
            Have something special in mind? We'd love to hear your ideas. <span className="text-amber-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={fieldClass("message", "resize-none")}
            placeholder="Tell us about your idea, signature drink, or event vision..."
          />
          <FieldError field="message" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/50"
      >
        {isSubmitting ? "Sending..." : "Submit Quote Request"}
      </button>
    </form>
  );
}
