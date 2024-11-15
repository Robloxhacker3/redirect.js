// /api/redirect.js

export default function handler(req, res) {
  // Log the query parameters to check if they're being passed correctly
  console.log(req.query);

  const { hwid, step, zone } = req.query;

  // Check if hwid or step are missing
  if (!hwid || !step) {
    console.error("Missing HWID or Step");
    return res.status(400).json({ message: "Error: Both HWID and Step are required parameters." });
  }

  // Log the parameters to ensure they're received
  console.log(`HWID: ${hwid}, Step: ${step}, Zone: ${zone}`);

  // Simulate the processing logic
  const startTime = Date.now();

  const defaultZone = zone || 'Europe/Rome';
  let baseURL = `https://spdmteam.com/key-system-${step}?hwid=${hwid}&zone=${defaultZone}`;

  // Handle different steps and provide status message
  if (step === "1") {
    const newerURL = baseURL.replace('https://spdmteam.com/key-system-', 'https://spdmteam.com/api/keysystem?hwid=')
                             .replace('&zone=Europe/Rome', `&zone=${defaultZone}&advertiser=lootlabs&OS=ios`);
    
    const timeTaken = Date.now() - startTime;
    console.log(`Redirecting to: ${newerURL}`);
    res.status(200).json({
      message: `Redirecting to Step 1... Time taken: ${timeTaken}ms`
    });
    
    setTimeout(() => {
      res.redirect(newerURL);
    }, 2000);  // Redirect after 2 seconds
  } else if (step === "2") {
    const linkStep2 = "https://loot-link.com/s?mYit";
    const timeTaken = Date.now() - startTime;
    console.log(`Redirecting to: ${linkStep2}`);
    res.status(200).json({
      message: `Redirecting to Step 2... Time taken: ${timeTaken}ms`
    });
    
    setTimeout(() => {
      res.redirect(linkStep2);
    }, 2000);  // Redirect after 2 seconds
  } else if (step === "3") {
    const linkStep3 = "https://loot-link.com/s?qlbU";
    const timeTaken = Date.now() - startTime;
    console.log(`Redirecting to: ${linkStep3}`);
    res.status(200).json({
      message: `Redirecting to Step 3... Time taken: ${timeTaken}ms`
    });
    
    setTimeout(() => {
      res.redirect(linkStep3);
    }, 2000);  // Redirect after 2 seconds
  } else {
    console.error(`Invalid step '${step}' provided`);
    return res.status(400).json({
      message: `Error: Invalid step '${step}' provided. Please check the parameters and try again.`
    });
  }
}
