/**
 * Email Service Configuration
 * 
 * TO ENABLE REAL EMAIL SENDING:
 * 
 * Option 1: EmailJS (Recommended - Free tier available)
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{phone}}
 *    - {{company}}
 *    - {{event_type}}
 *    - {{event_date}}
 *    - {{guest_count}}
 *    - {{message}}
 * 4. Install EmailJS: npm install @emailjs/browser
 * 5. Replace the values below with your credentials
 * 6. Uncomment the sendEmail function and use it in QuoteModal.tsx
 */

// import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g., "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g., "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // e.g., "abc123xyz789"

interface EmailData {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
}

/**
 * Send email using EmailJS
 * Uncomment this function and use it in QuoteModal.tsx
 */
/*
export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      company: data.company || "N/A",
      event_type: data.eventType,
      event_date: data.eventDate,
      guest_count: data.guestCount,
      message: data.message || "N/A",
      to_email: "info@barplusservices.com", // Your Bar Plus Gmail
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
*/

/**
 * Alternative Option 2: Formspree (Even Simpler)
 * 1. Sign up at https://formspree.io/
 * 2. Create a new form
 * 3. Get your form endpoint URL
 * 4. Use fetch to POST to that endpoint from QuoteModal.tsx
 * 
 * Example:
 * const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(formData),
 * });
 */

/**
 * Alternative Option 3: Web3Forms (No signup required)
 * 1. Get a free API key from https://web3forms.com/
 * 2. No account needed, just get the key
 * 3. Use the sendEmailViaWeb3Forms function below
 */

const WEB3FORMS_ACCESS_KEY = "ab936393-8644-466c-89b9-93bb42a03589"; // Get from https://web3forms.com/

export async function sendEmailViaWeb3Forms(data: EmailData): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Quote Request from ${data.name}`,
        from_name: data.name,
        email: data.email,
        message: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company/Organisation: ${data.company || "N/A"}
Event Type: ${data.eventType}
Event Date: ${data.eventDate}
Expected Guest Count: ${data.guestCount}

Additional Details:
${data.message || "N/A"}
        `,
      }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

// Export the email data type for use in other files
export type { EmailData };
