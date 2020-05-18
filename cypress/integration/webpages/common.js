///<reference types="Cypress" />

import { flightTypes, flightDetails, travellersDetails } from "../page objects/flights_objects";
const scenario = require('./../../fixtures/datapool.json')

const flightDetail = new flightDetails()
const travellersDetail = new travellersDetails()

function origin_Input(scenarioNum){
    let originInput = scenario[scenarioNum]["Origin Input"]
    flightDetail.origin().click().type(originInput, {force: true})
  }
  
  function origin_Selection(scenarioNum){
    let originSelection = scenario[scenarioNum]["Origin Selection"]  
    flightDetail.originSelection(originSelection).click({force: true})
  }
  
  function destination_Input(scenarioNum){
    let destInput = scenario[scenarioNum]["Destination Input"]
    flightDetail.destination().click().type(destInput, {force: true})
  }
  
  function destination_Selection(scenarioNum){
    let destSelection = scenario[scenarioNum]["Destination Selection"]
    flightDetail.destinationSelection(destSelection).click({force: true})
  }
  
  function select_Traveller(scenarioNum, passengerType) { 
    let travellerCount = scenario[scenarioNum].Passengers[passengerType]
    travellersDetail.traveller(passengerType)
      .invoke('attr', 'value', travellerCount)
      //.should('have.attr', 'value', travellerCount)
      //Somehow the invoked value does not reflect on FE
  }
  
  function departureDate(scenarioNum){
    let departuredate = scenario[scenarioNum].Departure
    cy.log(departuredate)
    travellersDetail.departureDate()
        .clear()
        .type(departuredate)
  }

  function arrivalDate(scenarioNum){
    let arrivaldate = scenario[scenarioNum].Arrival
    cy.log(arrivaldate)
    travellersDetail.arrivalDate()
        .clear()
        .type(arrivaldate)
  }

  export {arrivalDate, departureDate, select_Traveller, destination_Selection, 
    destination_Input, origin_Selection, origin_Input }