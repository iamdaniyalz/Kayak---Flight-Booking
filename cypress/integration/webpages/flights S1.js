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


describe('Scenario 1', () => {

  it('Navigate to flights page', () => {
    cy.visit('/flights')
  })

  it('Verify One-Way shows relevant search inputs', () => {
    flightType.flight_type().click({ force: true }).then(() => {
      flightType.oneway_trip().click({ force: true }).then(() => {
        flightType.onewaytrip_fields().should('be.visible')
      })
    })
  })

  it('Verify Multi-City shows relevant search inputs', () => {
    flightType.flight_type().click({ force: true }).then(() => {
      flightType.multicity_trip().click({ force: true }).then(() => {
        flightType.multicitytrip_fields().should('be.visible')
      })
    })
  })

  it('Verify Round-Trip shows relevant search inputs', () => {
    flightType.flight_type().click({ force: true }).then(() => {
      flightType.round_trip().click({ force: true }).then(() => {
        flightType.roundtrip_fields().should('be.visible')
      })
    })
  })

  it('Enter Origin', () => {
    origin_Input("Scenario 1")
    origin_Selection("Scenario 1")
  })
  /*Previously used the below functionality to invoke the attrtibute 'aria-label'
    and assert it for the origin selection string

    flightDetail.origin().click().type(scenario["Scenario 1"]["Origin Input"], {force: true})
    flightDetail.originSelection().invoke('attr', 'aria-label').then(($origin) => {
        expect($origin).to.be.equal(scenario["Scenario 1"]["Origin Selection"])
      }).then(()=>{
        flightDetail.originSelect().click()
      })
    })
  */
  it('Enter Destination', () => {
    destination_Input("Scenario 1")
    destination_Selection("Scenario 1")
  })


  it('Select Travellers', () => {
    select_Traveller("Scenario 1", "adults")
    select_Traveller("Scenario 1", "seniors")
    select_Traveller("Scenario 1", "youth")
    select_Traveller("Scenario 1", "child")
    select_Traveller("Scenario 1", "seatInfant")
    select_Traveller("Scenario 1", "lapInfant")
  })
  /*  Tried using this API but it does not work as expected
      cy.request({
        method: 'POST',
        url: "https://www.kayak.com/s/vestigo/v1/measure",
        failOnStatusCode: false,
        body: {
            events: {
                length: 8
            }
        }
      }).then((response) => {
          expect(response.status).to.eq(204)
  */

  it('Enter Departure Date', () => {
    departureDate("Scenario 1")
  })

  it('Enter Arrival Date', () => {
    arrivalDate("Scenario 1")
    cy.window().then(win => cy.stub(win, 'open'));
    travellersDetail.search().click()
    cy.window().its('open').should('have.been.called');
  })

  it('Verify Search Results - Dates', () => {
    cy.server()
    cy.route('POST', '**/WindowInformation/list').as('pageLoad')
    //cy.route('POST', '**/Drive-By/show').as('popup')
    cy.wait('@pageLoad').then((response) => {
      expect(response.status).to.eq(200)  
    }).then(() => {
      verifyDepartureDate("Scenario 1").should((date) => {
        expect(date.get(0).innerText).to.be.eq(getDepartureDate)
      }).then(() => {
        verifyArrivalDate("Scenario 1").should((date) => {
          expect(date.get(0).innerText).to.be.eq(getArrivalDate)
        })
      })
      searchResult.price_Tab().click({ force: true })
      // cy.wait('@popup').then((response) => {
      //   expect(response.status).to.eq(204)  
      // }).then(()=>{
      //   searchResult.price_Tab().click({force: true})
      // })
    })
  })

  it('Validate Cheapest Price', () => {
    searchResult.price_Tab().should('be.visible')
    lowestPriceCalculator()
  })
})