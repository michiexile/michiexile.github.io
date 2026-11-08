"use strict";

const list = document.querySelector("#project-list");
const projects = Array.from(list.querySelectorAll(".project"));
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const count = document.querySelector("#project-count");
const status = document.querySelector("#filter-status");
const noResults = document.querySelector("#no-results");

function updateDirectory() {
  const words = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const project of projects) {
    const text = project.dataset.search.toLocaleLowerCase();
    project.hidden = !words.every((word) => text.includes(word));
    if (!project.hidden) visible += 1;
  }
  count.textContent = String(visible);
  status.textContent = `${visible} of ${projects.length} projects shown.`;
  noResults.hidden = visible > 0 || projects.length === 0;
}

function sortDirectory() {
  const ordered = projects.slice().sort((a, b) => {
    if (sort.value === "updated") {
      return b.dataset.updated.localeCompare(a.dataset.updated) || a.dataset.name.localeCompare(b.dataset.name);
    }
    return a.dataset.name.localeCompare(b.dataset.name, undefined, { sensitivity: "base" });
  });
  ordered.forEach((project, index) => {
    project.querySelector(".project-number").textContent = String(index + 1).padStart(2, "0");
    list.append(project);
  });
}

if (projects.length > 0) {
  document.querySelector("#directory-controls").hidden = false;
  search.addEventListener("input", updateDirectory);
  sort.addEventListener("change", sortDirectory);
  document.querySelector("#clear-search").addEventListener("click", () => {
    search.value = "";
    updateDirectory();
    search.focus();
  });
  // Respect search values restored by the browser after back/forward navigation.
  sortDirectory();
  updateDirectory();
}
