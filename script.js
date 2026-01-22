// Konfiguration
const CONFIG = {
    url: "https://zoom.us/j/98913147891?pwd=dHhvWE92c0VIQ1hobVJpRS8zQVdlQT09",
    delaySeconds: 5
};

// DOM Elements
const redirectView = document.getElementById('redirect-view');
const helpView = document.getElementById('help-view');
const progressBar = document.getElementById('progress-bar');
const helpBtn = document.getElementById('help-btn');
const backBtn = document.getElementById('back-btn');
const manualJoinBtn = document.getElementById('manual-join-btn');

// State
let timeLeft = CONFIG.delaySeconds * 1000;
let timerInterval;
let isPaused = false;
const totalTime = CONFIG.delaySeconds * 1000;

// Funktioner
function startTimer() {
    // Rensa eventuell gammal timer
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft -= 50; // Uppdatera var 50ms
            
            // Uppdatera progress bar
            const percentage = 100 - ((timeLeft / totalTime) * 100);
            progressBar.style.width = `${percentage}%`;

            // Kontrollera om tiden är ute
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                window.location.href = CONFIG.url;
            }
        }
    }, 50);
}

function showHelp() {
    isPaused = true;
    redirectView.classList.add('hidden');
    helpView.classList.remove('hidden');
    helpView.classList.add('flex');
}

function hideHelp() {
    isPaused = false;
    helpView.classList.add('hidden');
    helpView.classList.remove('flex');
    redirectView.classList.remove('hidden');
    
    // Valfritt: Återställ tid lite grann så användaren hinner reagera
    if (timeLeft < 1000) timeLeft = 2000;
}

function manualJoin() {
    window.location.href = CONFIG.url;
}

// Event Listeners
helpBtn.addEventListener('click', showHelp);
backBtn.addEventListener('click', hideHelp);
manualJoinBtn.addEventListener('click', manualJoin);

// Starta appen
startTimer();