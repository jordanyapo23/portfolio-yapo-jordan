import { escapeHTML, safeURL, technologyIcon } from "./portfolioView.js";

export function renderCVPage(profile, skills, projects) {
  document.querySelectorAll("[data-profile]").forEach((element) => {
    const value = profile[element.dataset.profile];
    if (value) element.textContent = value;
  });

  const phone = document.querySelector("#cv-phone");
  phone.href = `tel:${encodeURIComponent(profile.phone)}`;
  phone.textContent = profile.phone;

  const email = document.querySelector("#cv-email");
  email.href = `mailto:${encodeURIComponent(profile.email)}`;
  email.textContent = profile.email;

  const github = document.querySelector("#cv-github");
  github.href = safeURL(profile.github);

  const skillNames = [...new Set(skills.flatMap((skill) => skill.technologies || []))];
  document.querySelector("#cv-skills").innerHTML = skillNames.map((name) =>
    `<span class="cv-skill">${technologyIcon(name)}${escapeHTML(name)}</span>`
  ).join("");

  document.querySelector("#cv-projects").innerHTML = projects.map((project, index) => `
    <article class="cv-project">
      <div class="cv-project-number">0${index + 1}</div>
      <div class="cv-project-content">
        <h3>${escapeHTML(project.name)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="cv-project-footer">
          <div class="cv-project-tags">${project.technologies.map((name) => `<span>${technologyIcon(name)}${escapeHTML(name)}</span>`).join("")}</div>
          <a href="${safeURL(project.url)}" target="_blank" rel="noopener noreferrer">Voir le code ↗</a>
        </div>
      </div>
    </article>`).join("");

  document.querySelector("#cv-year").textContent = new Date().getFullYear();
}
