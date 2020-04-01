# Random Challenge App (Working Title)
*A web app where you can add, track, and randomly select a coding challenge.*

As someone who is in the middle of the job hunt, I need to practice my algorithms as much as I can. But I've noticed that I have unconsciously (or consciously) been cherry picking coding challenges. I would attempt those that I thought were easy or were similar to past problems I had solved - neglecting those that I wasn't as proficient in. It was also difficult to decide on one particular problem to work on during my study sessions. There are so many topics and problems that I just kind of froze. I needed something that would essentially make the decision for me, something to give me a random challenge.

Something that would allow me to:
  * Add coding challenges with a link, name, and list of category(s)
  * Randomly pick a coding challenge to attempt
    * Include previously completed/attempted challenges in the selection
      * I want to be able to go back and reattempt some challenges - to make sure that I understood my previous answer, or try to refactor it
  * Filter challenges through category(s) or status (attempted, completed, not attempted)

While LeetCode's "Pick One" feature/button accomplishes most (if not all) of these features, I figured why not make my own from scratch?

## Getting Started
### Installation

You can fork the project and clone your forked copy to your desired folder via the git command:

`git clone https://github.com/[INSERT_FORKED_NAME]/random-challenge.git`

Navigate into the project folder:

`cd random-challenge`

Then install the required dependencies using:

`npm install`

Next, turn on the server by running this command and navigating to localhost:3000 on your browser (preferably Google Chrome):

`npm start`

Should you make any changes on your fork and would like to see them in the browser, run webpack with `npm run build`
