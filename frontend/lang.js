async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang-${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            if (translations[key]) {
                // अगर input या textarea है तो placeholder बदलें
                if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
                    el.setAttribute("placeholder", translations[key]);
                } else {
                    el.textContent = translations[key];
                }
            }
        });
    } catch (error) {
        console.error("Error loading language:", error);
    }
}

function toggleLanguage() {
    const langToggle = document.getElementById("languageToggle");
     const langToggle_mobile = document.getElementById("languageToggle-mobile");
    const langLabel = document.getElementById("lang-label");
      const langLabel_mobile = document.getElementById("lang-label-mobile");
     const isHindi = langToggle.checked || langToggle_mobile.checked;
    langToggle.checked = isHindi;
    langToggle_mobile.checked = isHindi;

    // Update labels
    langLabel.textContent = isHindi ? "हिंदी" : "EN";
    langLabel_mobile.textContent = isHindi ? "हिंदी" : "EN";

    // Load translations
    loadLanguage(isHindi ? "hi" : "en");
}
    
   


// Page load pe default English
document.addEventListener("DOMContentLoaded", () => loadLanguage("en"));
