module.exports = {
    ///everything before 'Functions' is considered a property
    ///properties are like named variables that store information about the elements on the webpage that the page object interacts with
    ///a property's value is usually a CSS Selector or XPath expression that uniquely identifies a specific element on the webpage
    
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardNumberField: '#number',
    cvvNumberField: '//div[@class="card-code-input"]//input[@id="code"]',
    newCardCheckbox: '#card-1',
    messageToDriverField: '#comment',
    iceCreamCounterValue: '//div[normalize-space()="2"]',
    
    // Buttons
    callATaxiButton: '//button[normalize-space()="Call a taxi"]', //'button=Call a taxi', this was template
    phoneNumberButton: '//div[@class="np-text"]', //'//div[starts-with(text(), "Phone number")]', //this was template
    nextButton: '//button[normalize-space()="Next"]', //'button=Next', template
    confirmButton: '//button[normalize-space()="Confirm"]', //'button=Confirm', template
    addCardPlusSignButton: '//img[@alt="plus"]', 

    supportivePlanButton: '//div[@class="tcard-title"][normalize-space()="Supportive"]',
    paymentMethodButton: '//div[@class="pp-text"]', //should it be filled out before "=true" or smth like that?
    linkCardButton: '//button[normalize-space()="Link"]',
    blanketAndHandkerchiefsButton: '//body[1]/div[1]/div[1]/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div[1]/div[2]/div[1]/span[1]',
    iceCreamPlusCounter: '//body[1]/div[1]/div[1]/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]', //should I add twice on plus or keep count on "zero count"?
    orderCarButton: '//button[@class="smart-button"]',
    driverInfoArrival: '//div[@class="order-header-title"]',
    iceCreamPlusButton: "div=+",

    // Modals
    phoneNumberModal: '//div[@class="number-picker open"]//div[@class="modal"]',
    paymentMethodModal: '.payment-picker.open',
    carSearchModal: '.order-body',

    //Other
    driverWindow: ".order-subbody",

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(20000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },

    messageToDriver: async function(messageToDriver) {
        const messageToDriverField = await $(this.messageToDriverField);
        //await messageToDriverField.waitForDisplayed();
        await messageToDriverField.setValue(messageToDriver);
        await browser.pause(20000);
    },

    addCreditCard: async function(creditCardNumber, cvvNumber) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const paymentMethodModal= await $(this.paymentMethodModal);
        await paymentMethodModal.waitForDisplayed();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const creditCardNumberField = await $(this.creditCardNumberField);
        await creditCardNumberField.setValue(creditCardNumber);
        const cvvNumberField = await $(this.cvvNumberField);
        await cvvNumberField.setValue(cvvNumber);
        const linkCardButton = await $(this.linkCardButton);
        //await linkCardButton.toBeClickable();
        await linkCardButton.click();
    },

    selectSupportivePlan: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
    },
    orderIceCreams: async function () {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.scrollIntoView();
        await iceCreamPlusButton.waitForClickable();
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();
      },
      placeCarOrder: async function() {
        const orderCarButton = await $(this.orderCarButton);
        await orderCarButton.waitForDisplayed();
        await orderCarButton.click();
        return orderCarButton;
    },
    
};
