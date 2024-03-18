import { rl } from "../utilsJs/readLine.js";


// variable for overall attacks
let attacks = 0;

const DELAY = 1000; // delay after enemy's wrong name

// fct for handling attacks
export async function startAttack(page, enemy) {
    // for check if enemy's name is wrong       
    let enemyWrong;

    try {
        await page.waitForSelector(".menu", { visible: true, timeout: 3000 });
        // clicks twice on 'Battle' menu
        await page.click(".menu > li:nth-child(8) > a");
        await page.click(".menu > li:nth-child(8) > a");

        // check if '.battlecountdown' exists
        const battleCountDown = await page.$('.battlecountdown');

        // if 'battleCountDown' doesn't eixsts, starts battle
        if (!battleCountDown) {
            await page.waitForSelector("input[type='text']", { visible: true, timeout: 3000 });

            // deletes the input's value
            await page.$eval('input[type="text"]', input => input.value = '');

            // enter enemy's name
            await page.type("input[type='text']", enemy, { delay: 25 });

            // click on battle
            await page.click(".button.submit");

            // Check if enemy's name is wrong
            enemyWrong = await page.$('.popup.small');

            if (enemyWrong) {
                // close pop up message
                await page.click('.button.close');
                // wait 1 sec
                await new Promise(resolve => setTimeout(resolve, DELAY));
                // throw an error
                throw new Error(`Enemy's name is wrong!\n`)
            } else {
                // increment attacks by 1
                attacks++;
            }
        }
    } catch (error) {
        console.error(`\nError during startAttack phase: ${error}`);
    } finally {
        // over-writes the console output message / message remains on same line
        rl.output.write(`\rAttack: ${attacks}`);
    }
}