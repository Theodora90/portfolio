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