import puppeteer from "puppeteer";
import { logIn } from '../actions/logIn.js';
import { startAttack } from '../actions/startAttack.js';


let browser;

// fct calling other fcts to procced further with the Bot flow
export async function startBotActions(accounts) {
    try {
        if (!browser) {
            // launches chrome instance with some confing.
            browser = await puppeteer.launch({
                // show or not the chrome interface
                headless: accounts[0].headlessMode === 'true',
                defaultViewport: null
            });
        }

        // 1 sec. delay 
        const delayTime = 1000;

        // loop over accounts
        for (const account of accounts) {
            let page;

            try {
                // open new page for each account
                page = await browser.newPage();

                // call logIn function
                await logIn(page, account);

                // wait 1 sec. between fcts.
                await new Promise(resolve => setTimeout(resolve, delayTime));

                // call startAttack function
                await startAttack(page, account.enemy);

                // logging out
                const logOutButton = await page.waitForSelector('#hmenu > li:nth-child(5) > a', { visible: true, timeout: 3000 });
                await logOutButton.click();
            } catch (error) {
                // Handle errors for individual accounts
                console.error(`\nError for account '${account.username}' --> ${error}`);
            } finally {
                if (page) {
                    // wait 1 sec. before closing the current page
                    await new Promise(resolve => setTimeout(resolve, delayTime));

                    // close the page after each acc
                    await page.close();
                }
            }
        }
    } catch (error) {
        console.error(`\nError during startBotActions phase: ${error}\n`);
    } finally {
        if (browser) {
            // close the browser after all accounts
            await browser.close();
            browser = null; // reset browser variable to allow opening a new browser in the next attack cycle
        }
    }
}
