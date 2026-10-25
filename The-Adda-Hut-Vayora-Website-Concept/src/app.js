import { BUSINESS } from "./business-config.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Render business-specific values from one configuration source so updates stay consistent.
$$("[data-business-name]").forEach((node) => { node.textContent = BUSINESS.name; });
$$("[data-business-address]").forEach((node) => { node.textContent = BUSINESS.addressDisplay || BUSINESS.address; });
$$("[data-business-phone]").forEach((node) => { node.textContent = BUSINESS.phoneDisplay; });
$$("[data-business-phone-link]").forEach((node) => { node.href = `tel:${BUSINESS.phoneE164}`; });
$$("[data-business-instagram]").forEach((node) => { node.href = BUSINESS.instagramUrl; });
$$("[data-business-maps]").forEach((node) => { node.href = BUSINESS.mapsSearchUrl; });
$$("[data-business-reviews]").forEach((node) => { node.href = BUSINESS.reviewsUrl; });
$$("[data-business-whatsapp]").forEach((node) => { node.href = `https://wa.me/${BUSINESS.whatsappDigits}`; });
const mapEmbed = $("[data-business-map-embed]");
if (mapEmbed) mapEmbed.src = `https://maps.google.com/maps?q=${encodeURIComponent(`${BUSINESS.name}, ${BUSINESS.address}`)}&output=embed`;

// Keep the year and verified review figures in sync with the central business config.
const yearNode = $("#year");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
const ratingNode = $("#rating-value");
const reviewCountNode = $("#review-count");
if (ratingNode) {
  ratingNode.textContent = BUSINESS.rating.toFixed(1);
  ratingNode.setAttribute("aria-label", `${BUSINESS.rating.toFixed(1)} out of 5`);
}
if (reviewCountNode) reviewCountNode.textContent = String(BUSINESS.reviewCount);

// Mobile navigation: keyboard-safe open/close state and focus return.
const menuToggle = $(".menu-toggle");
const mobileMenu = $("#mobile-menu");
function setMenuOpen(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.setAttribute("aria-hidden", String(!open));
  mobileMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  if (open) {
    const firstLink = $("a", mobileMenu);
    firstLink?.focus({ preventScroll: true });
  } else if (document.activeElement && mobileMenu.contains(document.activeElement)) {
    menuToggle.focus({ preventScroll: true });
  }
}
menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
$$("a", mobileMenu || document.createElement("div")).forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") setMenuOpen(false);
});

// Occasion explorer. The selected occasion is also carried into the inquiry form.
const occasionData = {
  birthday: {
    title: "Make their day feel<br>like <em>them.</em>",
    kicker: "YOUR REASON, YOUR RULES",
    image: "https://images.pexels.com/photos/30401226/pexels-photo-30401226.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Birthday candles glowing above a cake",
    occasion: "Birthday celebration"
  },
  anniversary: {
    title: "One more chapter,<br><em>together.</em>",
    kicker: "A LITTLE TIME FOR TWO",
    image: "https://images.pexels.com/photos/10810999/pexels-photo-10810999.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "An intimate candlelit table and flowers",
    occasion: "Anniversary"
  },
  surprise: {
    title: "They know you.<br><em>Surprise them anyway.</em>",
    kicker: "THE LOOK ON THEIR FACE",
    image: "https://images.pexels.com/photos/16470652/pexels-photo-16470652.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "A birthday-decorated room with balloons",
    occasion: "Surprise celebration"
  },
  gathering: {
    title: "The best plans start<br>with <em>everyone here.</em>",
    kicker: "GOOD PEOPLE, ONE PLACE",
    image: "https://images.pexels.com/photos/12919391/pexels-photo-12919391.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "A table set for an intimate gathering",
    occasion: "Friends and family gathering"
  },
  other: {
    title: "Another reason?<br><em>That counts too.</em>",
    kicker: "YOUR MOMENT, YOUR WAY",
    image: "https://images.pexels.com/photos/4110012/pexels-photo-4110012.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "A cake with candles ready for a celebration",
    occasion: "Other occasion — please discuss"
  }
};
const occasionButtons = $$(".occasion-option");
const occasionImage = $("#occasion-image");
const occasionTitle = $("#occasion-preview-title");
const occasionKicker = $("#occasion-kicker");
const occasionPreview = $("#occasion-preview");
function selectOccasion(button) {
  const key = button?.dataset.image;
  const data = occasionData[key];
  if (!data) return;
  occasionButtons.forEach((candidate) => {
    const active = candidate === button;
    candidate.classList.toggle("is-active", active);
    candidate.setAttribute("aria-selected", String(active));
    candidate.tabIndex = active ? 0 : -1;
  });
  occasionPreview?.setAttribute("aria-labelledby", button.id);
  if (occasionImage) {
    occasionPreview?.classList.add("is-changing");
    const newImage = new Image();
    newImage.onload = () => {
      occasionImage.src = data.image;
      occasionImage.alt = data.alt;
      occasionPreview?.classList.remove("is-changing");
    };
    newImage.onerror = () => {
      occasionImage.src = data.image;
      occasionImage.alt = data.alt;
      occasionPreview?.classList.remove("is-changing");
    };
    newImage.src = data.image;
  }
  if (occasionTitle) occasionTitle.innerHTML = data.title;
  if (occasionKicker) occasionKicker.textContent = data.kicker;
  const previewLink = $("[data-book-occasion]", occasionPreview || document);
  if (previewLink) previewLink.dataset.bookOccasion = data.occasion;
}
occasionButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectOccasion(button));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % occasionButtons.length;
    if (event.key === "ArrowUp") next = (index - 1 + occasionButtons.length) % occasionButtons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = occasionButtons.length - 1;
    occasionButtons[next].focus();
    selectOccasion(occasionButtons[next]);
  });
});

// Contextual booking CTA: never invent availability or mark an enquiry as a booking.
const bookingForm = $("#booking-form");
const occasionSelect = $("#occasion");
const interestsSelect = $("#interests");
const notesField = $("#notes");
function carryContext(link) {
  if (!bookingForm) return;
  const occasion = link.dataset.bookOccasion;
  const interest = link.dataset.bookInterest;
  if (occasion && occasionSelect) {
    const matchingOption = Array.from(occasionSelect.options).find((option) => option.textContent.trim() === occasion || option.value === occasion);
    if (matchingOption) occasionSelect.value = matchingOption.value;
  }
  if (interest && interestsSelect) {
    const option = Array.from(interestsSelect.options).find((candidate) => candidate.textContent.includes("movie-theatre") && interest.toLowerCase().includes("movie"))
      || Array.from(interestsSelect.options).find((candidate) => candidate.textContent.includes("Food and menu") && interest.toLowerCase().includes("food"));
    if (option) interestsSelect.value = option.value;
    else if (notesField && !notesField.value.includes(interest)) notesField.value = [notesField.value.trim(), interest].filter(Boolean).join("\n");
  }
}
$$('[data-book-occasion], [data-book-interest]').forEach((link) => {
  link.addEventListener("click", () => carryContext(link));
});

// Date guard: no past dates can be selected, while availability is confirmed by the venue.
const dateField = $("#date");
if (dateField) {
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateField.min = localToday;
}

function setError(fieldName, message) {
  const input = $(`[name="${fieldName}"]`);
  const error = $(`#${fieldName}-error`);
  if (error) error.textContent = message;
  if (input) {
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) input.setAttribute("aria-describedby", error.id);
    else input.removeAttribute("aria-describedby");
  }
}
function clean(value) { return String(value || "").trim().replace(/\s+/g, " "); }
function buildWhatsAppMessage(values) {
  const lines = [
    `Hello ${BUSINESS.name}! I would like to enquire about planning a celebration.`,
    `Name: ${values.name}`,
    `Contact number: ${values.phone}`,
    `Occasion: ${values.occasion}`,
    `Preferred date: ${values.date || "Flexible / not decided"}`,
    `Preferred time: ${values.time || "Not decided — please share the available hours"}`,
    `Number of guests: ${values.guests || "Not decided — please confirm capacity"}`,
    `Approximate budget: ${values.budget || "Prefer to discuss"}`,
    `Decoration preference: ${values.decor || "Prefer to discuss"}`,
    `Food / theatre / add-on interest: ${values.interests || "Nothing specific yet"}`,
    `Additional notes: ${values.notes || "None"}`,
    "Could you please share the current options, inclusions, pricing and availability? I understand this is only an enquiry, not a confirmed booking."
  ];
  return lines.join("\n");
}
bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(bookingForm).entries());
  const normalised = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, clean(value)]));
  let hasError = false;
  const setAndFlag = (field, message) => { setError(field, message); if (message) hasError = true; };
  const displayName = normalised.name || "";
  setAndFlag("name", displayName.length < 2 ? "Please enter your name." : "");
  const digits = (normalised.phone || "").replace(/\D/g, "");
  setAndFlag("phone", digits.length < 10 || digits.length > 13 ? "Enter a valid phone number including the country code if needed." : "");
  setAndFlag("occasion", !normalised.occasion ? "Choose the occasion you have in mind." : "");
  const dateValue = normalised.date;
  if (dateValue && dateField?.min && dateValue < dateField.min) {
    hasError = true;
    setError("date", "Choose today or a future date.");
  } else setError("date", "");
  const errorsPanel = $("#form-errors");
  if (hasError) {
    if (errorsPanel) errorsPanel.textContent = "Please review the highlighted fields before preparing your enquiry.";
    const firstInvalid = $("[aria-invalid='true']", bookingForm);
    firstInvalid?.focus();
    return;
  }
  if (errorsPanel) errorsPanel.textContent = "";
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsappDigits}?text=${encodeURIComponent(buildWhatsAppMessage(normalised))}`;
  const whatsappLink = $("#whatsapp-link");
  if (whatsappLink) whatsappLink.href = whatsappUrl;
  const formSuccess = $("#form-success");
  if (formSuccess) formSuccess.hidden = false;
  formSuccess?.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "nearest" });
});
$("#edit-enquiry")?.addEventListener("click", () => {
  const formSuccess = $("#form-success");
  if (formSuccess) formSuccess.hidden = true;
  $("#name")?.focus();
});

// Gallery filters.
const galleryItems = $$(".gallery-item");
const filterButtons = $$(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    galleryItems.forEach((item) => {
      const visible = filter === "all" || item.dataset.category === filter;
      item.hidden = !visible;
    });
    // Let ScrollTrigger remeasure the shorter/longer gallery when available.
    window.ScrollTrigger?.refresh();
  });
});

// Keyboard-accessible gallery dialog with next/previous controls.
const lightbox = $("#lightbox");
const lightboxImage = $("#lightbox-image");
const lightboxCaption = $("#lightbox-caption");
let lightboxItems = [];
let lightboxIndex = 0;
let lightboxReturnFocus = null;
function refreshVisibleGalleryItems() { lightboxItems = galleryItems.filter((item) => !item.hidden); }
function showLightboxImage(index) {
  if (!lightboxItems.length) return;
  lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
  const item = lightboxItems[lightboxIndex];
  const image = $("img", item);
  if (lightboxImage) {
    lightboxImage.src = item.dataset.full || image?.src || "";
    lightboxImage.alt = item.dataset.alt || image?.alt || "Gallery photograph";
  }
  if (lightboxCaption) lightboxCaption.textContent = item.dataset.alt || image?.alt || "";
}
galleryItems.forEach((item) => item.addEventListener("click", () => {
  refreshVisibleGalleryItems();
  lightboxIndex = lightboxItems.indexOf(item);
  lightboxReturnFocus = item;
  showLightboxImage(lightboxIndex);
  if (typeof lightbox?.showModal === "function") lightbox.showModal();
}));
$(".lightbox__close")?.addEventListener("click", () => lightbox?.close());
$(".lightbox__prev")?.addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
$(".lightbox__next")?.addEventListener("click", () => showLightboxImage(lightboxIndex + 1));
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox?.addEventListener("close", () => lightboxReturnFocus?.focus({ preventScroll: true }));
lightbox?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") { event.preventDefault(); showLightboxImage(lightboxIndex - 1); }
  if (event.key === "ArrowRight") { event.preventDefault(); showLightboxImage(lightboxIndex + 1); }
});

// Image failure fallback makes external-media outages visible but does not hide page content.
$$('img').forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("media-unavailable");
    const parent = image.parentElement;
    parent?.classList.add("has-media-error");
    if (parent && !$(".media-fallback-label", parent)) {
      const note = document.createElement("span");
      note.className = "media-fallback-label";
      note.textContent = "Illustrative image unavailable offline";
      parent.append(note);
    }
  });
  // Also handle images that finished failing before this module attached its listener.
  if (image.complete && image.naturalWidth === 0 && image.currentSrc) {
    image.dispatchEvent(new Event("error"));
  }
});

// Motion layer. GSAP is progressive enhancement, with reduced-motion and offline fallbacks.
function initFallbackReveals() {
  const revealItems = $$(".reveal");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
  revealItems.forEach((element) => observer.observe(element));
}
function initGSAP() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || prefersReducedMotion.matches) {
    initFallbackReveals();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro.fromTo(".hero__eyebrow", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55 })
    .fromTo("#hero-title", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9 }, "-=.25")
    .fromTo(".hero__lede", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .65 }, "-=.52")
    .fromTo(".hero__actions", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55 }, "-=.35")
    .fromTo(".hero__image-wrap", { clipPath: "inset(7% 0 0 0)", autoAlpha: 0 }, { clipPath: "inset(0% 0 0 0)", autoAlpha: 1, duration: 1.1 }, "-=.8")
    .fromTo(".hero-stamp", { scale: .82, rotation: -16, autoAlpha: 0 }, { scale: 1, rotation: -8, autoAlpha: 1, duration: .65 }, "-=.55");

  $$(".reveal").forEach((element) => {
    gsap.fromTo(element, { y: 24, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .8, ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  const signatureImage = $(".signature-stage__image img");
  if (signatureImage && $(".signature-stage")) {
    gsap.to(signatureImage, { yPercent: 4, scale: 1.07, ease: "none", scrollTrigger: {
      trigger: ".signature-stage", start: "top bottom", end: "bottom top", scrub: 1
    }});
  }
  const heroImage = $(".hero__image");
  if (heroImage && window.innerWidth > 820) {
    gsap.to(heroImage, { yPercent: -4, ease: "none", scrollTrigger: {
      trigger: ".hero", start: "top top", end: "bottom top", scrub: .7
    }});
  }

  const counterSection = $("[data-review-counter]");
  if (counterSection) {
    const counterState = { rating: 0, count: 0 };
    let counterStarted = false;
    ScrollTrigger.create({ trigger: counterSection, start: "top 82%", once: true, onEnter: () => {
      if (counterStarted) return;
      counterStarted = true;
      gsap.to(counterState, { rating: BUSINESS.rating, count: BUSINESS.reviewCount, duration: 1.6, ease: "power2.out", onUpdate: () => {
        if (ratingNode) ratingNode.textContent = counterState.rating.toFixed(1);
        if (reviewCountNode) reviewCountNode.textContent = Math.round(counterState.count).toLocaleString("en-IN");
      }, onComplete: () => {
        if (ratingNode) { ratingNode.textContent = BUSINESS.rating.toFixed(1); ratingNode.setAttribute("aria-label", `${BUSINESS.rating.toFixed(1)} out of 5`); }
        if (reviewCountNode) reviewCountNode.textContent = BUSINESS.reviewCount.toLocaleString("en-IN");
      }});
    }});
  }
  window.addEventListener("pagehide", () => {
    intro.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { once: true });
}
window.addEventListener("load", () => {
  if (window.gsap && window.ScrollTrigger) initGSAP();
  else initFallbackReveals();
}, { once: true });

// If the external animation CDN never responds, all sections still render and remain interactive.
if (prefersReducedMotion.matches) {
  $$(".reveal").forEach((element) => element.classList.add("is-revealed"));
}
