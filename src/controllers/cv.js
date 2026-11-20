import { portfolio } from "../models/portfolio.js";
import { renderCVPage } from "../views/cvView.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCVPage(portfolio.profile, portfolio.skills, portfolio.projects);
});
