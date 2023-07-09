import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css"



export default function LoginPage() {
    document.title = "Login | Bharat Seva";


    // UseEffect Condition Goes Here
    const [IsAuthenticated, SetAuthenticated] = useState({
        IsAuthenticated: false,
        IsFetching: false,
        IsGood: false,
        Message: "😎"
    });
    const [Credentials, SetCredentials] = useState()


    function Credential(e) {
        const { name, value } = e.target
        SetCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const LoginAPI = async () => {
        SetAuthenticated((p) => ({ ...p, IsFetching: true }))
        try {
            const Authorization = await fetch(`http://localhost:5000/api/v1/userauth/userlogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Credentials)
            })
            let Response = await Authorization.json()
            if (Authorization.ok) {
                sessionStorage.setItem("BharatSevaUser", JSON.stringify({ ...Response, IsAuthenticated: true }))
                SetAuthenticated((p) => ({ ...p, IsAuthenticated: true, IsGood: true }))
            } else {
                SetAuthenticated((p) => ({ ...p, Message: Response.message }))
                alert(Response.message)
            }
        } catch (err) {
            alert("Could Not Connect to Server...")
            SetAuthenticated((p) => ({ ...p, Message: "Could not Connect to Server..." }))
        }
        SetAuthenticated((p) => ({ ...p, IsFetching: false }))

    }

    const preventDefault = (e) => {
        e.preventDefault();
        LoginAPI();
    }

    return (
        <div>
            {IsAuthenticated.IsFetching ? <Message message="Validating..." /> : (IsAuthenticated.IsGood ? <Message message="Validating..." /> : <Message message={`${IsAuthenticated.Message}`} />)}

            {IsAuthenticated.IsAuthenticated && (
                <div>
                    <Message message="Login Success..." />
                    <Navigate to="/bharatseva-user/dashboard" replace={true} />
                </div>
            )}
            <div className="RegisterContainer">
                <div className="LoginContainer">
                    <p className="BharatSeva_Registration BharatSevaLoginUser">BharatSeva+ User-InterFace</p >
                    <h2 className="logintextcontainer">Login Here</h2>

                    <form className="EnterDetails" onSubmit={preventDefault}>
                        <label>Enter Your Health ID</label><br></br>
                        <input type="Number" className="UserInputSectionLoginPage" placeholder="Enter Your Health ID" name="health_id" onChange={Credential} onKeyUp={Credential} required ></input><br></br>

                        <label>Enter Your Password</label><br></br>
                        <input type="password" className="UserInputSectionLoginPage" placeholder="Enter Your Password" name="password" onChange={Credential} onKeyUp={Credential} required ></input><br></br>

                        <input type="submit" value="Login" className="Submitbtn"></input>
                    </form>

                    <div className="Login">
                        <p className="RegisterLoginPage">Don't Have A Account ? <Link to="/bharatseva-user/register" className="RegisterBtn">Register Here</Link></p>
                    </div>

                </div>
            </div>

            <div className="loginabouttextcontainer loginaboutwidht">

                <p>Note :</p>
                <ul>
                    <li>This Project is Under-development, Some functionalities might not work as expected.</li>
                    <li>We will add more features in updates, Feel Free to Share Your Thoughts about this project regarding Design and Feature.</li>
                    <li>You Must Be Registered Before You Log-In!</li>
                    {/* <li className="triallogin">For The Trail Purpose You Can Login With ID : 2021071042 and Password : 12345.</li> */}
                </ul>
            </div>




        </div>
    )
}

