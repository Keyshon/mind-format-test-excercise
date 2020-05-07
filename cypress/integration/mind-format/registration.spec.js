const SignupPage = require('./../../page_objects/signup');
const StartTestPage = require('./../../page_objects/startTest');
const Faker = require('faker');

describe('Registration Process', () => {
  beforeEach(() => {
    cy.visit(SignupPage.url);

    cy.server();
    cy.route('GET', '/api/result').as('result');
  });

  describe('Correct registration', () => {
    it('Leads to profile page', () => {
      cy.get(SignupPage.objects.nameField).type(
        `${Faker.name.findName()} By MV`
      );
      cy.get(SignupPage.objects.passwordField).type('Test Password');
      cy.get(SignupPage.objects.emailField).type(
        `${Faker.internet.email('testByMV')}`
      );
      cy.get(SignupPage.objects.policyCBField).click();
      cy.get(SignupPage.objects.termsCBField).click();
      cy.get(SignupPage.objects.offersCBField).click();
      cy.get(SignupPage.objects.signupButton).click();
      cy.wait('@result', { timeout: 10000 });

      cy.url().should('include', StartTestPage.url);
    });
  });
});
