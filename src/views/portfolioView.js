export function renderProfile(profile) {
  document.querySelectorAll("[data-profile]").forEach((element) => {
    const value = profile[element.dataset.profile];
    if (value) element.textContent = value;
  });
  const emailLink = document.querySelector("#email-link");
  if (emailLink && profile.email) emailLink.href = `mailto:${encodeURIComponent(profile.email)}`;
}

export function renderTicker(technologies) {
  const track = document.querySelector("#ticker-track");
  if (!track) return;
  const items = [...technologies, ...technologies];
  track.innerHTML = items.map((technology, index) => `
    <span class="ticker-item">${technologyIcon(technology)}<span>${escapeHTML(technology)}</span></span>${index < items.length - 1 ? '<i aria-hidden="true">&#10022;</i>' : ''}`).join("");
}

export function renderSkills(skills) {
  const container = document.querySelector("#skills-list");
  container.innerHTML = skills.map((skill, index) => `
    <article class="skill-row reveal">
      <span class="skill-index">0${index + 1}</span>
      <h3>${escapeHTML(skill.name)}</h3>
      <div class="skill-detail"><p>${escapeHTML(skill.detail)}</p><div class="skill-techs">${(skill.technologies || []).map((technology) => `<span class="tech-item">${technologyIcon(technology)}${escapeHTML(technology)}</span>`).join("")}</div></div>
      <span class="skill-arrow" aria-hidden="true">↗</span>
    </article>`).join("");
}

export function renderProjects(projects) {
  const container = document.querySelector("#projects-list");
  const count = document.querySelector("#project-count");
  if (count) count.textContent = `(${String(projects.length).padStart(2, "0")})`;
  container.innerHTML = projects.map((project, index) => `
    <div class="col-md-6 col-lg-4 reveal"><article class="project-card project-card--${index + 1}">
      <div class="project-visual" aria-hidden="true"><div class="visual-orbit"></div><span class="visual-number">0${index + 1}</span><span class="visual-label">${escapeHTML(project.technologies.join(" · "))}</span></div>
      <div class="project-body"><span class="project-category">${escapeHTML(project.category || "Projet")}</span>
        <h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p>
        <div class="project-tags">${project.technologies.map((technology) => `<span class="tag">${technologyIcon(technology)}${escapeHTML(technology)}</span>`).join("")}</div>
        <a class="project-link" href="${safeURL(project.url)}" target="_blank" rel="noopener noreferrer">Voir le code <span aria-hidden="true">↗</span></a>
      </div></article></div>`).join("");
}

export function renderContact(profile) {
  const links = [];
  if (profile.phone) links.push(`<a class="contact-link" href="tel:${encodeURIComponent(profile.phone)}"><span aria-hidden="true">☎</span> ${escapeHTML(profile.phone)}</a>`);
  if (profile.github) links.push(`<a class="contact-link" href="${safeURL(profile.github)}" target="_blank" rel="noopener noreferrer">${technologyIcon("GitHub")} GitHub <span aria-hidden="true">↗</span></a>`);
  if (profile.linkedin) links.push(`<a class="contact-link" href="${safeURL(profile.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`);
  document.querySelector("#contact-links").innerHTML = links.join("");
  const cvLink = document.querySelector("#cv-link");
  if (profile.cv) { cvLink.href = profile.cv; cvLink.removeAttribute("download"); cvLink.textContent = "Consulter mon CV ↗"; }
}

export function renderYear() { document.querySelector("#year").textContent = new Date().getFullYear(); }

export function technologyIcon(name) {
  const classes = {
    Flutter: "devicon-flutter-plain", Dart: "devicon-dart-plain",
    Python: "devicon-python-plain", Selenium: "devicon-selenium-original",
    HTML: "devicon-html5-plain", CSS: "devicon-css3-plain",
    JavaScript: "devicon-javascript-plain", GitHub: "devicon-github-original"
  };
  return `<i class="devicon ${classes[name] || "devicon-github-original"}" aria-hidden="true"></i>`;
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
export function safeURL(value) {
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? escapeHTML(url.href) : "#"; }
  catch { return "#"; }
}
