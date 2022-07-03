import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    // useNavigate hook is used to go to other url or switch between pages
    let navigate = useNavigate();
    const [cridentials, setCridentials] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setCridentials({ ...cridentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: cridentials.email, password: cridentials.password })
            });
            const json = await response.json();
            console.log(json);
            if(json.success === true) {
                //saving token in local storage
                localStorage.setItem('token' ,json.authtoken)
                
                //redirect
                navigate("/")
                props.showAlert("successful", "success")
            }
            else{
                props.showAlert("Invalid Credentials", "danger")
            }

        }
        catch (err) {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    return (
        <div>
            
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={cridentials.email} id="email" name="email" placeholder="email@email.com" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cridentials.password} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-outline-success" >Submit</button>
                
            </form>
        </div>
    )
}

