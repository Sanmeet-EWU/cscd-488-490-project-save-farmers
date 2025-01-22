describe('App Navigation', () => {
  it('loads the home page', () => {
    cy.visit('/');
    cy.contains('Button list'); // Checks if the list header renders
  });

  it('navigates to Profile page', () => {
    cy.visit('/');
    cy.contains('Profile').click();
    cy.url().should('include', '/Profile');
  });

  it('navigates to Login page', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/Login');
  });

  it('navigates to Home page', () => {
    cy.visit('/');
    cy.contains('Home').click();
    cy.url().should('include', '/Home');
  });
});
