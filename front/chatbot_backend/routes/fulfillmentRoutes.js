const {WebhookClient} = require("dialogflow-fulfillment");
const mongoose = require("mongoose")
const Demand = mongoose.model("Demand")

module.exports = app => {
    app.post("/", async(req, res)=>{
        const agent = new WebhookClient({request: req, response: res})

        function snoopy(agent){
            agent.add("Welcome to my snoopy fulfillment")
        } 

        function learn(agent){
            Demand.findOne({'course': agent.parameters.course}, function(err, course){
                if(course!==null){
                    course.counter++; 
                    course.save()
                }else{
                    const demand = new Demand({"course": agent.parameters.course})
                    demand.save()
                }
            }); 
            let responseText = `You want to learn new courses about ${agent.parameters.course}`
            agent.add(responseText)
        }
        
        function fallback(agent){
            agent.map("I didnt understand")
            agent.map("Can you repeat it again?")
        }
        let intentMap = new Map()
        //intentMap.set(intent name, fallback function)
        intentMap.set('Snoopy', snoopy)
        intentMap.set("Learn courses", learn)
        intentMap.set('Default Fallback Intent', fallback)

        agent.handleRequest(intentMap)
    })
}