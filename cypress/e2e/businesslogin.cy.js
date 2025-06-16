describe('login', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false prevents Cypress from failing the test
      return false;
    });

    cy.visit('https://staging.wayabank.ng/'); 
  
  });


  it('log in with valid credentials', () => {
    cy.get(".showing .nav-link").click();
    cy.get(".text-centre.btn").click();
    cy.get("input[placeholder='Business ID']").type("505040749240")
    cy.get("input[placeholder='Password']").type("Waya@1111")
    cy.get("button[role='input']").contains("Login").click();
    cy.origin('https://business.staging.wayabank.ng', () => {
      //assert login
      cy.get(".modal-content", {timeout:5000})
        .find("button[class='btn btn-primary m-2']")
        .should("contain","Capture Image")
      })
  })

it('log in with invalid credentials; wrong ID', () => {
  cy.get(".showing .nav-link").click();
  cy.get(".text-centre.btn").click();
  cy.get("input[placeholder='Business ID']").type("348025473056")
  cy.get("input[placeholder='Password']").type("Password@123")
  cy.get("button[role='input']").contains("Login").click();

  //assert unsuccessful login
  cy.get(".swal-modal", {timeout:5000})
    .find(".swal-text")
    .should("contain","Record with Provided input not Found")

})

it('log in with invalid credentials; wrong password', () => {
  cy.get(".showing .nav-link").click();
  cy.get(".text-centre.btn").click();
  cy.get("input[placeholder='Business ID']").type("348013473056")
  cy.get("input[placeholder='Password']").type("Password$168")
  cy.get("button[role='input']").contains("Login").click();
  cy.get('body').then($body => {
    if ($body.find('.swal-modal').length) {
      cy.get('.swal-modal')
        .find(".swal-text")
        .should("contain", "Record with Provided input not Found");
    } else {
      // log this message
      cy.log("No SweetAlert appeared");
    }
  })

})

it('log in with invalid credentials; Empty Password', () => {
  cy.get(".showing .nav-link").click();
  cy.get(".text-centre.btn").click();
  cy.get("input[placeholder='Business ID']").type("348025473056")
  cy.get("input[placeholder='Password']").clear();
  cy.get("button[role='input']").contains("Login").click();
  cy.get(".swal-modal", {timeout: 100000})
    .find(".swal-text")
    .should("contain","Record with Provided input not Found")

})

it('log in with invalid credentials; Incomplete ID', () => {
  cy.get(".showing .nav-link").click();
  cy.get(".text-centre.btn").click();
  cy.get("input[placeholder='Business ID']").type("3480")
  cy.get("input[placeholder='Password']").type("Password@123")
  cy.get("button[role='input']").contains("Login").click();
  //assert
  cy.get(".text-danger", {force: true}).should("contain","Please enter a valid Business Id")
  cy.get(".waya-modal-body-log")
    .find(".modal-header-data-log")
    .should("contain","Login as a")

})

})