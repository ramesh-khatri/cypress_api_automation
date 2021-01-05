/// <reference types="cypress" />

describe('GET user list test', () => {
    beforeEach(() => {
        cy.request({
            method: 'GET',
            url: '/users',
            headers: {
                Authorization: Cypress.env('auth_token'), 
            }
        }).as('mainURL');
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

    it('Validate that IDs are unique', () => {
        cy.get('@mainURL').then((my_response) => {
            const ids = my_response.body.data.map(e => e.id)
            const setIds = new Set(ids)
            expect(ids.length).to.equal(setIds.size);
        })
    });
});