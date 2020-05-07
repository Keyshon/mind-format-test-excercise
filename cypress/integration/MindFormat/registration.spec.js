const SignupPage = require('../../pageObjects/signup');
const StartTestPage = require('../../pageObjects/startTest');
const Faker = require('faker');
const testData = require('../../testData/registrationUserEntity');

// MWF-REG
describe('Registration Process', () => {
  beforeEach(() => {
    cy.visit(SignupPage.url);

    cy.server();
    cy.route('GET', '/api/result').as('result');
  });

  // NWF-REG-A001
  describe('Correct registration', () => {
    it('Leads to test page', () => {
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
      cy.wait('@result', { requestTimeout: 10000 });

      cy.url().should('include', StartTestPage.url);
    });
  });

  // NWF-REG-A002
  describe('Incorrect registration', () => {
    testData.forEach((item) => {
      it('Causes an error', () => {
        if (item.name) {
          cy.get(SignupPage.objects.nameField).type(item.name);
        }
        if (item.password) {
          cy.get(SignupPage.objects.passwordField).type(item.password);
        }
        if (item.email) {
          cy.get(SignupPage.objects.emailField).type(item.email);
        }
        if (item.policyCB) {
          cy.get(SignupPage.objects.policyCBField).click();
        }
        if (item.termsCB) {
          cy.get(SignupPage.objects.termsCBField).click();
        }
        if (item.offersCB) {
          cy.get(SignupPage.objects.offersCBField).click();
        }
        cy.get(SignupPage.objects.signupButton).click();

        cy.on('fail', (err, runnable) => {
          expect(err.message).to.include('No request ever occurred.');
          return false;
        });

        cy.wait('@result');
      });
    });
  });
});
