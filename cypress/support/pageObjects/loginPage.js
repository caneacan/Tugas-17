class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  inputUsername(username) {
    cy.get('input[name="username"]')
      .should('be.visible')
      .clear()
      .type(username)
      .should('have.value', username);
  }

  inputPassword(password) {
    cy.get('input[name="password"]')
      .should('be.visible')
      .clear()
      .type(password)
      .should('have.value', password);
  }

  clickLoginButton() {
    // Selector tombol login di OrangeHRM
    cy.get('button[type="submit"]')
      .should('be.visible')
      .click();
  }

  verifySuccessfulLogin() {
    // Setelah login berhasil di OrangeHRM, URL berubah ke /dashboard
    cy.url().should('include', '/dashboard');
    cy.get('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
      .should('contain', 'Dashboard');
  }

  verifyBaseUrl() {
    cy.url().should('include', 'orangehrmlive');
  }

  login(username, password) {
    this.inputUsername(username);
    this.inputPassword(password);
    this.clickLoginButton();
  }
}

export default LoginPage;
