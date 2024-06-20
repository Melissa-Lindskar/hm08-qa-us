const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('1. Should set the address fields', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const address1Input = await $(page.fromField);
        const address2Input = await $(page.toField);
        await expect(address1Input).toHaveValue('East 2nd Street, 601');
        await expect(address2Input).toHaveValue('1300 1st St');
        await browser.pause(10000);
    })
    
    it('2. Should select a supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const address1Input = await $(page.fromField);
        const address2Input = await $(page.toField);
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeExisting();
        await browser.pause(10000);
    })
    
      
     it('3. Should open phone number modal and fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
      });
     
    it('4. Should add a credit card', async () => {
        await browser.url('/');  // Navigera till startsidan
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // Vänta på och klicka på betalmetod-knappen för att öppna betalmetodsmodulen
        await $(page.paymentMethodButton).waitForDisplayed();
        await $(page.paymentMethodButton).click();

        // Vänta på att betalmetodsmodulen ska visas
        await $(page.paymentMethodModal).waitForDisplayed();

        // Klicka på knappen för att lägga till ett nytt kort (plus-tecken)
        const addCardButton = await $(page.addCardPlusSignButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        // Fyll i kreditkortsinformationen
        const cardNumberField = await $(page.creditCardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue('4111111111111111');  // Exempel på ett Visa testkortnummer

        // Fyll i CVV och förlora sedan fokus för att aktivera 'Link' knappen
        const cvvField = await $(page.cvvNumberField);
        await cvvField.setValue('123');  // Exempel på CVV
        await browser.keys('Tab');  // Skicka TAB för att förlora fokus från CVV-fältet

        // Vänta på att 'Link' knappen blir klickbar
        const linkCardButton = await $(page.linkCardButton);
        await linkCardButton.waitForEnabled({ timeout: 5000 });

        // Klicka på 'Link' knappen för att länka kortet
        await linkCardButton.click();
        
        await browser.pause(10000);  // Vänta för att se resultatet av operationen
        });

        it('5. Should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        await $(page.messageToDriverField).waitForDisplayed();
        await $(page.messageToDriverField).setValue('Have a nice day!');
        const messageComplete = await $(page.messageToDriverField);
        await expect(messageComplete).toHaveValue('Have a nice day!');
        await browser.pause(10000);
        })
        
      
        it('6. Should ordering a Blanket and handkerchiefs', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.selectSupportivePlan();
            await browser.pause(10000);

            const blanketAndHandkerchiefs = await $(page.blanketAndHandkerchiefsButton);
            await blanketAndHandkerchiefs.waitForDisplayed();
            await blanketAndHandkerchiefs.click();
            await expect(blanketAndHandkerchiefs).toBeEnabled();
            await browser.pause(10000);
        })
        

        it('7. Should add 2 icecreams to the order', async () => {
            await browser.url(`/`);
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.selectSupportivePlan();
            
            // Klicka två gånger för att lägga till två glassar
            await $(page.iceCreamPlusCounter).waitForDisplayed();
            await $(page.iceCreamPlusButton).click();
            await $(page.iceCreamPlusButton).click();
            
            // Vänta på att sidan uppdaterar värdet
            const iceCreamCounterValue = await $(page.iceCreamCounterValue);
            await iceCreamCounterValue.waitForDisplayed({timeout: 5000}); // Vänta tills elementet visar nya värdet
            const text = await iceCreamCounterValue.getText();
            await expect(text).toContain('2');
        });        

        
        it('8. The car search modal should appear', async () => {
                await browser.url(`/`);
                await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
                const phoneNumber = helper.getPhoneNumber("+1");
                await page.submitPhoneNumber(phoneNumber);
                await page.placeCarOrder();
                const carSearchModal = await $(page.carSearchModal);
                await expect(carSearchModal).toBeExisting();
            });

            it("9. should  wait for driver info to appear in the modal", async () => {
                await browser.url(`/`);
                await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
                const orderCarButton = await $(page.orderCarButton);
                await orderCarButton.waitForClickable();
                await orderCarButton.click();
                const driverInfoArrival = await $(page.driverInfoArrival);
                await browser.pause(40000);
                await expect(driverInfoArrival).toBeExisting();
              });               

    })



      /*
      PLAYING WITH THE CODE AND WANT TO KEEP IT IF I WANT TO GO BACK AND LOOK AT IT AGAIN
      it('Should open phone number modal and fill in the phone number', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await browser.pause(10000);
      
        // Open the phone number modal
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
        await browser.pause(10000);
      
        // Fill in the phone number
        const phoneNumber = helper.getPhoneNumber("1");
        await page.fillPhoneNumber(phoneNumber);
        await browser.pause(10000);
      
        // Submit the phone number
        await page.submitPhoneNumber(phoneNumber);
      
        // Verify that the phone number is filled in
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await browser.pause(10000);
      });
      PLAYING WITH THE CODE AND WANT TO KEEP IT IF I WANT TO GO BACK AND LOOK AT IT AGAIN
      */


   /* 
    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })*/


