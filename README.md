# automation-accounts-bot

This project is an *automation bot* for a browser game.

It was built using *Puppeteer / JavaScript / Node.js*

*The bot is started from Terminal / PowerShell and its main purpose is to log in multiple accounts and perfom a given task:*
1. asks the user how many accounts to log in
2. asks the user how many attack cycles to perform
3. based on the no. of accounts given by the user, it starts 1 by 1 to ask for:
- username & password
- enemy's name
- headless mode(true/false)
4. closes the readLine interface

 *Based on the data collected it does the following steps:*
1. starts the 1st attack cycle
2. opens chrome & new page
3. logs in the player
4. checks if the loggin was successful, if not -> it has 2 more attempts to re log in
5. clicks on Battle menu, checks if battle is on, if off -> fights a player chosen by the user
6. logs out the player   
7. closes the browser instance
8. repeats the same steps with each account given by the user
9. waits for a fixed delay of time (doesn't wait for the last attack cycle)
10. the 1st attack cycle ends
11. the 2nd attack cycle starts and it repeats the same process based on the no. of attack cycles given by the user
12. displays in Terminal the following data:
 - no. of attack cyles / updates the data on same line
 - no. of attack / updates the data on same line

  *Here's a Print Screen of the bot in action:*
![image](https://github.com/BenThink/automation-accounts-bot/assets/28758782/7ed03fcc-3f48-4fc4-acd8-ac41c115d7b3)


