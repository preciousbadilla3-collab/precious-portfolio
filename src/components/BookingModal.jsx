import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import "./BookingModal.css";

const BOOKING_EVENT = "precious:open-booking";
const DEFAULT_TIMEZONE = "Asia/Manila";

/*
  Keep this list intentionally small.

  Do NOT replace this with:
  Intl.supportedValuesOf("timeZone")

  That creates hundreds of timezone options and makes
  the native dropdown unnecessarily heavy.
*/
const TIMEZONE_OPTIONS = [
  {
    value: "Asia/Manila",
    city: "Manila",
  },
  {
    value: "Asia/Singapore",
    city: "Singapore",
  },
  {
    value: "Asia/Tokyo",
    city: "Tokyo",
  },
  {
    value: "Asia/Dubai",
    city: "Dubai",
  },
  {
    value: "Europe/London",
    city: "London",
  },
  {
    value: "America/New_York",
    city: "New York",
  },
  {
    value: "America/Chicago",
    city: "Chicago",
  },
  {
    value: "America/Denver",
    city: "Denver",
  },
  {
    value: "America/Los_Angeles",
    city: "Los Angeles",
  },
  {
    value: "Australia/Sydney",
    city: "Sydney",
  },
  {
    value: "Pacific/Auckland",
    city: "Auckland",
  },
];

/*
  Cache timezone labels once.

  This prevents Intl.DateTimeFormat from being
  recreated every time the modal renders.
*/
const timezoneLabels = Object.fromEntries(
  TIMEZONE_OPTIONS.map((option) => {
    let offset = "GMT";

    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: option.value,
        timeZoneName: "shortOffset",
      }).formatToParts(new Date());

      offset =
        parts.find(
          (part) => part.type === "timeZoneName"
        )?.value || "GMT";
    } catch {
      offset = "GMT";
    }

    return [
      option.value,
      `${offset} — ${option.city}`,
    ];
  })
);

/*
  Cache availability between modal opens/month changes.

  Key:
  month + timezone
*/
const availabilityCache = new Map();

function getBrowserTimezone() {
  try {
    const detected =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    const supported = TIMEZONE_OPTIONS.some(
      (option) => option.value === detected
    );

    return supported
      ? detected
      : DEFAULT_TIMEZONE;
  } catch {
    return DEFAULT_TIMEZONE;
  }
}

function getTimezoneDisplay(timezone) {
  return (
    timezoneLabels[timezone] ||
    `GMT — ${timezone}`
  );
}

const pad = (value) =>
  String(value).padStart(2, "0");

const monthKey = (date) =>
  `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}`;

const dateKey = (date) =>
  `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;

const formatMonthFormatter =
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

const selectedDateFormatter =
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const calendarTimeFormatters = new Map();

function getTimeFormatter(timezone) {
  if (!calendarTimeFormatters.has(timezone)) {
    calendarTimeFormatters.set(
      timezone,
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone,
      })
    );
  }

  return calendarTimeFormatters.get(timezone);
}

const formatSelectedDate = (value) => {
  if (!value) return "";

  return selectedDateFormatter.format(
    new Date(`${value}T12:00:00`)
  );
};

const formatTime = (value, timezone) =>
  getTimeFormatter(timezone).format(
    new Date(value)
  );

const calendarCells = (month) => {
  const first = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  );

  const firstDay = (first.getDay() + 6) % 7;

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const day = index - firstDay + 1;

    if (day < 1 || day > daysInMonth) {
      cells.push(null);
    } else {
      cells.push(
        new Date(
          month.getFullYear(),
          month.getMonth(),
          day
        )
      );
    }
  }

  return cells;
};

function BookingModal() {
  const [open, setOpen] = useState(false);

  const [viewMonth, setViewMonth] = useState(
    () => new Date()
  );

  const [selectedTimezone, setSelectedTimezone] =
    useState(getBrowserTimezone);

  const [availability, setAvailability] =
    useState({});

  const [loadingSlots, setLoadingSlots] =
    useState(false);

  const [slotsError, setSlotsError] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [step, setStep] =
    useState("calendar");

  const [submitting, setSubmitting] =
    useState(false);

  const [bookingError, setBookingError] =
    useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  /*
    Listen for the custom booking event from:
    - Navbar
    - Hero
    - Floating chat
    - Other booking buttons
  */
  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      setStep("calendar");
      setSelectedDate("");
      setSelectedSlot("");
      setBookingError("");
    };

    window.addEventListener(
      BOOKING_EVENT,
      handleOpen
    );

    return () =>
      window.removeEventListener(
        BOOKING_EVENT,
        handleOpen
      );
  }, []);

  /*
    Lock page scrolling while the booking modal
    is open.
  */
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  /*
    Load HighLevel availability.

    Optimizations:
    - Abort previous request when a new one starts
    - Cache already-loaded month/timezone combinations
    - Avoid duplicate requests
  */
  useEffect(() => {
    if (!open || step !== "calendar") {
      return undefined;
    }

    const key = monthKey(viewMonth);
    const cacheKey = `${key}|${selectedTimezone}`;

    if (availabilityCache.has(cacheKey)) {
      setAvailability(
        availabilityCache.get(cacheKey)
      );
      setSlotsError("");
      setLoadingSlots(false);

      return undefined;
    }

    const controller = new AbortController();

    setLoadingSlots(true);
    setSlotsError("");

    fetch(
      `/api/ghl-slots?month=${key}&timezone=${encodeURIComponent(
        selectedTimezone
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      }
    )
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Unable to load availability."
          );
        }

        return data;
      })
      .then((data) => {
        const nextAvailability =
          data.availability || {};

        availabilityCache.set(
          cacheKey,
          nextAvailability
        );

        setAvailability(nextAvailability);
        setLoadingSlots(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        setAvailability({});
        setSlotsError(
          error.message ||
            "Unable to load availability."
        );
        setLoadingSlots(false);
      });

    return () => {
      controller.abort();
    };
  }, [
    open,
    step,
    viewMonth,
    selectedTimezone,
  ]);

  const cells = useMemo(
    () => calendarCells(viewMonth),
    [viewMonth]
  );

  const selectedSlots =
    availability[selectedDate]?.slots || [];

  const todayKey = dateKey(new Date());

  const selectedTimezoneDisplay = useMemo(
    () =>
      getTimezoneDisplay(selectedTimezone),
    [selectedTimezone]
  );

  const close = () => {
    setOpen(false);
  };

  const chooseDate = (date) => {
    const key = dateKey(date);

    if (
      !(availability[key]?.slots?.length > 0)
    ) {
      return;
    }

    setSelectedDate(key);
    setSelectedSlot("");
  };

  const chooseSlot = (slot) => {
    setSelectedSlot(slot);
    setStep("details");
    setBookingError("");
  };

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setBookingError("");

    try {
      const response = await fetch(
        "/api/ghl-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            startTime: selectedSlot,
            timezone: selectedTimezone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "We couldn't complete the booking."
        );
      }

      setStep("success");
    } catch (error) {
      setBookingError(
        error.message ||
          "We couldn't complete the booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="booking-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <button
        type="button"
        className="booking-modal-backdrop"
        aria-label="Close booking calendar"
        onClick={close}
      />

      <div className="booking-modal-panel">
        <div
          className="booking-modal-glow"
          aria-hidden="true"
        />

        <button
          type="button"
          className="booking-modal-close"
          onClick={close}
          aria-label="Close booking calendar"
        >
          <X size={18} />
        </button>

        <div className="booking-brand-line">
          <span />
          precious.
        </div>

        <header className="booking-modal-header">
          <div className="booking-modal-eyebrow">
            <Sparkles size={12} />
            Complimentary Discovery Call
          </div>

          <h2 id="booking-modal-title">
            Let&apos;s find a time
            <span> that works.</span>
          </h2>

          <p>
            A focused 30-minute conversation about
            your business, your current setup, and
            the systems you want to improve.
          </p>

          <div className="booking-modal-details">
            <span>
              <Clock3 size={13} />
              30 minutes
            </span>

            <span>
              <CalendarDays size={13} />
              Online · Google Meet
            </span>
          </div>
        </header>

        {step === "calendar" && (
          <section className="booking-calendar-view">
            <div className="booking-calendar-main">
              <div className="booking-timezone-picker">
                <label htmlFor="booking-timezone">
                  Timezone
                </label>

                <select
                  id="booking-timezone"
                  value={selectedTimezone}
                  onChange={(event) => {
                    setSelectedTimezone(
                      event.target.value
                    );

                    setSelectedDate("");
                    setSelectedSlot("");
                  }}
                >
                  {TIMEZONE_OPTIONS.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {timezoneLabels[
                          option.value
                        ]}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="booking-calendar-heading">
                <div>
                  <span className="booking-section-label">
                    Choose a date
                  </span>

                  <h3>
                    {formatMonthFormatter.format(
                      viewMonth
                    )}
                  </h3>
                </div>

                <div className="booking-month-nav">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() =>
                      setViewMonth(
                        new Date(
                          viewMonth.getFullYear(),
                          viewMonth.getMonth() - 1,
                          1
                        )
                      )
                    }
                  >
                    <ArrowLeft size={15} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() =>
                      setViewMonth(
                        new Date(
                          viewMonth.getFullYear(),
                          viewMonth.getMonth() + 1,
                          1
                        )
                      )
                    }
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              <div className="booking-weekdays">
                {[
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ].map((day) => (
                  <span key={day}>
                    {day}
                  </span>
                ))}
              </div>

              <div
                className={`booking-days-grid ${
                  loadingSlots
                    ? "is-loading"
                    : ""
                }`}
                aria-busy={loadingSlots}
              >
                {loadingSlots && (
                  <div className="booking-calendar-loading">
                    <div className="booking-loading-spinner" />

                    <span>
                      Checking available dates…
                    </span>
                  </div>
                )}

                {cells.map((date, index) => {
                  if (!date) {
                    return (
                      <span
                        key={`empty-${index}`}
                      />
                    );
                  }

                  const key = dateKey(date);

                  const slots =
                    availability[key]?.slots ||
                    [];

                  const hasSlots =
                    slots.length > 0;

                  const selected =
                    key === selectedDate;

                  const past =
                    key < todayKey;

                  return (
                    <button
                      type="button"
                      key={key}
                      className={`booking-day ${
                        hasSlots && !past
                          ? "is-available"
                          : "is-disabled"
                      } ${
                        selected
                          ? "is-selected"
                          : ""
                      }`}
                      disabled={
                        !hasSlots || past
                      }
                      onClick={() =>
                        chooseDate(date)
                      }
                    >
                      <span>
                        {date.getDate()}
                      </span>

                      {hasSlots &&
                        !past && <i />}
                    </button>
                  );
                })}
              </div>

              <div className="booking-calendar-legend">
                <span>
                  <i className="available-dot" />
                  Available
                </span>

                <span>
                  <i className="today-dot" />
                  Select a date
                </span>
              </div>
            </div>

            <aside className="booking-slots-panel">
              <span className="booking-section-label">
                Available times
              </span>

              {selectedDate ? (
                <>
                  <h3>
                    {formatSelectedDate(
                      selectedDate
                    )}
                  </h3>

                  {loadingSlots ? (
                    <div className="booking-state-small">
                      Checking times…
                    </div>
                  ) : selectedSlots.length ? (
                    <div className="booking-time-grid">
                      {selectedSlots.map(
                        (slot) => (
                          <button
                            type="button"
                            key={slot}
                            className={`booking-time-button ${
                              selectedSlot ===
                              slot
                                ? "is-selected"
                                : ""
                            }`}
                            onClick={() =>
                              chooseSlot(slot)
                            }
                          >
                            {formatTime(
                              slot,
                              selectedTimezone
                            )}

                            <ArrowRight
                              size={13}
                            />
                          </button>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="booking-state-small">
                      No times are available
                      for this date.
                    </div>
                  )}
                </>
              ) : (
                <div className="booking-slot-empty">
                  <div className="booking-slot-icon">
                    <CalendarDays size={19} />
                  </div>

                  <strong>
                    Pick a highlighted date.
                  </strong>

                  <p>
                    Your available call times
                    will appear here.
                  </p>
                </div>
              )}

              {loadingSlots &&
                !selectedDate && (
                  <div className="booking-state-small">
                    Loading availability…
                  </div>
                )}

              {slotsError && (
                <div className="booking-error">
                  {slotsError}
                </div>
              )}
            </aside>
          </section>
        )}

        {step === "details" && (
          <section className="booking-details-view">
            <button
              type="button"
              className="booking-back-button"
              onClick={() =>
                setStep("calendar")
              }
            >
              <ArrowLeft size={14} />
              Back to times
            </button>

            <div className="booking-selected-summary">
              <div>
                <span className="booking-section-label">
                  Your selected time
                </span>

                <strong>
                  {formatSelectedDate(
                    selectedDate
                  )}
                </strong>

                <small>
                  {selectedTimezoneDisplay}
                </small>
              </div>

              <b>
                {formatTime(
                  selectedSlot,
                  selectedTimezone
                )}
              </b>
            </div>

            <form
              className="booking-form"
              onSubmit={submitBooking}
            >
              <div className="booking-form-grid">
                <label>
                  <span>
                    <UserRound size={13} />
                    First name *
                  </span>

                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={updateForm}
                    required
                    autoComplete="given-name"
                    placeholder="Your first name"
                  />
                </label>

                <label>
                  <span>
                    Last name
                  </span>

                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={updateForm}
                    autoComplete="family-name"
                    placeholder="Your last name"
                  />
                </label>

                <label>
                  <span>
                    <Mail size={13} />
                    Email *
                  </span>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateForm}
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </label>

                <label>
                  <span>
                    <Phone size={13} />
                    Phone
                  </span>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={updateForm}
                    autoComplete="tel"
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label>
                <span>
                  Business / company
                </span>

                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={updateForm}
                  autoComplete="organization"
                  placeholder="Your business name"
                />
              </label>

              <label>
                <span>
                  <MessageSquareText size={13} />
                  What would you like help with?
                </span>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  rows="4"
                  placeholder="Tell me a little about what you're building or improving."
                />
              </label>

              {bookingError && (
                <div className="booking-error booking-error-form">
                  {bookingError}
                </div>
              )}

              <button
                type="submit"
                className="booking-submit"
                disabled={submitting}
              >
                {submitting
                  ? "Confirming…"
                  : "Confirm discovery call"}

                {!submitting && (
                  <ArrowRight size={16} />
                )}
              </button>

              <p className="booking-form-note">
                Your details are sent securely to
                the connected HighLevel account.
              </p>
            </form>
          </section>
        )}

        {step === "success" && (
          <section className="booking-success-view">
            <div className="booking-success-icon">
              <Check size={25} />
            </div>

            <span className="booking-section-label">
              Booking confirmed
            </span>

            <h3>
              You&apos;re on the calendar.
            </h3>

            <p>
              Your discovery call is confirmed
              for{" "}
              {formatSelectedDate(
                selectedDate
              )}{" "}
              at{" "}
              {formatTime(
                selectedSlot,
                selectedTimezone
              )}
              . HighLevel will handle the
              confirmation and meeting details.
            </p>

            <button
              type="button"
              className="booking-submit booking-success-button"
              onClick={close}
            >
              Done
              <Check size={16} />
            </button>
          </section>
        )}

        <footer className="booking-modal-footer">
          <span>precious.</span>

          <span>
            30 min · {selectedTimezoneDisplay} ·
            Google Meet
          </span>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default BookingModal;