///<reference types="Cypress" />

import { flightTypes, flightDetails, travellersDetails, searchResults } from "../page objects/flights_objects"
import {
  getDepartureDate, getArrivalDate, verifyArrivalDate, arrivalDate,
  departureDate, select_Traveller, destination_Selection, destination_Input,
  origin_Selection, origin_Input, verifyDepartureDate, lowestPriceCalculator,
  routing
} from "./common"
const scenario = require('../../fixtures/datapool.json')

// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const flightType = new flightTypes()
const flightDetail = new flightDetails()
const travellersDetail = new travellersDetails()
const searchResult = new searchResults()

describe('Scenario 3', () => {

  it('Navigate to flights page', () => {
    cy.visit('/flights')
  })

  it('Enter Origin', () => {
    origin_Input("Scenario 3")
    origin_Selection("Scenario 3")
  })

  it('Enter Destination', () => {
    destination_Input("Scenario 3")
    destination_Selection("Scenario 3")
  })

  it('Select Travellers', () => {
    select_Traveller("Scenario 3", "adults")
    select_Traveller("Scenario 3", "seniors")
    select_Traveller("Scenario 3", "youth")
    select_Traveller("Scenario 3", "child")
    select_Traveller("Scenario 3", "seatInfant")
    select_Traveller("Scenario 3", "lapInfant")
  })

  it('Enter Departure Date', () => {
    departureDate("Scenario 3")
  })

  it('Enter Arrival Date', () => {
    arrivalDate("Scenario 3")
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
      verifyDepartureDate("Scenario 3").should((date) => {
        expect(date.get(0).innerText).to.be.eq(getDepartureDate)
      }).then(() => {
        verifyArrivalDate("Scenario 3").should((date) => {
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
