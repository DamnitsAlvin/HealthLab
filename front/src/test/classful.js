import React, {Component} from 'react'

export default class TestClass extends Component{
    constructor(props){
        super(props)
        console.log("data props:", props.data)
    }
    render(){
        return(
            <>
            </>
        )
    }
}