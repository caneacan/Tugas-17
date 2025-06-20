import LoginPage from '../../support/pageObjects/loginPage';
import loginData from '../../fixtures/loginData.json';

describe('OrangeHRM Login Test with Intercept', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with valid credentials', () => {
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    loginPage.login(loginData.valid.username, loginData.valid.password);

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    loginPage.verifySuccessfulLogin();
  });

  it('should show error for invalid credentials', () => {
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    loginPage.login(loginData.invalid.username, loginData.invalid.password);

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
