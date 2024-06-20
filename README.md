# Project 8: Urban Routes Test Automation

## Project Description
Project 8, titled "Urban Routes Test Automation," involves writing automated tests to validate the functionality of the Urban Routes application. The primary objective is to ensure that the process of ordering a taxi is seamless and bug-free, covering everything from setting the address to simulating user interactions with the UI, like filling in phone numbers and payment details.

## Technologies Used
- **Node.js**: For running the JavaScript server-side.
- **WebDriverIO**: As the test automation framework running on Node.js.
- **Mocha**: For writing test cases in a structured format.

## Setup Instructions
1. **Clone the repository**:
  
   git clone git@github.com:<your-github-username>/hm08-qa-us.git
   cd hm08-qa-us

2. Install Dependencies:
Ensure that Node.js is installed on your system, then run:

npm install

3. Configuration:
Replace the base URL in the wdio.conf.js file with your server URL to connect to the Urban Routes server.

## How to Run Tests

To execute the automated tests, use the following command:

npm run wdio
