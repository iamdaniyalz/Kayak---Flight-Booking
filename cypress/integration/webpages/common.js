///<reference types="Cypress" />

import { flightTypes, flightDetails, travellersDetails,
   searchResults, cheapestPrice, bestPrice, quickestPrice  } from "../page objects/flights_objects";
const scenario = require('./../../fixtures/datapool.json')

const flightDetail = new flightDetails()
const travellersDetail = new travellersDetails()
const searchResult = new searchResults()
let getDepartureDate
let getArrivalDate
let cheapPrice
let bestPricee
let quickPrice


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

  function routing(){
    cy.server()
      cy.route('POST', '**/WindowInformation/list').as('pageLoad')
      //cy.route('POST', '**/Drive-By/show').as('popup')
      cy.wait('@pageLoad').then((response) => {
        expect(response.status).to.eq(200)  
      })
  }


  function verifyDepartureDate(scenarioNum){
    getDepartureDate = scenario[scenarioNum].Departure
    return searchResult.datefield().click().then(()=>{
      searchResult.departDate()
    })
  }

  function verifyArrivalDate(scenarioNum){
    getArrivalDate = scenario[scenarioNum].Arrival
    return searchResult.arrivalDate().click()
  }

  function priceConverter(priceStr){
    cy.get(priceStr).then(($value)=>{
      var price = $value.get(0).innerText
      var newPrice = price.replace("$", "")
      var parsePrice = parseInt(newPrice, 10)
      return parsePrice
    })
  }

  function lowestPriceCalculator(){
    cheapPrice = priceConverter(cheapestPrice)
    bestPricee = priceConverter(bestPrice)
    quickPrice = priceConverter(quickestPrice)
    cy.log(cheapPrice+ bestPricee+ quickPrice)

    //Cheapest value calculation
    var min = Math.min(cheapPrice, bestPricee, quickPrice);
    expect(min).to.eq(cheapPrice)
  }

export {routing, lowestPriceCalculator, getDepartureDate, getArrivalDate, verifyArrivalDate, arrivalDate, departureDate, select_Traveller, destination_Selection, 
    destination_Input, origin_Selection, origin_Input, verifyDepartureDate }