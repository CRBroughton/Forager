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
    })

    it('Opens the Marker popup', () => {
        cy.get('.leaflet-marker-icon').click()
    })

    it('Forages selected the Marker', () => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-forage]').click()
    })

    it('Closes selected the Marker', () => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-close]').click()
    })

    it('Deletes selected the Marker', () => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('[data-test=marker-delete]').click()
    })
})
