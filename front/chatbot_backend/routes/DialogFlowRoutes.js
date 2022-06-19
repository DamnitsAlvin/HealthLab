const chatbot = require('../chatbot/chatbot');


module.exports = app => {
  
    app.get('/', (req, res)=>{
        res.send({'Hello':'Alvin'})
    });
    
    app.post('/api/df_text_query', async (req, res)=>{

          const responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
          
          //display purposes only 
          console.log('Detected intent');
          const result = responses[0].queryResult;
          console.log(`  Query: ${result.queryText}`);
          console.log(`  Response: ${result.fulfillmentText}`);

          if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
          } else {
            console.log(`  No intent matched.`);
          }
          res.send(responses[0].queryResult)

    });
    
    app.post('/api/df_event_query', async (req, res)=>{
        let response = await chatbot.eventQuery(req.body.event,req.body.userID, req.body.parameters)
        console.log(response[0].queryResult.fulfillmentText)
        res.send(response[0].queryResult)
    });

    app.get("/api/get_client_token", async(req, res) =>{
      let token  = await chatbot.getToken(); 
      res.send({token})
    })
}