# Email Setup Instructions for Bar Plus Services

Your quote form is ready! Here's how to connect it to send emails to your Gmail automatically.

## Recommended: Web3Forms (Easiest - No Account Needed)

This is the simplest option and requires no signup!

### Step 1: Get Your Access Key
1. Visit https://web3forms.com/
2. Enter your Bar Plus Gmail address (e.g., info@barplusservices.com)
3. Click "Get Access Key"
4. Copy the access key they provide

### Step 2: Add the Key to Your Code
1. Open `/utils/emailService.ts`
2. Replace `YOUR_WEB3FORMS_KEY` with your actual access key
3. The line should look like: `const WEB3FORMS_ACCESS_KEY = "abc123-xyz789-...";`

### Step 3: Update QuoteModal Component
1. Open `/components/QuoteModal.tsx`
2. Find the `handleSubmit` function
3. Replace the `try` block with:

```typescript
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
```

4. Add this import at the top of the file:
```typescript
import { sendEmailViaWeb3Forms } from "../utils/emailService";
```

### Done! 🎉
Your form will now send emails directly to your Bar Plus Gmail address!

---

## Alternative: EmailJS (More Features)

If you want more control over email templates and appearance:

### Step 1: Sign Up
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Connect your Gmail account

### Step 2: Create Email Template
1. In EmailJS dashboard, create a new email template
2. Use these variables in your template:
   - `{{from_name}}` - Customer's name
   - `{{from_email}}` - Customer's email
   - `{{phone}}` - Customer's phone
   - `{{company}}` - Company/Organization
   - `{{event_type}}` - Type of event
   - `{{event_date}}` - Event date
   - `{{guest_count}}` - Number of guests
   - `{{message}}` - Additional details

### Step 3: Get Your Credentials
1. Copy your Service ID (e.g., "service_abc123")
2. Copy your Template ID (e.g., "template_xyz789")
3. Copy your Public Key from Account settings

### Step 4: Install EmailJS
Run this command in your project:
```bash
npm install @emailjs/browser
```

### Step 5: Configure
1. Open `/utils/emailService.ts`
2. Uncomment the EmailJS section
3. Replace the placeholder values:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`

### Step 6: Use in QuoteModal
Follow similar steps as Web3Forms but use the `sendEmail` function instead.

---

## Alternative: Formspree (Simple Forms)

### Step 1: Sign Up
1. Go to https://formspree.io/
2. Create a free account
3. Create a new form

### Step 2: Get Form Endpoint
1. Copy your form endpoint URL (e.g., "https://formspree.io/f/abc123xyz")

### Step 3: Update QuoteModal
In the `handleSubmit` function, use:
```typescript
const response = await fetch("YOUR_FORMSPREE_URL", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData),
});

const result = await response.json();
if (result.ok) {
  // Success!
}
```

---

## Testing

After setup, test your form by:
1. Click "Get Quote" in the navigation
2. Fill out the form with test data
3. Submit
4. Check your Bar Plus Gmail inbox

---

## Notes

- All these services have free tiers that are perfect for a business website
- Web3Forms allows 250 submissions/month for free
- EmailJS allows 200 emails/month for free
- Formspree allows 50 submissions/month for free
- You can upgrade if you need more

## Support

If you need help setting this up, just let me know! I can guide you through the specific steps.
