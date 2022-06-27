import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { UpdateImage } from '../../actions/doctorActions'

export default function DoctorPersonal(props) {
    const { data, ParentFunction, ParentFunction1 } = props
    const [image, setImage] = useState()
    const [backImg, setbackImge] = useState()
    const [preview, setpreview] = useState()
    const [backpreview, setbackpreview] = useState()
    const [status, setStatus] = useState(false)
    const fileinputRef = useRef()
    const backfileinputref = useRef()
    const clickClose = useRef()
    const dispatch = useDispatch()

    const [formState, setformState] = useState({
        doctor_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        birthday: "",
        phone: "",
        email: '',
        mode_of_consultation: "Virtual",
        doctor_image: "",
        password: "",
    })

    const BasicFormFields = [
        "First Name",
        "Middle Name",
        "Last Name",
        "Suffix",
        "Birthday",
        "Phone",
        "Email",
        "Mode of Consulation",
        "Doctor Image",
        "Password"
    ]
    const BasicFormFields2 = Object.keys(formState)

    useEffect(() => {
        setformState(data ? {
            doctor_id: data[0],
            first_name: data[1], 
            middle_name: data[2], 
            last_name: data[3], 
            suffix : data[4], 
            birthday:data[5], 
            phone: data[6], 
            email: data[7], 
            mode_of_consultation: data[8], 
            doctor_image: data[10], 
            password: data[11],   
        }: {} )
        
    }, [data, status])

    useEffect(()=>{
        if(image){
            const reader = new FileReader()
            reader.onloadend = () => {
                setpreview(reader.result)
            }
            reader.readAsDataURL(image);
        } else {
            setpreview(null)
        }

        if(backImg){
            const reader = new FileReader()
            reader.onloadend = () => {
                setbackpreview(reader.result)
            }
            reader.readAsDataURL(backImg);
        } else {
            setbackpreview(null)
        }

    }, [image,backImg])


    const BasicInfoChangeHandler = async (event, index) => {
        setformState({
            ...formState,
            [BasicFormFields2[index + 1]]: event.target.value
        })
        setformState((formState) => {
            ParentFunction(formState)
            return formState;
        })

    }
    const fileChange = (event, index) => {
        const extension = event.target.files[0].name.split(".")[1]
        const filename = formState.doctor_id + "Image." + extension
        setformState({
            ...formState,
            [BasicFormFields2[index + 1]]: "/uploads/" + filename
        })
        setformState((formState) => {
            ParentFunction(formState)
            return formState;
        })
        ParentFunction1(event.target.files[0])
    }

    const VerificationProcess = async () => {
        var filename,filename1 = ""
        const formData = new FormData()
        const formData1 = new FormData()
        var date = new Date()
        var name = `${date.getMilliseconds()}${date.getMinutes()}${date.getSeconds()}`
        
        if (preview) {
            const ext = image.name.split(".")[1]
            filename = `/uploads/${name}Image.${ext}`
            formData.append('id', name)
            formData.append('file', image)
            console.log("succcess!!!!!")
        }
        if(backpreview){
            date = new Date()
            name = `${date.getMilliseconds()}${date.getMinutes()+1}${date.getSeconds()}`
            const ext = backImg.name.split(".")[1]
            filename1 =  `/uploads/${name}Image.${ext}`
            formData1.append('id', name)
            formData1.append('file', backImg)
        }
        const { status } = await axios.post("http://localhost:5000/api/addVerification", {
            "data": [
                formState.doctor_id,
                formState.first_name,
                formState.last_name,
                filename,
                filename1, 
                'doctor'
            ]
        })

        if (preview) {
            dispatch(UpdateImage(formData))
        }
        if(backpreview){
            dispatch(UpdateImage(formData1))
        }

        if (status == 200) {
            clickClose.current.click()
            setTimeout(()=>{
                window.location.reload()
            },1500)
        }

    }
    return (
        <>
            <div className="pard_2">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary"><i class="fa fa-address-book-o" aria-hidden="true" id="fontawesomeSpace"></i>Personal Details</h6>
                        </div>
                        <form method="post">
                            {BasicFormFields.map((value, index) => (
                                index == 4 ? (
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                        <div className="form-group">
                                            <label >{value}</label>
                                            <input type="date" className="form-control" onChange={(event) => BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index + 1]]} />
                                        </div>
                                    </div>
                                ) :
                                    index == 5 ? (
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                            <div className="form-group">
                                                <label htmlFor="fullName">{value}</label>
                                                <input type="text" className="form-control" placeholder="&#xf095; xxxx-xxx-xxxx" onChange={(event) => BasicInfoChangeHandler(event, index)} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" value={formState[BasicFormFields2[index + 1]]} />
                                            </div>
                                        </div>
                                    ) :
                                        index == 7 ? (
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                                <div className="form-group">
                                                    <label htmlFor="fullName">{value}</label>
                                                    <select className="form-control" onChange={(event) => BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index + 1]]}>
                                                        <option value="0">&#xf03d; Virtual</option>
                                                        <option value="1">&#xf500; Face to Face</option>
                                                        <option value="2">&#xf0c0; Both</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ) :
                                            index == 8 ? (<>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                                    <div className="form-group">
                                                        <label htmlFor="fullName">{value}</label>
                                                        <input type="file" className="form-control" onChange={event => fileChange(event, index)} />
                                                    </div>
                                                </div>
                                            </>) :
                                                index == 9 ? (
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                                        <div className="form-group">
                                                            <label htmlFor="fullName">{value}</label>
                                                            <input type="password" className="form-control" onChange={(event) => BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index + 1]]} />
                                                        </div>
                                                    </div>
                                                ) :
                                                    (
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                                            <div className="form-group">
                                                                <label htmlFor="fullName">{value}</label>
                                                                <input type="text" className="form-control" onChange={(event) => BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index + 1]]} />
                                                            </div>
                                                        </div>)
                            ))}

                        </form>
                    </div>
                    {
                        data[9]==0 ? ( <div className='buttonveri'><button className="btn btn-warning" id="buttonVerify" data-toggle="modal" data-target="#exampleModal" >Verify now</button></div>): data[9]==1 ? (<div className="alert alert-success">Already Verified</div>) : (<div className="alert alert-warning">Verification in progress</div>)
                    }



                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" id="modalVerify">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">License Provided</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h6>Front and Back</h6>
                                    <div className="qr-container" id="verifyImagecontainer">
                                        {preview && <img className="samplepic" src={preview} alt="signinbackground" />}
                                    </div>
                                    <div className="qr-container" id="verifyImagecontainerBack">
                                        {backpreview && <img className="samplepic" src={backpreview} alt="signinbackground" />}
                                    </div>
                                    <div className="downloadPDFile">

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            id="downloadPDF"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                fileinputRef.current.click()

                                            }} >Upload Front</button>

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            id="downloadBack"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                backfileinputref.current.click()

                                            }} >Upload Back</button>

                                        <input
                                            accept="image/*"
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={fileinputRef}
                                            onChange={(event) => {
                                                const file = event.target.files[0]

                                                if (file && file.type.substr(0, 5) === "image") {
                                                    setImage(file)
                                                }
                                                else {
                                                    setImage(null)
                                                }
                                            }}></input>

                                            <input
                                            accept="image/*"
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={backfileinputref}
                                            onChange={(event) => {
                                                const file = event.target.files[0]

                                                if (file && file.type.substr(0, 5) === "image") {
                                                    setbackImge(file)
                                                }
                                                else {
                                                    setbackImge(null)
                                                }
                                            }}></input>
                                    </div></div>
                                <div className="modal-footer">
                                    <button className="btn btn-success" id="pepeButo" onClick={VerificationProcess}><i className="fa-solid fa-circle-check" id="closeShit"></i>Submit</button>
                                    <button className="btn btn-danger" id="pepeButo" ref={clickClose} data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}