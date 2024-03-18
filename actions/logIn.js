const MAX_LOGIN_ATTEMPTS = 3; // Max number of attempts to try logging in
const RETRY_LOGIN_DELAY = 3000; // Delay between login attempts in milliseconds (3000ms = 3s)
const URL = "https://www.arislegends.com/index.php";

// logs in the user with given data
export async function logIn(page, { username, password }) {
    for (let attempt = 1; attempt <= MAX_LOGIN_ATTEMPTS; attempt++) {
        try {
            await page.goto(URL); // goes to game's url 
            await page.waitForSelector(".login-form", { visible: true, timeout: 3000 });

            await page.type("#l_user", username, { delay: 25 });
            await page.type("#l_pass", password, { delay: 25 });

            // waits for both actions to complete
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }), // waits for navig. triggered by click to finish
                page.click(".submit") // clicks on log in button
            ]);

            // checks for a specific class after log in
            const logInOk = await page.waitForSelector('#currency', { visible: true, timeout: 3000 });

            // checks if log in was successful
            if (logInOk) {
                break; // Exit the loop if login was successful
            }
        } catch (error) {
            console.error(`\nLogin attempt ${attempt} failed: ${error}`);

            // if all login attempts failed
            if (attempt === MAX_LOGIN_ATTEMPTS) {
                throw new Error('All login attempts failed!\n');
            }
            // Wait 3 sec before trying again
            await new Promise(resolve => setTimeout(resolve, RETRY_LOGIN_DELAY));
        }
    }
}