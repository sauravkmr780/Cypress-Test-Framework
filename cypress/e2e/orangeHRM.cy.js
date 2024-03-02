/// <reference types="cypress" />

describe('Orange HRM end to end Test suite', () => {
  before(() => {
      // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
      cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
  })
  it('Orange HRM end to end Test case', () => {
  //Visit the Application
  cy.visit(Cypress.env('baseUrl'));
  // Enter username
  cy.get('input[name="username"]').type('Admin');
  // Enter password
  cy.get('input[name="password"]').type('admin123');
  cy.intercept('**/dashboard/*').as('uiLogin')
  // Click Login
  cy.get('button[type="submit"]').click();
  cy.wait('@uiLogin').its('response.statusCode').should('eq', 200);
  // Assert loggedin to Dashboard page
  cy.url().should('include','/dashboard/index');
  cy.intercept('GET','**/subunits').as('pimclick')
  // Click PIM hyperLink 
  cy.get('nav.oxd-navbar-nav').contains('PIM').click();
  cy.wait('@pimclick').its('response.statusCode').should('eq', 200);
  cy.intercept('GET','**/pim/employees').as('addButton')
  // Click Add Button
  cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary').last().click();
  cy.wait('@addButton').its('response.statusCode').should('eq', 200);
  // Enter employee firstName
  cy.get('input[name="firstName"]').type('John');
  // Enter employee lastName
  cy.get('input[name="lastName"]').type('Cena');
  const empid = userID_Numeric();
  // Enter random and unique employee id
  cy.get('input.oxd-input.oxd-input--active').last().clear().type(empid);
  cy.log(empid);
  cy.intercept('GET','**/pim/employees').as('saveButton')
  // Click Save button
  cy.get('button[type="submit"]').click();
  // Validate Saved successfully
  cy.contains('Successfully Saved');
  cy.wait('@saveButton').its('response.statusCode').should('eq', 200);
  cy.intercept('GET','**/subunits').as('empListclick')
  // Click employee list and search with same employee id
  cy.get('nav.oxd-topbar-body-nav').contains('Employee List').click({force:true});
  cy.wait('@empListclick').its('response.statusCode').should('eq', 200);
  cy.get('input.oxd-input.oxd-input--active').last().clear().type(empid);
  cy.intercept('GET','**/pim/employees**').as('searchButtonClick')
  cy.get('button[type="submit"]').click();
  cy.wait('@searchButtonClick').its('response.statusCode').should('eq', 200);
  // Edit same employee id last name details
  cy.intercept('GET','**/pim/employees').as('editButtonClick')
  cy.get('button.oxd-icon-button.oxd-table-cell-action-space').last().click();
  cy.wait('@editButtonClick').its('response.statusCode').should('eq', 200);
  cy.get('input[name="lastName"]').clear().type('Cenation');
  cy.intercept('PUT','**/personal-details').as('saveButton')
  cy.get('button[type="submit"]').first().click();
  // Validate Updated details successfully
  cy.contains('Successfully Updated');
  cy.wait('@saveButton').its('response.statusCode').should('eq', 200);
  cy.intercept('GET','**/subunits').as('empListclick');
  // Click employee list and search with same employee id
  cy.get('nav.oxd-topbar-body-nav').contains('Employee List').click({force:true});
  cy.wait('@empListclick').its('response.statusCode').should('eq', 200);
  cy.get('input.oxd-input.oxd-input--active').last().clear().type(empid);
  cy.intercept('GET','**/pim/employees**').as('searchButtonClick')
  cy.get('button[type="submit"]').click();
  cy.wait('@searchButtonClick').its('response.statusCode').should('eq', 200);
  // Click delete icon from UI for same employee id
  cy.get('i.oxd-icon.bi-trash').click({force:true});
  // Validate alert message
  cy.on('window:confirm',(t)=>{
      expect(t).to.contains(" Yes, Delete ");
  })
  cy.intercept('DELETE','**/pim/employees').as('deleteButton')
  // Validate Deleted details successfully
  cy.get('button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin').click({force:true});
  cy.contains('Successfully Deleted');
  cy.wait('@deleteButton').its('response.statusCode').should('eq', 200);
  // Post Delete Validate no records found message on Application
  cy.wait(3000);
  cy.contains('No Records Found');
  // Click Logout to application
  cy.get('p.oxd-userdropdown-name').click();
  cy.contains('Logout').click({force:true});
  
  })
})


function userID_Numeric() {
  var text = "";
  var possible = "01234567890";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}