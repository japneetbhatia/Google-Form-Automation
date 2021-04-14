const puppy = require("puppeteer");
const id = "hafacor406@gmail.com";
const pass = "406hafacor";

let title = "untitled form";
let ques = "Question";

async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximize"]
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.google.com/forms/about/");
    //Navigating to forms page
    await tab.click(".mobile-device-is-hidden.js-dropdown-toggle");
    await tab.waitForSelector("#identifierId", {
        visible: true
    });
    //Login
    await tab.type("#identifierId", id);
    await tab.click(".VfPpkd-Jh9lGc");
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle0"
    })]);
    await tab.waitForSelector("input[aria-label='Enter your password']", {
        visible: true
    });
    await tab.type("input[aria-label='Enter your password']", pass);
    await tab.click('#passwordNext');
    await tab.waitForNavigation({
        waitUntil: "networkidle2"
    });
    //Selecting Form Type
    await tab.waitForSelector("div[id = ':1g']", {
        visible: true
    });
    await tab.click("div[id = ':1g']");
    //Form title
    await tab.waitForSelector('textarea[aria-label="Form title"]', {
        visible: true
    });
    await tab.click('textarea[aria-label="Form title"]');
    await tab.$eval('textarea[aria-label="Form title"]', el => el.value = '');
    await tab.type('textarea[aria-label="Form title"]', title);
    //Adding question
    await tab.waitForSelector('textarea[aria-label="Question title"]', {
        visible: true
    });
    await tab.click('textarea[aria-label="Question title"]');
    await tab.$eval('textarea[aria-label="Question title"]', el => el.value = '');
    await tab.type('textarea[aria-label="Question title"]', ques);
    //dropdown
    await tab.waitForSelector(".quantumWizMenuPaperselectOption.appsMaterialWizMenuPaperselectOption.exportOption.isSelected", {
        visible: true
    });
    await tab.click(".quantumWizMenuPaperselectOption.appsMaterialWizMenuPaperselectOption.exportOption.isSelected");
    //add more ques
    await tab.click("div[aria-label='Add question']")
    //theme
    await tab.click('div[guidedhelpid="paletteGH"]')
    await tab.click('div[data-color="#ff9800"]')
    // await tab.click('div[data-color="#d1c4e9"]')
    //send
    await tab.click('div[data-action-id="freebird-send-form"]')
    //Adding details
    await tab.type('input[aria-label="To"]', id);
    await tab.click('input[aria-label="Subject"]');
    await tab.$eval('input[aria-label="Subject"]', el => el.value = '');
    await tab.type('input[aria-label="Subject"]', title);
    //sending mail
    await tab.waitForSelector('div[jsname="Pa7pyf"]', {
        visible: true
    });
    await tab.click('div[jsname="Pa7pyf"]');
    //going to gmail
    await tab.goto("https://mail.google.com/mail/u/0/#inbox");
    await tab.waitForTimeout(1000);
    await browser.close();
}

main();