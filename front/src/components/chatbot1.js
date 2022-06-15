import React from 'react'

export default function Chatbog(){
    const chatButton = document.querySelector('.chatbox__button');
    const chatContent = document.querySelector('.chatbox__support');
    const icons = {
        isClicked: '<img src="chatbot-icon.png">',
        isNotClicked: '<img src="chatbot-icon.png">'
    }
    
    class InteractiveChatbox {

        constructor(a, b, c) {
            this.args = {
                button: a,
                chatbox: b
            }
            this.icons = c;
            this.state = false; 
        }
    
        display() {
            const {button, chatbox} = this.args;
            button.addEventListener('click', () => this.toggleState(chatbox))
        }
    
        toggleState(chatbox) {
            this.state = !this.state;
            this.showOrHideChatBox(chatbox, this.args.button);
        }
    
        showOrHideChatBox(chatbox, button) {
            if(this.state) {
                chatbox.classList.add('chatbox--active')
                this.toggleIcon(true, button);
            } else if (!this.state) {
                chatbox.classList.remove('chatbox--active')
                this.toggleIcon(false, button);
            }
        }
    
        toggleIcon(state, button) {
            const { isClicked, isNotClicked } = this.icons;
            let b = button.children[0].innerHTML;
    
            if(state) {
                button.children[0].innerHTML = isClicked; 
            } else if(!state) {
                button.children[0].innerHTML = isNotClicked;
            }
        }
    }

    const chatbox = new InteractiveChatbox(chatButton, chatContent, icons);
    chatbox.display();
    chatbox.toggleIcon(false, chatButton);


    return(
        <div class="chatbox">
        <div class="chatbox__support">
            <div class="chatbox__header">
      
                <div class="chatbox_image--header">
                    <img src="download.png" alt="image"/>
                </div>
             

                <div class="chatbox_content--header">
                    <h4 class="chatbox_heading--header">MediCall Chat Support</h4>
                    
                </div>
            </div>
            <div class="chatbox__messages">
                <div>
                    <div class="messages__item messages__item--visitor">
                        Hello! I need a Doctor.
                    </div>
                    <div class="messages__item messages__item--operator">
                        Hi! What is it?
                    </div>
                    
                </div>
            </div>
            <div class="chatbox__footer">
                <input type="text" placeholder="Write a message"/>
                <p class="chatbox_send--footer">Send</p>
                
            </div>
        </div>
        <div class="chatbox__button">
            <button>Branch-1</button>
        </div>
    </div>
    )
}