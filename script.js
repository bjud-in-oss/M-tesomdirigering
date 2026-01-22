document.addEventListener('DOMContentLoaded', () => {
    // --- Konfiguration ---
    const MEETING_URL = "https://zoom.us/j/98913147891?pwd=dHhvWE92c0VIQ1hobVJpRS8zQVdlQT09";
    const DELAY_SECONDS = 5;

    // --- Hämta element ---
    const redirectView = document.getElementById('redirect-view');
    const helpView = document.getElementById('help-view');
    const progressBar = document.getElementById('progress-bar');
    const helpBtn = document.getElementById('help-btn');
    const backBtn = document.getElementById('back-btn');
    const manualJoinBtn = document.getElementById('manual-join-btn');
    const directLink = document.getElementById('direct-link');

    // Säkerställ att kritiska element finns
    if (!redirectView || !progressBar) {
        console.error("Kritiska element saknas. Försöker omdirigera direkt.");
        window.location.href = MEETING_URL;
        return;
    }

    // Uppdatera fallback-länkar
    if (directLink) directLink.href = MEETING_URL;

    // --- State ---
    let timeLeft = DELAY_SECONDS * 1000;
    const totalTime = DELAY_SECONDS * 1000;
    let isPaused = false;
    let timerInterval = null;

    // --- Funktioner ---

    function performRedirect() {
        console.log("Omdirigerar till:", MEETING_URL);
        window.location.href = MEETING_URL;
    }

    function updateProgress() {
        if (!progressBar) return;
        // Räkna ut procent (100% vid start, minskar inte för att vi vill fylla den? 
        // Eller fylla från 0 till 100? Låt oss fylla den från 0 till 100.)
        // Vid start: timeLeft = 5000. (5000/5000)*100 = 100. 100-100 = 0%.
        // Vid slut: timeLeft = 0. (0/5000)*100 = 0. 100-0 = 100%.
        const percentage = Math.max(0, 100 - ((timeLeft / totalTime) * 100));
        progressBar.style.width = `${percentage}%`;
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        
        // Uppdatera direkt vid start
        updateProgress();

        timerInterval = setInterval(() => {
            if (!isPaused) {
                timeLeft -= 50; // Minska med 50ms varje tick
                updateProgress();

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    performRedirect();
                }
            }
        }, 50);
    }

    function showHelp() {
        isPaused = true;
        if (redirectView) redirectView.classList.add('hidden');
        if (helpView) {
            helpView.classList.remove('hidden');
            helpView.classList.add('flex');
        }
    }

    function hideHelp() {
        isPaused = false;
        if (helpView) {
            helpView.classList.add('hidden');
            helpView.classList.remove('flex');
        }
        if (redirectView) redirectView.classList.remove('hidden');
        
        // Återställ tiden lite om den var nära slutet, så användaren inte slussas iväg direkt
        if (timeLeft < 2000) {
            timeLeft = 2500;
        }
    }

    // --- Event Listeners ---
    if (helpBtn) helpBtn.addEventListener('click', showHelp);
    if (backBtn) backBtn.addEventListener('click', hideHelp);
    if (manualJoinBtn) manualJoinBtn.addEventListener('click', performRedirect);

    // --- Starta ---
    startTimer();
});