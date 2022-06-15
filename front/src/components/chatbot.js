import React, {Component} from 'react'

export default class Chatbot extends Component{
    constructor(props){
        super(props)
        this.state = {
            args: {
                button: document.querySelector('.chatbox__button'), 
                chatbox: document.querySelector('.chatbox__support')
            },
            icons:{
                isClicked: '<img src="/img/svg icons/chatbot-icon.png">',
                isNotClicked: '<img src="/img/svg icons/chatbot-icon.png">'
            },   
            chatboxState: true
        }
    }
    
    toggleState = () =>{
        this.setState({chatboxState: !this.state.chatboxState})
        console.log(this.state.chatboxState)
        this.showOrHideChatBox(this)
    }

    showOrHideChatBox() {
        if(this.state.chatboxState) {
            document.querySelector('.chatbox__support').classList.add('chatbox--active') 
            // this.toggleIcon(this)
        } else{
            document.querySelector('.chatbox__support').classList.remove('chatbox--active')  
            // this.toggleIcon(this)
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

    render(){
        return(
            <div className="chatbox">
                <div className="chatbox__support">
                    <div className="chatbox__header">
            
                        <div className="chatbox_image--header">
                            
                        </div>
                    

                        <div className="chatbox_content--header">
                            <h4 className="chatbox_heading--header">MediCall Chat Support</h4>
                            
                        </div>
                    </div>
                    <div className="chatbox__messages">
                        <div>
                            <div className="messages__item messages__item--visitor">
                                Hello! I need a Doctor.
                            </div>
                            <div className="messages__item messages__item--operator">
                                Hi! What is it?
                            </div>
                            <div className="messages__item messages__item--visitor">
                                Hello! I need a Doctor.
                            </div>
                            <div className="messages__item messages__item--operator">
                                Hi! What is it?
                            </div>
                            <div className="messages__item messages__item--visitor">
                                Hello! I need a Doctor.
                            </div>
                            <div className="messages__item messages__item--operator">
                                Hi! What is it?
                            </div>
                            
                        </div>
                    </div>
                    <div className="chatbox__footer">
                        <input type="text" placeholder="Write a message"/>
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