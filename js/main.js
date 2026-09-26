// ===========================================================
// Simon Lendrum — shared site behaviour
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // Email "click to reveal" — keeps the address out of the page
  // source so basic scrapers can't harvest it directly.
  var revealLinks = document.querySelectorAll("[data-email-reveal]");
  revealLinks.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      // Address is split and reversed here; replace the two parts
      // below with the real account details before publishing.
      var user = "skoobmurdnelnomis"; // reversed: simonlendrumbooks
      var domain = "moc.liamg"; // reversed: gmail.com
      var address = user.split("").reverse().join("") + "@" + domain.split("").reverse().join("");
      el.textContent = address;
      el.setAttribute("href", "mailto:" + address);
    });
  });

  // Auto "Upcoming" labelling for the News & Events timeline.
  // Each entry with a data-event-date attribute (YYYY-MM-DD) gets
  // an "Upcoming" tag added automatically if that date hasn't
  // passed yet, and the tag is skipped entirely once it has —
  // no manual editing required as events come and go.
  var today = new Date();
  document.querySelectorAll("[data-event-date]").forEach(function (entry) {
    var eventDate = new Date(entry.getAttribute("data-event-date"));
    var tag = entry.querySelector(".upcoming-tag");
    if (eventDate >= today) {
      if (!tag) {
        tag = document.createElement("span");
        tag.className = "upcoming-tag";
        tag.textContent = "Upcoming";
        entry.prepend(tag);
      }
    } else if (tag) {
      tag.remove();
    }
  });
});
