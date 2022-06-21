import React, {Component} from 'react'
import Axios from 'axios'
import {v4 as uuid } from 'uuid';
import Cookies from 'universal-cookie'; 
import Message from './Message';

const cookies = new Cookies()

export default class Chatbot extends Component{

    constructor(props){
        super(props)
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this); 

        this.state = {
            args: {
                button: document.querySelector('.chatbox__button'), 
                chatbox: document.querySelector('.chatbox__support')
            },
            icons:{
                isClicked: '<img src="/img/svg icons/chatbot-icon.png">',
                isNotClicked: '<img src="/img/svg icons/chatbot-icon.png">'
            }, 
            messages:[], 
            shopWelcomeSent: false,  
            //messages: [{says, msg: {text {text} } }, {}, {}]
            chatboxState: true
        }
        if(cookies.get("userId")===undefined){
            cookies.set("userId", uuid(), {path:"/"}); 
        }

    }
    async componentDidMount(){
        
        if(!this.state.shopWelcomeSent){
            await this.df_event_query("WELCOME")
            this.setState({shopWelcomeSent: true})
        }

    }
    componentDidUpdate(){
        this.renderMessages(this.state.messages)
    }


    async df_text_query(querytext){
        //user says
        let says ={
            speaks: 'visitor', 
            msg: {
                text:{
                    text: querytext
                }
            }
        }

        this.setState({ messages: [...this.state.messages, says] })

        const res = await Axios.post('http://localhost:4000/api/df_text_query', {text: querytext, userID: cookies.get("userId")})
        let msg = ""
        //bot response
        if(res.data.fulfillmentMessages){
            if (res.data.fulfillmentMessages[0].platform === "ACTIONS_ON_GOOGLE"){
                msg = res.data.fulfillmentText
                says = {
                    speaks: 'operator', 
                    msg:{
                        text:{
                            text: msg
                        }    
                    }
                }
                this.setState({messages: [...this.state.messages, says ]})

            }else{
                for(let i=0; i<res.data.fulfillmentMessages.length; i++){

                    msg = res.data.fulfillmentMessages[i];
    
                    says ={
                        speaks:'operator', 
                        msg: msg
                    }
    
                    this.setState({
                        messages: [...this.state.messages, says]
                    })
                }
            }
            
    }
    }

    async df_event_query(event){

        const {data} = await Axios.post('http://localhost:4000/api/df_event_query', {event})

        for(let msg of data.fulfillmentMessages){
            let says = {
                speaks: 'operator', 
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    toggleState = () =>{
        this.setState({chatboxState: !this.state.chatboxState})
        this.showOrHideChatBox(this)
    }

    showOrHideChatBox() {
        if(this.state.chatboxState) {
            document.querySelector('.chatbox__support').classList.remove('chatbox--inactive')  
            document.querySelector('.chatbox__support').classList.add('chatbox--active')  
        } else{
            document.querySelector('.chatbox__support').classList.remove('chatbox--active')  
            document.querySelector('.chatbox__support').classList.add('chatbox--inactive')  
        }
    }
    
    toggleIcon() {
        const { isClicked, isNotClicked } = this.state.icons;
        let b = document.querySelector('.chatbox__button');

        if(this.state.chatboxState) {
            b.children[0].innerHTML = isClicked; 
        } else{
            b.children[0].innerHTML = isNotClicked;
        }
    }
    renderMessages(stateMessages){
        if(stateMessages){
            return stateMessages.map((message,i)=>{
                if(message.msg && message.msg.text.text){
                    return <Message key={i} text={message.msg.text.text} says={message.speaks}></Message>;
                }else{
                    return null; 
                }
            })
        }
    }
    _handleInputKeyPress(e){
        if(e.key === "Enter"){
            this.df_text_query(e.target.value);
            e.target.value="";
        }
    }

    render(){
        return(
            <div className="chatbox">
                <div className="chatbox__support chatbox--inactive">
                    <div className="chatbox__header">
            
                        <div className="chatbox_image--header">
                        </div>
                    
                        <div className="chatbox_content--header">
                            <h4 className="chatbox_heading--header">MediCall Chat Support</h4>
                        </div>

                    </div>
                    <div className="chatbox__messages">
                        <div>
                           
                            {this.renderMessages(this.state.messages)}
                            
                        </div>
                    </div>
                    <div className="chatbox__footer">
                        <input type="text" placeholder="Write a message" onKeyPress={this._handleInputKeyPress}/>
                        <p className="chatbox_send--footer">Send</p>
                        
                    </div>
                </div>
                <div className="chatbox__button" onClick={()=>this.toggleState(this)} >
                    
                    <button><img src="/img/svg icons/chatbot-icon.png"/></button>
                </div>
            </div>
        )
    }
}