
# <center>FKDR CHECKER</center>
<center>a tool to check how many finals you need to advance your bedwars fkdr</center>

### Disclaimer
Some things were taken and modified from OhChit's [Abyss Overlay](https://github.com/Chit132/abyss-overlay). Please check it out!

⚠️ **Please read the API Warning** ⚠️

### Current Development State
This is a relatively new project which was developed for personal use. For anybody who is unaware, to use the Hypixel API (which is how you get player stats and info), you need a API key, which every player is provided with via the ``/api new`` command. This API key should be *kept private*, so I cannot include it in the program. Setting up a system to ask for and store everybody's API keys is a step that I am not going to take yet, so I will not be including a way to install this program. If everybody had access to my API key, I could get banned. Anybody who is tech savvy enough is more than welcome to build their own version of the FKDR Checker, build instructions are included below.
 
**Moving forward, I will be making this app more accessible.** You will be able to use your own API key and download and install it directly from this repository.
 
Thank you for using my app!!! ❤️

## Usage
Once installed, you can enter anybody's name and it will tell you how many finals they need until each milestone. The milestones are the next whole number (3), the next tenth (2.4), and the next hundreth (2.33).

## API Warning
Every Hypixel player has access to the free public API with a limit of 120 queries a minute. There is also a limit on how often you can look up the same player in a 2-5 minute perious (I'm not sure exactly how long). Abuse of this limit **can result in an API ban, or even a server ban. I am not responsible for any consequences from using this program**

## Build Instructions
This project is created in node.js and electron.<br />
After cloning the project from this repo, replace the ``apiKey`` variable in src/index.js with your own API key.<br />
Make sure the dependencies are installed and then build it! 
