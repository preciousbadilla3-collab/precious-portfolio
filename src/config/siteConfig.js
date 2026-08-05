export const siteConfig = {
  name: "Precious Badilla",
  role: "GoHighLevel Systems Specialist",
  email: "preciousbadilla3@gmail.com",
  whatsappNumber: "639910139615",
  location: "Palawan, Philippines",
  availability: "Available remotely",

  /*
    Paste your published GoHighLevel calendar URL between the quotes.
    Leave it blank and every booking button will open a prepared email instead.
  */
  bookingUrl: "",

  /* Optional. Leave blank to hide the LinkedIn button. */
  linkedInUrl: ""
};

export const hasBookingLink = /^https?:\/\//i.test(
  siteConfig.bookingUrl
);

export const bookingEmailSubject = encodeURIComponent(
  "Discovery Call Request"
);

export const bookingEmailBody = encodeURIComponent(`Hi Precious,

I'd like to schedule a discovery call regarding my project.

Business or project:
Preferred date and time:
Services I'm interested in:

Thank you!`);

export const bookingHref = hasBookingLink
  ? siteConfig.bookingUrl
  : `mailto:${siteConfig.email}?subject=${bookingEmailSubject}&body=${bookingEmailBody}`;

export const buildWhatsAppHref = (
  message = "Hi Precious! I found your portfolio and would like to discuss a project."
) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

export const whatsappHref = buildWhatsAppHref();

export const locationLabel = `${siteConfig.location} · ${siteConfig.availability}`;
