export default function AppointmentSteps(props){
    return(
        <div className="rowh checkout-steps">
            <div className = {props.step1 ? 'active': ""}>Request Slip</div>
            <div className = {props.step2 ? 'active': ""}>Medical Card</div>
            <div className = {props.step3 ? 'active': ""}>Overview</div>   
        </div>
    );
}