import React, { useRef, useState } from 'react'

const PARENTAL_PIN_LENGTH = 5; 
const pin = [5,2,7,3,9]

export default class AdminLogin extends React.Component{


   
    

    constructor(props){
        super(props)
        this.state = {
            numChars: 0, 
            acceptInput: true,
        }
        this.pinRef = React.createRef(null)
        this.loginForm = document.querySelector('form.login');
        this.pinUI = document.querySelectorAll('.pin-ui li');
    }

    componentDidMount(){
        console.log(this.pinRef)
        this.pinRef.current.focus()
        this.pinRef.current.click()
    }
    checkIfNumber = (e) =>{
        if(!this.state.acceptInput){
            e.preventDefault();
        }else{
            if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keycode >= 96 && e.keyCode <= 105)){
                // let it through
                this.state.numChars++;
            }else{
                e.preventDefault();
            }
        }
    }

    addAnimationToPin = () =>{
        this.pinUI.forEach(function(el, i){
            if(this.state.numChars > i){
                el.classList.add('on');
            }else{
                el.classList.remove('on');
            }
        });

        if(this.state.numChars === 4){
            this.loginForm.querySelector('input.submit').click();
        }
    }


    submitHandler = (e) =>{
        e.preventDefault();
        this.state.acceptInput = false;
        this.pinRef.current.blur()

        document.querySelector('.mask').classList.add('visible');
    
            this.pinUI.forEach(function(el, i){
                setTimeout(function(){
                    el.classList.add('animate');
                }, 300*i);
            });
            
            setTimeout(function(){
                document.querySelector('.login').classList.add('hide');
            }, 2000);
    }
    
    render(){
        return(
            <>
            <form className="login" onSubmit={e => this.submitHandler(e)}>
                <h3>Account Login</h3>
                <p>Please enter a 4-digit PIN code</p>
                <fieldset>
                    <ul className="pin-ui">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="mask"></div>
                    <input ref={this.pinRef} type="password" inputMode="numeric" name="input-pin" className="input-pin" onKeyDown={(event)=>{this.checkIfNumber(event)}} onKeyPress={this.addAnimationToPin}/>
                    <input type="submit" className="submit"/>
                </fieldset>
            </form>

            <div className="hidden-links">
                <a href="https://boag.online" className="linkout" target="_blank">boag.online</a>
                <a href="#" className="reset">Reset</a>
            </div>
            </>
        )
    }
}