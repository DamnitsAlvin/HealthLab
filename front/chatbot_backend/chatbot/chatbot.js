'use strict'

const dialogflow = require('dialogflow'); 
const config = require('../config/keys'); 
const structjson = require("./structjson.js"); 
const {struct} = require('pb-util'); 
const mongoose = require('mongoose')


const projectID = config.googleProjectID; 
const credentials = { 
    client_email: config.googleClientEmail, 
    private_key: config.googlePrivateKey
}

//create a connection with the project
const sessionClient = new dialogflow.SessionsClient({projectID, credentials});
const Registration = mongoose.model('Registration')

module.exports = {

  // you can call dialogflow intent using text or events 
    textQuery: async function(text, userID, parameters = {} ){
      // create a session
        let sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID+userID)
        
        let self = module.exports;
        
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },

            queryParams: {
                payload:{
                  data: parameters
                }
            }
          };
          //dialogflow command to detect intent
          let response = await sessionClient.detectIntent(request); 

          response = await self.handleFunction(response)
          console.log("success text query!")
          return response

    }, 

    eventQuery: async function(event, userID, parameters = {} ){
      const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID+userID)
        let self = module.exports; 
        const request = {
            session: sessionPath,
            queryInput: {
              event: {
                // The query to send to the dialogflow agent
                name: event,
                parameters: struct.encode(parameters),
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },
            queryParams: {
                payload:{
                    data: parameters
                }
            }
        };
        
        let response = await sessionClient.detectIntent(request); 
        response = await self.handleFunction(response)
        return response
    },

    handleFunction: function(responses){
       let self = module.exports
       let queryResult = responses[0].queryResult; 

        // only do some preprocessing before returning the response
        switch(queryResult.action){
          case 'recommended-course-yes':
            if(queryResult.allRequiredParamsPresent){
              self.saveRegistration(queryResult.parameters)
            }
            break;

        }
        return responses
    },

    saveRegistration: async function(fields){
      const register = new Registration(
        {
          name: fields.name,
          address: fields.address,
          phone: fields.phone,
          registerDate: Date.now()
        }
      )
      try{
        let reg = await register.save(); 
      }
      catch(err){
        console.log(err)
      }

    }
}