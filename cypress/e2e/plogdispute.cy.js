/// <reference types="cypress"/>

describe("Customer raise dispute", () => {
    const email = "newestkycitititsijiwayabank@yopmail.com";
    const password = "Password123";
    const rrn = "123650385632";
    const accountNo = "1245639565";
    const stan = "124635";
    const pan = "8596584512365214";
    const transcId = "WAYA20011555584";
    const transDate = "2025-07-21";
    const customerEmail = "testee@yopmail.com";
    const custPhone = "08125366544";


    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false prevents Cypress from failing the test
            return false;
        });
        cy.visit('https://staging.wayabank.ng/login');
        cy.get("div input[placeholder='Email or Phone (2348020000000)']").type(email)
        cy.get("input[placeholder='Password']").type(password)
        cy.get("button[role='input']", { timeout: 5000 }).contains("Login").click();
        cy.wait(5000);
            // cy.url().should('include', '/wallet')

    })

    it("Navigates to dispute and creates an ATM Card dispute", () => {
        cy.origin('https://ibank.staging.wayabank.ng',
            { args: { rrn, accountNo, stan, pan, transcId, transDate, customerEmail, custPhone } },
            ({ rrn, accountNo, stan, pan, transcId, transDate, customerEmail, custPhone }) => {
                cy.wait(10000);
                cy.get("a[href='/dispute']", { force: true }).should("exist").click();
                cy.wait(10000)
                //assert 
                // cy.url().should('include', '/dispute');
                //Selects Raise Dispute
                cy.get("button[class='btn btn-primary']", { force: true })
                    .should("be.visible")
                    .click();
                // Ensure the modal is visible
                cy.get("div[role='document']", { timeout: 10000 })
                    .should("be.visible");
                //fill the form for ATM Card Dispute
                cy.get("#amount").type("200");
                cy.get("input[type='text'][maxlength='12']").type(rrn);
                cy.get("input[type='text'][maxlength='10']").type(accountNo);
                cy.get("input[type='text'][minlength='6']").type(stan);
                cy.get("input[type='text'][maxlength='16']").type(pan);
                cy.get("body > div:nth-child(17) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(7) > div:nth-child(2) > input:nth-child(1)").type(transcId);
                //div.pg-1-input
                cy.get("input[type='date']").type(transDate);
                cy.get("input[type='email']").type(customerEmail);
                cy.get("input[type='text'][minlength='11']").type(custPhone);
                cy.get("button[type='submit']").click();

                //ASSERT
                cy.get("div[role='dialog']", { timeout: 5000 })
                .should("be.visible")
                cy.get("div#swal2-html-container.swal2-html-container", { timeout: 5000 })
                .should("have.text", "Dispute raised successfully");

                cy.get(".swal2-actions")
                .find("button[class='swal2-confirm swal2-styled']")
                .should("have.text","OK")
                .click();
            })

    })


    it("Navigates to dispute and creates an ATM Card dispute; wrong/existing transc id", () => {
        cy.origin('https://ibank.staging.wayabank.ng',
            { args: { rrn, accountNo, stan, pan, transcId, transDate, customerEmail, custPhone } },
            ({ rrn, accountNo, stan, pan, transcId, transDate, customerEmail, custPhone }) => {
                cy.wait(10000);
                cy.get("a[href='/dispute']", { force: true }).should("exist").click();
                cy.wait(10000)
                //assert 
                // cy.url().should('include', '/dispute');
                //Selects Raise Dispute
                cy.get("button[class='btn btn-primary']", { force: true })
                    .should("be.visible")
                    .click();
                // Ensure the modal is visible
                cy.get("div[role='document']", { timeout: 10000 })
                    .should("be.visible");
                //fill the form for ATM Card Dispute
                cy.get("#amount").type("200");
                cy.get("input[type='text'][maxlength='12']").type(rrn);
                cy.get("input[type='text'][maxlength='10']").type(accountNo);
                cy.get("input[type='text'][minlength='6']").type(stan);
                cy.get("input[type='text'][maxlength='16']").type(pan);
                cy.get("body > div:nth-child(17) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(7) > div:nth-child(2) > input:nth-child(1)").type("transcId");
                //div.pg-1-input
                cy.get("input[type='date']").type(transDate);
                cy.get("input[type='email']").type(customerEmail);
                cy.get("input[type='text'][minlength='11']").type(custPhone);
                cy.get("button[type='submit']").click();

                //ASSERT
                cy.get(".swal2-popup").find("#swal2-title").should("contain", "Oops!");
                // cy.get("div[role='dialog']").find("#swal2-html-container").should("contain", "Dispute raised successfully");
                cy.get(".swal2-confirm").click();
                // cy.get(".swal2-button[class='swal2-confirm swal2-styled']").click();
            })

    })
})