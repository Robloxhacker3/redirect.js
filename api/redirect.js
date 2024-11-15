// API base URL for redirection to key system steps with bypass functionality
const API = "https://spdmteam.com/api/keysystem?step=";
const bypassAPI = "&bypass=trying%20to%20bypass%20link";  // Adding bypass parameter
const advertiser = "linkvertise";  // Set advertiser to Linkvertise
const os = "android";  // Set OS to Android
const timeoutDuration = 3000; // Time in ms before redirecting
const successMessageDuration = 5000; // Success message display duration
const maxRetries = 3; // Max number of retries on failure

// Step-by-step redirection messages
const redirectMessages = {
    step1: "Redirecting to Step 1... Please wait.",
    step2: "Redirecting to Step 2... Please wait.",
    step3: "Redirecting to Step 3... Please wait.",
    stepCompleted: "Redirect completed successfully. You can now proceed.",
    error: "Error: Invalid URL. Please provide a valid Linkvertise URL.",
    loading: "Please wait while we are processing your request...",
    apiError: "Error: Unable to process the request. Retrying..."
};

// Utility function to display a message
function createMessage(message, bgColor = '#000', textColor = '#fff') {
    const messageElement = document.createElement('div');
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.padding = '20px';
    messageElement.style.backgroundColor = bgColor;
    messageElement.style.color = textColor;
    messageElement.style.fontSize = '16px';
    messageElement.style.zIndex = '9999';
    messageElement.style.borderRadius = '5px';
    messageElement.innerText = message;
    document.body.appendChild(messageElement);
    setTimeout(() => messageElement.remove(), successMessageDuration);  // Message disappears after successMessageDuration
}

// Function to handle redirection logic with retry mechanism
async function handleRedirection(retries = 0) {
    const currentURL = window.location.href;
    const pageTitle = document.title;

    // Track the time of the first click for performance analytics
    const startTime = new Date().getTime();
    console.log("Redirection started at: " + startTime);

    try {
        if (currentURL.includes("https://spdmteam.com/key-system-1?hwid=")) {
            // Step 1: Redirecting to Step 1
            createMessage(redirectMessages.step1);
            const updatedURL = currentURL.replace('https://spdmteam.com/key-system-1?hwid=', `${API}1&advertiser=${advertiser}&OS=${os}${bypassAPI}`);
            await redirectToURL(updatedURL);

        } else if (currentURL.includes("https://spdmteam.com/key-system-2?hwid=")) {
            // Step 2: Redirecting to Step 2
            createMessage(redirectMessages.step2);
            const updatedURL = currentURL.replace('https://spdmteam.com/key-system-2?hwid=', `${API}2&advertiser=${advertiser}&OS=${os}${bypassAPI}`);
            await redirectToURL(updatedURL);

        } else if (currentURL.includes("https://spdmteam.com/key-system-3?hwid=")) {
            // Step 3: Redirecting to Step 3
            createMessage(redirectMessages.step3);
            const updatedURL = currentURL.replace('https://spdmteam.com/key-system-3?hwid=', `${API}3&advertiser=${advertiser}&OS=${os}${bypassAPI}`);
            await redirectToURL(updatedURL);

        } else {
            // Handle errors if no valid link is detected
            createMessage(redirectMessages.error, '#ff4d4d', '#fff');
            console.error("Error: Invalid URL or missing parameters.");
        }

    } catch (error) {
        // Handle API call failure and retry mechanism
        if (retries < maxRetries) {
            retries++;
            createMessage(redirectMessages.apiError);
            console.log(`Retrying... Attempt ${retries}`);
            await handleRedirection(retries); // Retry the redirection
        } else {
            createMessage("Error: Multiple retries failed. Please try again later.", '#ff4d4d', '#fff');
            console.error("API request failed after multiple attempts:", error);
        }
    }

    // Analytics: Track redirection completion
    const endTime = new Date().getTime();
    const redirectTime = endTime - startTime;
    console.log(`Redirection completed in ${redirectTime} ms.`);
}

// Function to safely redirect to a URL with a retry mechanism
async function redirectToURL(url) {
    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });
        if (!response.ok) {
            throw new Error('Failed to fetch URL');
        }
        window.location.replace(url);  // Redirect if successful
    } catch (error) {
        throw new Error('API Error: ' + error.message);
    }
}

// Add a start button that triggers the redirection
function addStartButton() {
    const startButton = document.createElement('button');
    startButton.innerText = "Start Redirection";
    startButton.style.position = "fixed";
    startButton.style.bottom = "20px";
    startButton.style.left = "20px";
    startButton.style.padding = "10px";
    startButton.style.fontSize = "18px";
    startButton.style.backgroundColor = "#28a745";
    startButton.style.color = "#fff";
    startButton.style.border = "none";
    startButton.style.borderRadius = "5px";
    startButton.style.cursor = "pointer";
    startButton.addEventListener('click', () => {
        createMessage(redirectMessages.loading, '#000', '#fff');
        setTimeout(() => handleRedirection(), timeoutDuration);
    });
    document.body.appendChild(startButton);
}

// Add the start button to begin the redirection process
addStartButton();
