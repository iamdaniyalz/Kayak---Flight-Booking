///<reference types="Cypress" />

import { flightTypes, flightDetails, travellersDetails, searchResults } from "../page objects/flights_objects"
import {
  getDepartureDate, getArrivalDate, verifyArrivalDate, arrivalDate,
  departureDate, select_Traveller, destination_Selection, destination_Input,
  origin_Selection, origin_Input, verifyDepartureDate, lowestPriceCalculator,
  routing
} from "./common"
const scenario = require('../../fixtures/datapool.json')

const travellersDetail = new travellersDetails()
const searchResult = new searchResults()

describe('Scenario 2', () => {

  it('Navigate to flights page', () => {
    cy.visit('/flights')
  })

  it('Enter Origin', () => {
    origin_Input("Scenario 2")
    origin_Selection("Scenario 2")
  })

  it('Enter Destination', () => {
    destination_Input("Scenario 2")
    destination_Selection("Scenario 2")
  })

  it('Select Travellers', () => {
    select_Traveller("Scenario 2", "adults")
    select_Traveller("Scenario 2", "seniors")
    select_Traveller("Scenario 2", "youth")
    select_Traveller("Scenario 2", "child")
    select_Traveller("Scenario 2", "seatInfant")
    select_Traveller("Scenario 2", "lapInfant")
  })

  it('Enter Departure Date', () => {
    departureDate("Scenario 2")
  })

  it('Enter Arrival Date', () => {
    arrivalDate("Scenario 2")
    cy.window().then(win => cy.stub(win, 'open'));
    travellersDetail.search().click()
    cy.window().its('open').should('have.been.called');
  })

  it('Verify Search Results - Dates', () => {
    cy.server()
    cy.route('POST', '**/WindowInformation/list').as('pageLoad')
    cy.wait('@pageLoad').then((response) => {
      expect(response.status).to.eq(200)  
    }).then(() => {
      verifyDepartureDate("Scenario 2").should((date) => {
        expect(date.get(0).innerText).to.be.eq(getDepartureDate)
      }).then(() => {
        verifyArrivalDate("Scenario 2").should((date) => {
          expect(date.get(0).innerText).to.be.eq(getArrivalDate)
        })
      })
      searchResult.price_Tab().click({ force: true })
    })
  })

  it('Validate Cheapest Price', () => {
    searchResult.price_Tab().should('be.visible')
    lowestPriceCalculator()
  })
})