/// <reference types="cypress" />
import Support_Method from "../../support_method/Support_Method"

const objSupport_Method = new Support_Method();
describe('DELETE a user', () => {
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
 
    it('Verify Deleting the User', () => {
        cy.get('@my_response').then((response) => {
            var id = response.body.data.id
            cy.request({
                method: 'DELETE',
                url: '/users/'+id,
                headers: {
                    Authorization: Cypress.env('auth_token'), 
                }
            }).then((new_respone) => {
                expect(new_respone.body.code).equal(204)
            })
        })
    })

    it('Verify Deleting the User ID which is already deleted', () => {
        cy.get('@my_response').then((response) => {
            var id = response.body.data.id
            cy.request({
                method: 'DELETE',
                url: '/users/'+id,
                headers: {
                    Authorization: Cypress.env('auth_token'), 
                }
            }).then(() => {
                cy.request({
                    method: 'DELETE',
                    url: '/users/'+id,
                    headers: {
                        Authorization: Cypress.env('auth_token'), 
                    }
                }).then((new_response) => {
                    expect(new_response.body.code).equal(404)
                    expect(new_response.body.data.message).equal('Resource not found')
                })              
            })
        })
    })
});
