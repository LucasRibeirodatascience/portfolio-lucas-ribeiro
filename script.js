const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const toggle = document.querySelector(".nav__toggle");
const year = document.querySelector("[data-year]");
const links = Array.from(document.querySelectorAll(".nav__links a"));
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  const isScrolled = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", isScrolled);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

toggle?.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  menu?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    toggle?.setAttribute("aria-expanded", "false");
    menu?.classList.remove("is-open");
    header?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-25% 0px -60% 0px",
    threshold: [0.2, 0.4, 0.6],
  },
);

sections.forEach((section) => observer.observe(section));
