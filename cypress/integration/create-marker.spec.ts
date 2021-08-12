/// <reference types="cypress" />

const port = 8082;

describe('Tests the creation and deletion of Markers', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
        cy.visit('http://localhost:' + port)
    })

    it('Creates a test Marker', () => {
        cy.get('[data-test=map]').click('center')
        cy.get('[data-test=input-marker-title]').type('marker-title')
        cy.get('[data-test=create-marker]').click()

        //checks to see if the marker exists
        cy.get('[data-test=map]').should('contain', 'marker-title')
    })

    it('Opens the Marker popup', () => {
        cy.get('.leaflet-marker-icon').click()

        //checks to see if the popup exists
        cy.get('[data-test=marker-popup]').should('contain', 'Close')
    })

    it('Forages selected the Marker', () => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-forage]').click()

        //checks the foraged status
        const event = new Date();
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-popup]').should('contain', event.toDateString())
    })

    it('Closes selected the Marker', () => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-close]').click()

        //checks the marker is closed
        cy.get('[data-test=marker-popup]').should('not.exist')
    })

    it('Deletes selected the Marker', () => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-delete]').click()

        //checks that the marker is deleted
        cy.get('[data-test=map]').should('not.contain', ".leaflet-marker-icon")
    })
})
