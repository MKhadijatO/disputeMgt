describe("Admin dispute resolution process", () => {
    const email = "myekini1@gmail.com"
    const password = "Muhammadyk1$"
    beforeEach(() => {
        cy.visit("https://dispute.wayalinks.com");
        cy.get("#email").type(email);
        cy.get("#password").type(password);
        cy.get("#signInButton").click();
        cy.get("button[class='swal2-confirm swal2-styled']").click();
        //assert
        cy.url().should('include', '/dispute-management');
        cy.get(".font-semibold.text-sm").should("contain", "admin")
    })

    it("overview of POS-Cashout dispute", () => {
        cy.get("").click("");
        //assert Cashout
        cy.get("#swal2-html-container").should("exist");

    })

    it("overview of POS-Transfer dispute", () => {
        cy.get("").click("");
        //assert Cashout
        cy.get("").should("contain", "")

    })

    it("overview of POS-Bills Payment dispute", () => {
        cy.get("").click("");
        //assert Cashout
        cy.get("").should("contain", "")

    })

    it("overview of ATM Card dispute", () => {
        cy.get("").click("");
        //assert ATM Card
        cy.get("").should("contain", "")

    })

    it.only("overview of Bills Payment dispute", () => {

        cy.get("tbody tr:nth-child(1)").dblclick({ force: true });
        cy.wait(3000);

        //assert Bills Payment
        // cy.get(".swal2-container.swal2-center.swal2-backdrop-show", { force:true }).should('exist');
        // cy.get("div[role='dialog']", { timeout: 10000 })
        //     .should('be.visible')
        //     .find("button.confirm")
        //     .click({ force: true });
        // cy.get("#swal2-html-container")
        //     .find("tbody tr:nth-child(1) td:nth-child(6)")
        //     .should("contain", "Bill Category:");

    })
})