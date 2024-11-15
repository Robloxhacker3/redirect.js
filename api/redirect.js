// /api/redirect.js

export default function handler(req, res) {
  const { query } = req;
  const { hwid, step, zone } = query; // Extract HWID, step, and optional zone from the query

  // Start timing when the request is received
  const startTime = Date.now();

  // Check if HWID and step are provided in the query
  if (!hwid || !step) {
    return res.status(400).json({ error: "HWID and step are required parameters." });
  }

  // Handle missing or empty HWID parameter
  if (hwid.trim() === "") {
    return res.status(400).json({ error: "Invalid HWID. Please provide a valid HWID." });
  }

  // Handle missing or empty step parameter
  if (step.trim() === "") {
    return res.status(400).json({ error: "Invalid step. Please provide a valid step (1, 2, or 3)." });
  }

  const defaultZone = zone || 'Europe/Rome'; // Default zone if not provided

  let baseURL = `https://spdmteam.com/key-system-${step}?hwid=${hwid}&zone=${defaultZone}`;
  let API = "https://spdmteam.com/api/keysystem?step=";

  // Step 1 logic: Redirect to the updated URL with specific parameters for step 1
  if (step === "1") {
    const newerURL = baseURL.replace('https://spdmteam.com/key-system-', 'https://spdmteam.com/api/keysystem?hwid=')
                             .replace('&zone=Europe/Rome', `&zone=${defaultZone}&advertiser=lootlabs&OS=ios`);
    // Check if the URL exists or is empty before redirecting
    if (!newerURL) {
      return res.status(400).json({ error: "No valid link found for step 1. Please provide a valid link." });
    }

    // Calculate the time taken
    const timeTaken = Date.now() - startTime;

    // Return the time taken message
    res.status(200).json({
      message: `Redirecting to step 1 URL... Time taken: ${timeTaken}ms`
    });

    // Redirect after a 2-second delay
    setTimeout(() => {
      res.redirect(newerURL);
    }, 2000); // 2 seconds delay before redirecting
  } 
  // Step 2 logic: Redirect to a specific link for step 2
  else if (step === "2") {
    const linkStep2 = "https://loot-link.com/s?mYit"; // URL for step 2
    // Check if the URL exists or is empty before redirecting
    if (!linkStep2) {
      return res.status(400).json({ error: "No valid link found for step 2. Please provide a valid link." });
    }

    // Calculate the time taken
    const timeTaken = Date.now() - startTime;

    // Return the time taken message
    res.status(200).json({
      message: `Redirecting to step 2 URL... Time taken: ${timeTaken}ms`
    });

    // Redirect after a 2-second delay
    setTimeout(() => {
      res.redirect(linkStep2);
    }, 2000); // 2 seconds delay before redirecting
  } 
  // Step 3 logic: Redirect to a specific link for step 3
  else if (step === "3") {
    const linkStep3 = "https://loot-link.com/s?qlbU"; // URL for step 3
    // Check if the URL exists or is empty before redirecting
    if (!linkStep3) {
      return res.status(400).json({ error: "No valid link found for step 3. Please provide a valid link." });
    }

    // Calculate the time taken
    const timeTaken = Date.now() - startTime;

    // Return the time taken message
    res.status(200).json({
      message: `Redirecting to step 3 URL... Time taken: ${timeTaken}ms`
    });

    // Redirect after a 2-second delay
    setTimeout(() => {
      res.redirect(linkStep3);
    }, 2000); // 2 seconds delay before redirecting
  } 
  // Default fallback if step is not recognized
  else {
    return res.status(400).json({
      error: `Invalid step '${step}' or HWID '${hwid}' provided. Please check the parameters and try again.`
    });
  }
}
