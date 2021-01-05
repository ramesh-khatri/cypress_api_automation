/// <reference types="cypress" />
import Support_Method from "../../support_method/Support_Method"

const objSupport_Method = new Support_Method();
describe('POST a user', () => {
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: {
                Authorization: Cypress.env('auth_token'), 
            },
            body: {
                "name":"Arek Khatry",
                "gender":"Male", 
                "email":"arek.khatry".concat(objSupport_Method.getRandomName())+"@mail.com", 
                "status":"Active"
            }
        }).as('my_response');
    });    
 
    it('Validate the header', () => {
        cy.get('@my_response')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json; charset=utf-8');
    });

    it('Validate the status code', () => {
        cy.get('@my_response')
        .its('status')
        .should('be.equal', 200);
    });

    it('Verify that email address is valid', () => {
        cy.get('@my_response')
        .then((response) => {
            expect(/\S+@\S+\.\S+/.test(response.body.data.email)).to.be.true;
        }) 
    });

    it('Verify that valid message is shown for duplicate email', () => {
        cy.get('@my_response')
        .then((response) => {
            var email = response.body.data.email
            cy.request({
                method: 'POST',
                url: '/users',
                headers: {
                    Authorization: Cypress.env('auth_token'), 
                },
                body: {
                    "name":"Arek Khatry",
                    "gender":"Male", 
                    "email": email, 
                    "status":"Active"
                }
            }).then((new_response) => {
                expect(new_response.body.data[0].field).equal('email')
                expect(new_response.body.data[0].message).equal('has already been taken') 
            })         
        })
    });

    it('Verify that created date is of today', () => {
        cy.get('@my_response')
        .then((response) => {
            var created_date = response.body.data.created_at.split('T')[0]
            expect(objSupport_Method.getCurrentDate()).equal(created_date)
        }) 
    });
});