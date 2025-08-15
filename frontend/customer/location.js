// Open modal on "Deliver in" click
document.getElementById("location-btn").addEventListener("click", function () {
    document.getElementById("location-modal").classList.remove("hidden");
});

// Close modal when clicking outside
document.getElementById("location-modal").addEventListener("click", function (event) {
    if (event.target === this) {
        this.classList.add("hidden");
    }
});

// Function to set location manually from modal
function setLocation(location) {
    document.getElementById("selected-location").textContent = location;
    document.getElementById("location-modal").classList.add("hidden");

    // Save in local storage
    localStorage.setItem("selectedLocation", location);

    // Send to backend database
    saveLocationToDB({ location: location });
}

// Auto detect location via GPS
function detectUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Send GPS coords to backend
                saveLocationToDB({ latitude: lat, longitude: lon });
            },
            function (error) {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.warn("Geolocation not supported by this browser.");
    }
}

// Send location to backend
function saveLocationToDB(locationData) {
    fetch("/save-location", { // <-- Your backend endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(locationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Location saved:", data);
    })
    .catch(error => {
        console.error("Error saving location:", error);
    });
}

// Load saved location on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
        document.getElementById("selected-location").textContent = savedLocation;
    } else {
        // Optionally auto-detect if not set
        detectUserLocation();
    }
});
