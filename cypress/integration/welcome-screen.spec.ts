/// <reference types="cypress" />

const port = 8082;

describe('Tests the welcome screen component and selects a location', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
        cy.visit('http://localhost:' + port)
    })

    it('Closes the welcome screen selects a home location', () => {
        // Deletes the forager database if it exists for clean test
        window.indexedDB.deleteDatabase("db");

        cy.get("[data-test=welcome-screen]").contains('Please be aware that Forager stores mapping data on your device, and can exceed over 1GB. Forager can also use your GPS to get your current location.')

        cy.get("[data-test=close-welcome-screen]").click()

        cy.get('[data-test=map]').click('center')

        //checks that the welcome screen has been closed
        cy.get('[data-test=map]').should('not.contain', '[data-test=welcome-screen');
    })
})