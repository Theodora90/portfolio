// LIGHT AND DARK THEME FUNCTIONALITY
function changeStylesheet(themeStyleSheet) {
    localStorage.setItem("newTheme", JSON.stringify(themeStyleSheet));
    document.getElementById("themes").setAttribute("href", themeStyleSheet);
}

function theme() {
    const theme = JSON.parse(localStorage.getItem("newTheme"));
    if (theme == null) {
        document
            .getElementById("themes")
            .setAttribute("href", "./assets/css/dark.css");
    } else if (theme) {
        document.getElementById("themes").setAttribute("href", theme);
    }
}
theme();

function paginateProjects() {
  const section = document.querySelector("#projects");
  const projects = section.querySelectorAll(".col-lg-6");
  const projectsPerPage = 6;
  let currentPage = 1;

  function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage - 1;

    projects.forEach((project, index) => {
      if (index >= startIndex && index <= endIndex) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  }

  function createPaginationButtons() {
    const numPages = Math.ceil(projects.length / projectsPerPage);

    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination-container", "text-center", "mt-5");

    const previousButton = document.createElement("button");
    previousButton.classList.add("pagination-button", "previous-button", "btn-warning", "btn", "mx-1");
    previousButton.innerText = "Previous";
    previousButton.disabled = true;

    const nextButton = document.createElement("button");
    nextButton.classList.add("pagination-button", "next-button", "btn-warning", "btn", "mx-1");
    nextButton.innerText = "Next";
    if (numPages <= 1) {
      nextButton.disabled = true;
    }

    paginationContainer.appendChild(previousButton);

    for (let i = 1; i <= numPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.classList.add("pagination-button", "page-button", "btn-warning", "btn", "mx-1");
      pageButton.innerText = i;
      if (i === 1) {
        pageButton.classList.add("active");
      }
      paginationContainer.appendChild(pageButton);
    }

    paginationContainer.appendChild(nextButton);

    section.appendChild(paginationContainer);

    previousButton.addEventListener("click", () => {
      currentPage--;
      showPage(currentPage);
      updateActiveButton();
      updatePaginationButtons();
    });

    nextButton.addEventListener("click", () => {
      currentPage++;
      showPage(currentPage);
      updateActiveButton();
      updatePaginationButtons();
    });

    const pageButtons = paginationContainer.querySelectorAll(".page-button");

    pageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentPage = Number(button.innerText);
        showPage(currentPage);
        updateActiveButton();
        updatePaginationButtons();
      });
    });

    function updatePaginationButtons() {
      if (currentPage === 1) {
        previousButton.disabled = true;
      } else {
        previousButton.disabled = false;
      }

      if (currentPage === numPages) {
        nextButton.disabled = true;
      } else {
        nextButton.disabled = false;
      }
    }

    function updateActiveButton() {
      pageButtons.forEach((button) => {
        button.classList.remove("active");
        if (Number(button.innerText) === currentPage) {
          button.classList.add("active");
        }
      });
    }
  }

  showPage(currentPage);
  createPaginationButtons();
}
paginateProjects();
