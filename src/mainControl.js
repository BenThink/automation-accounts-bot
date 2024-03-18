import { askQuestionsLetter } from "../utilsJs/askQuestionsLetter.js";
import { askQuestionsLetterNr } from "../utilsJs/askQuestionsLetterNr.js";
import { askQuestionsNumber } from "../utilsJs/askQuestionsNumber.js";

import { rl } from '../utilsJs/readLine.js';
import { startBotActions } from './startBotActions.js';
import readline from 'readline';


const MAX_RETRY = 3; // tries for entering data
const DELAY_RETRY = 3000; // delay before trying again to enter data / millisec. to sec.(3)

// fct that handles the core flow/logic of the Bot
export async function mainControl() {
    for (let attempts = 1; attempts <= MAX_RETRY; attempts++) {
        try {
            console.log('\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');

            // getting user inputs
            const numberAccounts = await askQuestionsNumber("Enter number of accounts: ");
            const numberAccountsInt = parseInt(numberAccounts, 10);
            // getting user inputs
            const totalAttackCycles = await askQuestionsNumber("Enter number of attack cycles: ");
            const totalAttackCyclesInt = parseInt(totalAttackCycles, 10);

            console.log('---------------------------------------------------');

            // array for the objects
            const accounts = [];

            // gets user inputs based on nr of acc
            for (let i = 0; i < numberAccountsInt; i++) {
                console.log(`\nAccount: ${i + 1}`);
                const username = await askQuestionsLetter("Enter your username: ");
                const password = await askQuestionsLetterNr("Enter your password: ");
                const enemy = await askQuestionsLetter("Enter enemy's name: ");
                const headlessMode = await askQuestionsLetter("Headless mode (true/false): ");
                accounts.push({ username, password, enemy, headlessMode }); // create & push objects into the array var
            }
            console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n');

            // close interface
            rl.close();

            for (let i = 0; i < totalAttackCyclesInt; i++) {
                if (i > 0) {
                    // Move to previous line and clear it
                    readline.moveCursor(rl.output, 0, -1);
                    readline.clearLine(rl.output, 0);
                }

                // Print 'Attack Cycles' at the start of each cycle.
                rl.output.write(`\rAttack Cycle: ${i + 1}\n`);

                await startBotActions(accounts);

                if (i < totalAttackCyclesInt - 1) {
                    // create 5min delay variable
                    const battleTime = (5 * 60) * 1000; // convert to millisec.
                    await new Promise(resolve => setTimeout(resolve, battleTime)); // apply delay var
                }
            }
            console.log('\n');
            break; // Exit the loop if data was entered correct
        } catch (error) {
            console.error(`\nError during mainControl phase: ${error}`);

            // if all login attempts failed
            if (attempts === MAX_RETRY) {
                console.error('All attempts to enter data failed! Exiting the bot...\n');
                process.exit(1); // Exit the process with a failure code
            }

            // Wait 3 sec before trying again
            await new Promise(resolve => setTimeout(resolve, DELAY_RETRY));
        }
    }
}