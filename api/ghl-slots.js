const GHL_API =
  "https://services.leadconnectorhq.com";

const DEFAULT_TIMEZONE = "Asia/Manila";

function isValidTimezone(timezone) {
  if (!timezone) return false;

  try {
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
    });

    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  const token =
    process.env.GHL_PRIVATE_INTEGRATION_TOKEN;

  const calendarId =
    process.env.GHL_CALENDAR_ID;

  if (!token || !calendarId) {
    return res.status(500).json({
      error:
        "Booking connection is not configured.",
    });
  }

  try {
    const requestedMonth = String(
      req.query?.month || ""
    );

    const requestedTimezone = String(
      req.query?.timezone || ""
    );

    const timezone = isValidTimezone(
      requestedTimezone
    )
      ? requestedTimezone
      : DEFAULT_TIMEZONE;

    const match =
      /^(\d{4})-(\d{2})$/.exec(
        requestedMonth
      );

    const now = new Date();

    /*
      Determine the current year/month using
      the selected timezone.
    */
    const timezoneParts =
      new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
      }).formatToParts(now);

    const currentYear = Number(
      timezoneParts.find(
        (part) => part.type === "year"
      )?.value
    );

    const currentMonth =
      Number(
        timezoneParts.find(
          (part) => part.type === "month"
        )?.value
      ) - 1;

    const year = match
      ? Number(match[1])
      : currentYear;

    const monthIndex = match
      ? Number(match[2]) - 1
      : currentMonth;

    /*
      Use the selected month's local calendar
      boundaries.

      HighLevel requires the range to be no
      more than 31 days.
    */
    const start = new Date(
      year,
      monthIndex,
      1
    );

    const end = new Date(
      year,
      monthIndex + 1,
      1
    );

    const params = new URLSearchParams({
      startDate: String(
        start.getTime()
      ),

      endDate: String(
        end.getTime()
      ),

      timezone,

      duration: "30",
    });

    const response = await fetch(
      `${GHL_API}/calendars/${calendarId}/free-slots?${params.toString()}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
          Version: "v3",
          Accept: "application/json",
        },
      }
    );

    const responseText =
      await response.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error(
        "HighLevel returned non-JSON:",
        responseText
      );

      return res.status(502).json({
        error:
          "HighLevel returned an invalid response.",
      });
    }

    if (!response.ok) {
      console.error(
        "HighLevel availability error:",
        data
      );

      return res.status(
        response.status || 502
      ).json({
        error:
          "HighLevel availability request failed.",
        details: data,
      });
    }

    /*
      HighLevel returns the availability map
      directly:

      {
        "2026-10-01": {
          "slots": [...]
        }
      }

      Keep that structure intact because
      BookingModal reads availability[date].slots
    */
    return res.status(200).json({
      month: `${year}-${String(
        monthIndex + 1
      ).padStart(2, "0")}`,

      timezone,

      availability: data,
    });
  } catch (error) {
    console.error(
      "GHL slots error:",
      error
    );

    return res.status(500).json({
      error:
        "Unable to retrieve booking availability.",
    });
  }
}