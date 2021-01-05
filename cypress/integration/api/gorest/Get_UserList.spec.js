/// <reference types="cypress" />

describe('GET user list test', () => {
    beforeEach(() => {
        cy.request('/users').as('mainURL');
    });
 
    it('Validate the header', () => {
        cy.get('@mainURL')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8');
    });

    it('Validate the status code', () => {
        cy.get('@mainURL')
            .its('status')
            .should('be.equal', 200);
    });
});