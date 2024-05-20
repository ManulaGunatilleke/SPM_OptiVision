import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import '../UpdateUserDetails/UpdateUserDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../ContextComponents/ContextComponent';


export default function UpdateUserDetails() {

    const location = useLocation()
    const history = useNavigate();
    const { user, setUser } = useContext(UserContext);

    let navigate = useNavigate();

    const [Fullname, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [TelephoneNumber, setTelephoneNumber] = useState("");
    const [UserType, setUserType] = useState("");
    const [Gender, setGender] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const params = useParams();

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        let result = await fetch(`http://localhost:8040/user/get/${params.id}`);
        result = await result.json();

        console.warn(result);
        setName(result.user.Fullname)
        setEmail(result.user.Email)
        setAddress(result.user.Address)
        setTelephoneNumber(result.user.TelephoneNumber)
        setUserType(result.user.UserType)
        setGender(result.user.Gender)
        setUsername(result.user.Username)
        setPassword(result.user.Password)

    }

    const updateUser = async () => {
        let result = await fetch(`http://localhost:8040/user/update/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ Fullname, Email, Address, TelephoneNumber, UserType, Gender, Username, Password }),
            headers: {
                'Content-Type': 'Application/json'
            }
            
        });
    
        result = await result.json();
        console.log(result.user);
        navigate(`/profile/${user._id}`);

        
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (Fullname) {
            if (UserType === "Patient") {
                history(`/PatientHome/${params.id}`)
                window.location.href = `/PatientHome/${params.id}`;
            }
            else if (UserType === "Doctor") {
                history(`/DoctorHome/${params.id}`)
                window.location.href = `/DoctorHome/${params.id}`;
            }
        }

    }


    return (
        <div className="update_page">

            <br />
            <div className="rec">
                <h1 className="updateprofile">User Profile</h1>
            </div>
            <div className="view_form">
                <form>
                    <label for="fullname" className="viewheading">Full Name: </label><br />
                    <input type="text" className="viewforminput" value={Fullname} onChange={(e) => {
                        setName(e.target.value)
                    }} /><br />

                    <label for="email" className="viewheading">Email: </label><br />
                    <input type="email" className="viewforminput" value={Email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} /><br />

                    <label for="address" className="viewheading">Address: </label><br />
                    <input type="text" className="viewforminput" value={Address} onChange={(e) => {
                        setAddress(e.target.value)
                    }} /><br />

                    <label for="phonenumber" className="viewheading">Telephone Number: </label><br />
                    <input type="number" className="viewforminput" value={TelephoneNumber} onChange={(e) => {
                        setTelephoneNumber(e.target.value)
                    }} /><br />

                    <label for="usertype" className="viewheading">User Type: </label><br />
                    <input type="text" className="viewforminput" value={UserType} onChange={(e) => {
                        setUserType(e.target.value)
                    }} readOnly /><br />


                    <label for="gender" className="viewheading">Gender: </label><br />
                    <input type="text" className="viewforminput" value={Gender} onChange={(e) => {
                        setGender(e.target.value)
                    }} /><br />

                    <label for="username" className="viewheading">Username: </label><br />
                    <input type="text" className="viewforminput" value={Username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} readOnly/><br />

                    <label for="password" className="viewheading">Password: </label><br />
                    <input type="password" className="viewforminput" value={Password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} /><br /><br />

                    <button className="userupdatebtn" onClick={updateUser}>Update</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="userupdatecancelbtn" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/profile/${params.id}`;
                    }}>Cancel</button>


                </form>
                <br />
            </div>
            <ToastContainer />

            <br /><br />


        </div>
    )
}