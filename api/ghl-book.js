const GHL_API = "https://services.leadconnectorhq.com";

const clean = (value) =>
  typeof value === "string" ? value.trim() : "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const calendarId = process.env.GHL_CALENDAR_ID;

  if (!token || !locationId || !calendarId) {
    return res.status(500).json({
      error: "Booking connection is not configured.",
    });
  }

  try {
    const body = req.body || {};
    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const companyName = clean(body.companyName);
    const message = clean(body.message);
    const startTime = clean(body.startTime);

    if (!firstName || !email || !startTime) {
      return res.status(400).json({
        error: "First name, email, and appointment time are required.",
      });
    }

    const start = new Date(startTime);

    if (Number.isNaN(start.getTime())) {
      return res.status(400).json({
        error: "The selected appointment time is invalid.",
      });
    }

    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const contactResponse = await fetch(
      `${GHL_API}/contacts/upsert`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName: lastName || null,
          email,
          phone: phone || null,
          companyName: companyName || null,
          locationId,
          timezone: "Asia/Manila",
          source: "Precious Portfolio",
        }),
      }
    );

    const contactData = await contactResponse.json();

    if (!contactResponse.ok || !contactData?.contact?.id) {
      return res.status(contactResponse.status || 502).json({
        error: "HighLevel could not create or update the contact.",
        details: contactData,
      });
    }

    const contactId = contactData.contact.id;

    const appointmentResponse = await fetch(
      `${GHL_API}/calendars/events/appointments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: "Discovery Call with Precious",
          appointmentStatus: "confirmed",
          calendarId,
          locationId,
          contactId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          toNotify: true,
          description:
            message ||
            "Discovery call booked through the Precious portfolio.",
        }),
      }
    );

    const appointmentData = await appointmentResponse.json();

    if (!appointmentResponse.ok) {
      return res.status(appointmentResponse.status || 502).json({
        error: "HighLevel could not create the appointment.",
        details: appointmentData,
      });
    }

    return res.status(200).json({
      success: true,
      appointment: appointmentData,
    });
  } catch (error) {
    console.error("GHL booking error:", error);

    return res.status(500).json({
      error: "Unable to complete the booking.",
    });
  }
}
