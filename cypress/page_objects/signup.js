const Base = require('./base');

module.exports = {
  url: `${Base.url}/signup`,
  title: 'Mind Format',
  objects: {
    nameField: '#name',
    passwordField: 'input[type="password"]',
    emailField: '#email',
    policyCBField: '#policy-agree',
    termsCBField: '#terms-agree',
    offersCBField: '#offers-agree',
    signupButton: 'button[type="button"]',
  },
};
