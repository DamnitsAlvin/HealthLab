import React, {useState, useEffect} from 'react'

export default function DoctorPayment(props){
    const {data, ParentFunction,doc_id} = props
    const [Payment, setPayment] = useState([])
   
    const PaymentChangeHandler = (event, index) =>{
        const values = [...Payment]
        values[index][event.target.name] = event.target.value
        setPayment(values)
        ParentFunction(values)
    }
    const removePaymentFieldHandler = (index) =>{
        const values = [...Payment]
        values.splice(index, 1)
        setPayment(values)
    }
    const addPaymentFieldHandler = () =>{
        setPayment([
            ...Payment, 
            {
                platform: "",
                account_name: "", 
                account_number: "", 
                doctor_id: doc_id, 
                id: ""
               
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map(values =>{
                setPayment(prevState => ([
                    ...prevState, 
                    {
                        
                        platform: values[2],
                        account_name: values[3], 
                        account_number: values[4],
                        doctor_id: values[0], 
                        id: values[1]

                    }
                ]))
            })
        }
        
    }, [data])

    return(
        <div className="pard_3">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary"><i class="fa fa-credit-card" aria-hidden="true"id="fontawesomeSpace"></i>Payment Information</h6>
                        </div>
                        {Payment.map((value, index)=>(
                            <>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Payment Platform Provider</label>
                                    <input type="text" className="form-control"  name="platform" value={value.platform} onChange={(event)=>PaymentChangeHandler(event, index)}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Account Name</label>
                                    <input type="text" className="form-control"  name='account_name'value={value.account_name} onChange={(event)=>PaymentChangeHandler(event, index)} />
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Account Number</label>
                                    <input type="text" className="form-control"  name='account_number' value={value.account_number} onChange={(event)=>PaymentChangeHandler(event, index)}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                        <button type="button" onClick={()=>removePaymentFieldHandler(index)} className="btn btn-danger">Remove</button>
                                    </div> <hr></hr>
                            </div>
                          
                            </>
                        ))}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={addPaymentFieldHandler} className="btn btn-success" id="colorBlue">Add Fields</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}