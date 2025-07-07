describe('log dispute', () => {
    const businessBase = 'https://services.staging.wayabank.ng';
    const endpoints = {
        liveness: 'https://services.staging.wayabank.ng/file-resource-service/upload/others',
        ninMatch: 'https://services.staging.wayabank.ng/kyc-servicev2/api/v1/kyc/verify-nin-face'
    };

    beforeEach(() => {
        //log in
        cy.visit('https://staging.wayabank.ng/login', { timeout: 60000 });
        cy.get(".text-centre.btn").click();
        cy.get("input[placeholder='Business ID']").type("348013473056")
        cy.get("input[placeholder='Password']").type("Password@123")
        cy.get("button[role='input']").contains("Login").click();

        cy.intercept('POST', endpoints.liveness, {
            statusCode: 200,
            body: { status: 'success', score: 0.99 },
        }).as('stubLiveness');

        // 3) Stub the NIN‐document (face ↔ NIN) POST
        cy.intercept('POST', endpoints.ninMatch, {
            statusCode: 200,
            body: { status: 'success', match: true },
        }).as('stubNinMatch');

    });

    it('bypass liveness check', () => {
        cy.origin("https://services.staging.wayabank.ng", { args: null }, () => {

            cy.visit(businessBase, { timeout: 120000 });
            // if it shows a modal, click through it:
            cy.get('body').then(($body) => {
                if ($body.find('.modal-content').length) {
                    cy.get('.modal-content')
                        .find("button.btn.btn-primary")
                        .click();
                }
            });

            // 7) Wait for the liveness stub to fire
            cy.wait('@stubLiveness');

            // 8) After liveness, the app should automatically POST for NIN match;
            //    wait for that stub
            cy.wait('@stubNinMatch');

            cy.url().should('include', '/dashboard');
            cy.contains('Welcome').should('be.visible');




            /*cy.get(".modal-content", {timeout:5000})
              .find("button[class='btn btn-primary m-2']")
              .click();
            cy.get("input[placeholder='Enter your NIN']").type("25148596321");
            cy.get("button[class='btn btn-primary m-2']").click();
 
            //assert
            cy.get(".swal2-html-container")
              .contains("Face liveliness check failed, Please try again")*/
        });

    })

    it('Fails liveness check', () => {
        cy.origin("https://staging.wayabank.ng", () => {
            cy.get(".modal-content", { timeout: 5000 })
                .find("button[class='btn btn-primary m-2']")
                .click();
            cy.get("input[placeholder='Enter your NIN']").type("25148596321");
            cy.get("button[class='btn btn-primary m-2']").click();

            //assert
            cy.get(".swal2-html-container")
              .contains("Face liveliness check failed, Please try again")
        });


    })
})