/// <reference types="cypress" />

const port = 8082;

describe('Tests each option of the side menu', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
        cy.visit('http://localhost:' + port)
    })

    it('Opens up the side menu', () => {
        cy.get('[data-test=sidemenu-toggle-open]').click()
        
        //checks the side menu is open
        cy.get('[data-test=sidemenu-toggle-close]').should('exist');
    })

    it('Moves the user and returns the to the home location', () => {
        cy.get('[data-test=map]').click('topRight')
        cy.get('[data-test=create-marker-close]').click()
        cy.get('[data-test=sidemenu-toggle-open]').click()
        cy.get('[data-test=sidemenu-return-home]').click()
    })

    it('Creates a test Marker, hides the tooltip and deletes the Marker', () => {
        cy.get('[data-test=map]').click('center')
        cy.get('[data-test=input-marker-title]').type('marker-title')
        cy.get('[data-test=create-marker]').click()

        //checks to see if the marker exists
        cy.get('[data-test=map]').should('contain', 'marker-title')

        cy.get('[data-test=sidemenu-toggle-open]').click()
        cy.get('[data-test=sidemenu-toggle-tooltips-off]').click()

        //checks the tooltips are hidden
        cy.get('[data-test=map]').should('not.contain', 'Never Foraged')

        cy.get('[data-test=sidemenu-toggle-tooltips-on]').click()

        //checks the tooltips are shown
        cy.get('[data-test=map]').should('contain', 'Never Foraged')

        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-delete]').click()
    })

    it('Creates a test Marker, and then searches for that Marker', () => {
        cy.get('[data-test=map]').click('center')
        cy.get('[data-test=input-marker-title]').type('marker-title')
        cy.get('[data-test=create-marker]').click()

        cy.get('[data-test=sidemenu-toggle-open]').click()
        cy.get('[data-test=sidemenu-enable-search]').click()

        cy.get('[data-test=search-input]').type('marker-title')
        cy.get('[data-test=search-results]').should('contain', 'Never Foraged')

        // Closes search and deletes the marker
        cy.get('[data-test=search-cancel]').click()
        cy.get('[data-test=sidemenu-enable-search]').click()

        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-delete]').click()

    })

    it('Opens the donation panel, and then closes it', () => {
        cy.get('[data-test=sidemenu-toggle-open]').click()
        cy.get('[data-test=sidemenu-show-donation]').click()

        //checks to see if the donation page opened successfully
        cy.get('[data-test=donation-close').should('contain', 'Close')

        cy.get('[data-test=donation-close]').click()
    })

    it('Opens the donation panel, goes to paypal and back into the app', () => {
        cy.get('[data-test=sidemenu-toggle-open]').click()
        cy.get('[data-test=sidemenu-show-donation]').click()
        cy.get('[data-test=paypal]').click()

        cy.url().should('include', 'paypal')

        cy.go('back')
    })

})