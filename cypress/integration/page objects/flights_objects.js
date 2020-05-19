/// <reference types="Cypress" />

const scenario = require('./../../fixtures/datapool.json')

const flightType = "div[id$='switch-display-status'][data-title]"
const roundTrip = "ul[aria-label='Choose a search type:'] li[id$='switch-option-1']"
const oneWayTrip = "ul[aria-label='Choose a search type:'] li[id$='switch-option-2']"
const multiCityTrip = "ul[aria-label='Choose a search type:'] li[id$='switch-option-3']"
const roundTripInputFields = "form[class$='roundtrip']"
const oneWayInputFields = "form[class$='oneway']"
const multiCityInputFields = "form[class$='_iAB']"
const origin = "form[class$='roundtrip'] div[id$='origin-airport-display-multi-container']"
const originInput = "input[id$='origin-airport'][style]"
const destination = "form[class$='roundtrip'] div[id$='destination-airport-display-inner']"
const destInput = "input[id$='destination-airport'][placeholder='To?']"
const dateField = "form[id$=RTOWsearchform] div[id$=dateRangeInput-display-start-inner]"
const departInput = "div[id$=depart-input]"
const arrivalInput = "div[id$=return-input]"
const searchButton = "button[id$=submit][title='Search flights']"

//Search Outcomes
const popup = "div[class*=FlightPriceAlertDriveBy]"
const datefieldOut = "div[id$=dateRangeInput-display-start-inner]"
const departoutput = "div[id$=departDate-input]"
const arrivalOutput = "div[id$=returnDate-input]"
const priceTabView = "div[id$=tabs]"
const cheapestPrice = "a[id$=price_aTab] span[class*='price']"
const cheapestDuration = "a[id$=price_aTab] span[class*='duration']"
const bestPrice = "a[id$=bestflight_aTab] span[class*='price']"
const bestDuration = "a[id$=bestflight_aTab] span[class*='duration']"
const quickestPrice = "a[id$=duration_aTab] span[class*='price']"
const quickestDuration = "a[id$=duration_aTab] span[class*='duration']"

export { cheapestPrice, bestPrice, quickestPrice }


class flightTypes {

    flight_type() {
        return cy.get(flightType)
    }

    round_trip() {
        return cy.get(roundTrip)
    }

    oneway_trip() {
        return cy.get(oneWayTrip)
    }

    multicity_trip() {
        return cy.get(multiCityTrip)
    }

    roundtrip_fields() {
        return cy.get(roundTripInputFields)
    }

    onewaytrip_fields() {
        return cy.get(oneWayInputFields)
    }

    multicitytrip_fields() {
        return cy.get(multiCityInputFields)
    }

}

class flightDetails {

    origin() {
        return cy.get(origin).click().then(()=>{
            cy.get(originInput)
        })
    }

    originSelection(originSelection) {
        let selectOrigin = originSelection
        let originSelectionElement = "ul[class=flight-smarty] li[aria-label='"+selectOrigin+"']"
        cy.log(selectOrigin)
        return cy.get(originSelectionElement)
    }

    destination() {
        return cy.get(destination).click().then(()=>{
            cy.get(destInput)
        })
    }
    
    destinationSelection(destSelection) {
        let selectDest = destSelection
        let destSelectionElement = "div[id$='destination-airport-smarty-content'] ul[class=flight-smarty] li[aria-label='"+selectDest+"']"
        cy.log(selectDest)
        return cy.get(destSelectionElement)
    }
}

class travellersDetails {

    traveller(passengerType) {
        let passenger = passengerType
        let form = "div[id$=travelersAboveForm]"
        let passengerName = "input[id$=travelersAboveForm-"+passenger+"-input]"
        return cy.get(form).click({force: true}).then(()=>{
            cy.get(passengerName)
        })
    }

    departureDate(){
        return cy.get(dateField).click().then(()=>{
            cy.get(departInput)
        })
    }

    arrivalDate(){
        return cy.get(arrivalInput)
    }

    search(){
        return cy.get(searchButton)
    }
}

class searchResults {

    popup() {
        return cy.get(popup, { timeout: 20000 })
    }
    
    datefield() {
        return cy.get(datefieldOut)
    }

    departDate() {
        return cy.get(departoutput)
    }
    
    arrivalDate() {
        return cy.get(arrivalOutput)
    }

    price_Tab() {
        return cy.get(priceTabView)
    }

    cheapest_Price() {
        return cy.get(cheapestPrice)
    }

    cheapest_Duration() {
        return cy.get(cheapestDuration)
    }

    best_Price() {
        return cy.get(bestPrice)
    }

    best_Duration() {
        return cy.get(bestDuration)
    }

    quickest_Price() {
        return cy.get(quickestPrice)
    }

    quickest_Duration() {
        return cy.get(quickestDuration)
    }
}

export {flightTypes,flightDetails,travellersDetails, searchResults}
