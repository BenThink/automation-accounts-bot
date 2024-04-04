# automation-accounts-bot

This project is an *automation bot* for a browser game.

It was built using *Puppeteer / JavaScript / Node.js*

Logic-Flow: main.js -> mainControl.js -> startBotActions.js -> logIn.js -> attack.js

*The bot is started from Terminal / PowerShell (npm start) and its main purpose is to log in multiple accounts and perfom a given task:*
1. asks the user how many accounts to log in
2. asks the user how many attack cycles to perform
3. checks data to be correct entered, if not -> user has 2 more attempts to enter, if still wrong -> stops execution
4. based on the no. of accounts given by the user, it starts 1 by 1 to ask for:
- username & password
- enemy's name
- headless mode(true/false)
5. closes the readLine interface

 *Based on the data collected it does the following steps:*
1. starts the 1st attack cycle and opens chrome
2. opens new page / each account
3. logs in the player
4. checks if the loggin was successful, if not -> it has 2 more attempts to re-log in, if still fails -> displays error, closes the current page and goes to the next account
5. if logging successes -> clicks on Battle menu, checks if battle is on, if off -> checks if enemy's name is correct, if yes -> fights a player chosen by the user, if not -> displays an error and the attack number
6. logs out the player and closes the current page
7. repeats the same steps for each account in each attack cycle
8. waits for a fixed delay of time (doesn't wait for the last attack cycle)
9. closes the browser instance
10. the 1st attack cycle ends
11. repeats the same steps with each attack cycle 
12. displays in Terminal the following data:
 - no. of attack cyles / updates the data on same line
 - no. of attack / updates the data on same line


  *Here's a Print Screen of the bot in action:*
![image](https://github.com/BenThink/automation-accounts-bot/assets/28758782/7ed03fcc-3f48-4fc4-acd8-ac41c115d7b3)


