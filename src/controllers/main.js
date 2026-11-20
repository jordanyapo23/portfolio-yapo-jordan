import { portfolio } from "../models/portfolio.js";
import { renderProfile, renderTicker, renderSkills, renderProjects, renderContact, renderYear } from "../views/portfolioView.js";

function initPortfolio() {
  renderProfile(portfolio.profile);
  renderTicker(portfolio.technologies);
  renderSkills(portfolio.skills);
  renderProjects(portfolio.projects);
  renderContact(portfolio.profile);
  renderYear();
  initRevealEffects();
  initHeroSpotlight();
  initNavigation();
}

function initRevealEffects() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  elements.forEach((element) => observer.observe(element));
}

function initHeroSpotlight() {
  const hero = document.querySelector(".hero");
  if (!hero || !window.matchMedia("(pointer:fine)").matches) return;
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    hero.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  });
}

function initNavigation() {
  const menu = document.querySelector("#mainNav");
  document.querySelectorAll("#mainNav .nav-link, #mainNav .btn").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
  const header = document.querySelector("#header");
  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 12), { passive: true });
}

document.addEventListener("DOMContentLoaded", initPortfolio);
