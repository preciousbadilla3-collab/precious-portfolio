export function openBooking(event) {
  if (event) {
    event.preventDefault();
  }

  window.dispatchEvent(
    new CustomEvent("precious:open-booking")
  );
}
