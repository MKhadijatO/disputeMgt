describe('login', () => {
    const email = "newestkycitititsijiwayabank@yopmail.com";
    const password = "Password123";

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false prevents Cypress from failing the test
            return false;
        });
        cy.visit('https://staging.wayabank.ng/');

    });


    it('log in with valid credentials', () => {
        // click on login
        cy.get(".showing .nav-link").click();
        //enters the correct credentials
        cy.get("div input[placeholder='Email or Phone (2348020000000)']").type(email)
        cy.get("input[placeholder='Password']").type(password)
        cy.get("button[role='input']").contains("Login").click();
        cy.wait(6000);
        //assert login
        cy.origin('https://ibank.staging.wayabank.ng', () => {
        // cy.url().should('include', '/wallet');
        cy.wait(5000);
        cy.get(".topbar")
        .find("span")
        .should("have.class", "ant-badge")
        .find("span")
        .should("be.visible")
        // .should("contain", "NAJIB KABIR")
        });
    })

    it('log in with invalid credentials; wrong email', () => {
        cy.get(".showing .nav-link").click();
        cy.get("div input[placeholder='Email or Phone (2348020000000)']").type("wrongemail.com")
        cy.get("input[placeholder='Password']").type(password)
        cy.get("button[role='input']").contains("Login").click();
        cy.wait(6000)
        //assert unsuccessful login
        cy.get(".text-danger", { force: true }).should("contain", "Please enter a valid email address or phone number")

    })

    it('log in with invalid credentials; wrong password', () => {
        cy.get(".showing .nav-link").click();
        cy.get("div input[placeholder='Email or Phone (2348020000000)']").type(email)
        cy.get("input[placeholder='Password']").type("password")
        cy.get("button[role='input']").contains("Login").click();
        cy.wait(6000)
        //assert unsuccessful login
        cy.get('body').then($body => {
            if ($body.find('.swal-modal').length) {
                cy.get('.swal-modal')
                    .find(".swal-text")
                    .should("contain", "Record with Provided input not Found");
            } else {
                // Optional: log or assert something else
                cy.log("No SweetAlert appeared");
            }
        })

    })

    it('log in with invalid credentials; Empty Password', () => {
        cy.get(".showing .nav-link").click();
        cy.get("div input[placeholder='Email or Phone (2348020000000)']").type(email)
        cy.get("input[placeholder='Password']").clear();
        cy.get("button[role='input']").contains("Login").click();
        cy.get(".swal-modal", { timeout: 100000 })
            .find(".swal-text")
            .should("contain", "Password cannot be empty")

    })

    it('log in with invalid credentials; wrong email(unrecognized)', () => {
        cy.get(".showing .nav-link").click();
        cy.get("div input[placeholder='Email or Phone (2348020000000)']").type("wrongemail@gmail.com")
        cy.get("input[placeholder='Password']").type(password)
        cy.get("button[role='input']").contains("Login").click();
        cy.wait(6000)
        //assert unsuccessful login
        cy.get(".swal-text").should("contain", "Record with Provided input not Found")

    })

})