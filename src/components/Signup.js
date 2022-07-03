import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import './Signup.css'
export function Signup(props) {
    let navigate = useNavigate();
    const [cridentials, setCridentials] = useState({ name:"", email: "", password: "", cpassword:"" })

    const onChange = (e) => {
        setCridentials({ ...cridentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: cridentials.name,  email: cridentials.email, password: cridentials.password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success === true) {
                //saving token in local storage
                localStorage.setItem('token', json.authtoken)

                //redirect
                navigate("/")
                props.showAlert("successful", "success")
            }
           

        }
        catch (err) {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    return (
        <div className="my-3">
            
            <form  className = "my-3"onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" name="name" onChange={onChange} value={cridentials.name} id="name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  name="email" onChange={onChange} value={cridentials.email} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={cridentials.password} id="password" required minLength="8"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} value={cridentials.cpassword} id="cpassword" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled = {cridentials.password !== cridentials.cpassword }>Submit</button>
            </form>
        </div>
    )
}

