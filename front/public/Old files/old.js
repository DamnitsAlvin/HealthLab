const dropdownHandler = (text) =>{
    setServiceType(text); 

    let matches = []; 
    let matchesInfo = [];
    if(text.length > 0){
        matches = doctor.data.filter((doc,index)=>{
            const regex = new RegExp(`${text}`, "gi");
            if(doc[1].match(regex)){
                matchesInfo.push(doctor.doctor_info[index])
                return doc[1].match(regex)
            }
            
        })
    }
    setDropdownDoctor(matches)
    setPickDoctor(matches[0][1])
    setDropdownName(matchesInfo)
}

const dropdownChange = (text)=>{
    console.log("called")
    console.log(text);
    setPickDoctor(text)
}

<>
<Route path="/obgynequestions" element={<OBquestionScreen/>}/>
			
<Route path="/optalquestions" element={<OptalQuestionsScreen/>}/>
<Route path="/generalHealthquestions" element={<GeneralHealthScreen/>}/>
</>