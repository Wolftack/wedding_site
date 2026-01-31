window.addEventListener("DOMContentLoaded", () => {
  const APP_URL =
    "https://script.google.com/macros/s/AKfycbxYG7tdqDCiu2dJcoYq2_THnlvdb6XekeHpmFhXX_ZN4Itho2NxYMbT8NeoHieG6AQk/exec";

  const emailEl = document.getElementById("rsvpEmail");
  const goBtn = document.getElementById("rsvpGo");
  const errEl = document.getElementById("rsvpErr");
  const step1 = document.getElementById("rsvpStep1");
  const step2 = document.getElementById("rsvpStep2");
  const frame = document.getElementById("rsvpFrame");

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setFrameHeight(h) {
    const height = clamp(Number(h) || 0, 900, 6000);
    if (!height) return;
    frame.style.height = height + "px";
  }

  // Listen for height messages from the embedded Google Apps Script page
  window.addEventListener("message", (event) => {
    // Security: only accept messages from script.google.com
    if (event.origin !== "https://script.google.com") return;

    const data = event.data || {};
    if (data.type === "RSVP_IFRAME_HEIGHT" && data.height) {
      setFrameHeight(data.height);
    }
  });

  function go() {
    const email = (emailEl.value || "").trim();

    if (!email) {
      errEl.style.display = "block";
      errEl.textContent = "Please enter your email address.";
      return;
    }

    errEl.style.display = "none";

    // Reset to a reasonable height immediately (prevents “tiny iframe” on mobile while loading)
    frame.style.height = "1400px";

    frame.src = APP_URL + "?page=rsvp&email=" + encodeURIComponent(email);

    step1.style.display = "none";
    step2.style.display = "block";

    const intro = document.querySelector(".rsvp-intro");
    if (intro) intro.style.display = "none";

    step2.scrollIntoView({ behavior: "smooth" });
  }

  goBtn.addEventListener("click", go);
  emailEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") go();
  });
});
