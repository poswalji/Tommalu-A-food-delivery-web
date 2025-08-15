  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;

    const searchInput = document.getElementById("searchInput");
    const micBtn = document.getElementById("micBtn");
    const micPulse = document.getElementById("micPulse");
    const langToggle = document.getElementById("languageToggle");

    micBtn.addEventListener("click", () => {
        const currentLang = langToggle.checked ? "hi-IN" : "en-US";
        recognition.lang = currentLang;
        recognition.start();
    });

    recognition.addEventListener("start", () => {
        micPulse.classList.remove("hidden"); // Start pulse
        micBtn.classList.add("text-red-500");
    });

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
    });

    recognition.addEventListener("end", () => {
        micPulse.classList.add("hidden"); // Stop pulse
        micBtn.classList.remove("text-red-500");
    });