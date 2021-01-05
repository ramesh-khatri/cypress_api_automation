/// <reference types="cypress" />
import Support_Method from "../../support_method/Support_Method"

const objSupport_Method = new Support_Method();
describe('Update a user detail', () => {
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
 
    it('Verify updating the detail of existing user', () => {
        cy.get('@my_response').then((response) => {
            var id = response.body.data.id
            cy.request({
                method: 'PATCH',
                url: '/users/'+id,
                headers: {
                    Authorization: Cypress.env('auth_token'), 
                },
                body: {
                    "name":"Arek Khatry Updated",
                    "gender":"Male", 
                    "email":"arek.khatry".concat(objSupport_Method.getRandomName())+"@mail.com", 
                    "status":"Active"
                }
            }).then((new_response) => {
                    expect(new_response.body.code).equal(200)
                    expect(new_response.body.data.name).equal('Arek Khatry Updated')
                })              
        })
    })
});