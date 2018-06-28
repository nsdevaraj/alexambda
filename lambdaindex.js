/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const server = require('http').createServer(app) 
let port = process.env.PORT || 3000;
app.use(bodyParser.json());
let skill;
let dashboardname={username:"",name:"Retail Analytics",lasttime:"September 2016",title1:"Location View",title2:"Sales Group view"};

// Creates the website server on the port #
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Express Routing
app.use(express.static(__dirname + '/public')); 

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Visualbi Alexa APP!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  },
};

const OpenIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'open';
  },
  handle(handlerInput) {
    const speechText = "Welcome "+dashboardname.username+",you are looking at the "+dashboardname.name+" from "+dashboardname.lasttime;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  },
};

const ViewHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'View';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.showview.value;
    const speechText = "Showing the view of "+itemSlot;
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask details about the dashboard!'; 
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Thank you for visiting us!! Dont forget to look onto our VBX extensions!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const LocationHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Locationfilter';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.locationtype.value;
    const speechText = "Showing only the location with " +itemSlot+ " sales";
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};		
				 		
const ZoomHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Zoom';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.zoomlevel.value;
    const speechText = "Showing the zoom level of "+itemSlot;
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};
		
const KPIHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Kpi';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.kpisummary.value;
    const speechText = "Showing the kpi summary of " +itemSlot;
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};

	
const FilterHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Filter';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const measureList = handlerInput.requestEnvelope.request.intent.slots.Measurelist.value;
    const measureValue = handlerInput.requestEnvelope.request.intent.slots.MeasureValue.value;
    const speechText = "Displaying the "+measureList+" for "+measureValue;
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};

		
const DashboardHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ExplainDashboard';
  },
  handle(handlerInput) { 
    const speechText = "This dashboard shows  " + dashboardname.title1 + " and  " + dashboardname.title2;
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};

		
const ExplainHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Whatdowesee';
  },
  handle(handlerInput) { 
    const speechText = 'We are looking at the all sales channel and all sales division';
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};

		
const ThankHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'thankyou';
  },
  handle(handlerInput) { 
    const speechText = "Thank you for visiting us!! Don't forget to look onto our VBX extensions";
	return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('VBX Alexa', speechText)
      .getResponse();
  }
};
// Laambda code 
exports.handler = async function (event, context) {
    if (!skill) {
      skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers( 
			ThankHandler,
			FilterHandler,
			ExplainHandler,
			DashboardHandler,
			LaunchRequestHandler,
			ViewHandler,
			LocationHandler,
			OpenIntentHandler,
			ZoomHandler,
			HelpIntentHandler,
			KPIHandler,
			CancelAndStopIntentHandler,
			SessionEndedRequestHandler
        )
		.addErrorHandlers(ErrorHandler)
        .lambda();
    }
    return skill.invoke(event,context);
} 
/*
app.post('/', function(req, res) {

    if (!skill) {

      skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers(
			ThankHandler,
			FilterHandler,
			ExplainHandler,
			DashboardHandler,
			LaunchRequestHandler,
			ViewHandler,
			LocationHandler,
			OpenIntentHandler,
			ZoomHandler,
			HelpIntentHandler,
			KPIHandler,
			CancelAndStopIntentHandler,
			SessionEndedRequestHandler
        )
		.addErrorHandlers(ErrorHandler)
        .create();

    }

    skill.invoke(req.body)
      .then(function(responseBody) {
        res.json(responseBody);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send('Error during the request');
      });

});
*/

 