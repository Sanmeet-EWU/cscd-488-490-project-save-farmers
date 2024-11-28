describe('App Navigation', () => {
    it('loads the home page', () => {
      cy.visit('/');
      cy.contains('Button list'); // Checks if the list header renders
    });
  
    it('navigates to login page', () => {
      cy.visit('/');
      cy.contains('Login').click();
      cy.url().should('include', '/Login');
    });
  });
  