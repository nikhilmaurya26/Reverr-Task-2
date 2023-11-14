import React, { useState } from 'react'
import styles from "./Login.module.css"
import Input from '../Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase'
const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: "",
    })
    const [submitDisable, setSubmitDisable] = useState(false);
    const [err, setError] = useState("")
    const handleSubmission = () => {
        if ( !values.email || !values.pass) {
            setError("Fill all field");
            return;
        }
        setError("")
        setSubmitDisable(true)
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitDisable(false);            
                console.log(res);
                navigate('/');

            })
            .catch((err) => {
                setError(err.msg)
                setSubmitDisable(false)
                console.log("error", err)
            });
    }
    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Log in</h1>
                <Input label="Email" placeholder="Enter your email" 
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                }/>
                <Input label="Password" placeholder="Enter your password"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                } />
                <div className={styles.footer}>
                <b className={styles.err}>{err}</b>
                    <button 
                    disabled={submitDisable}
                        onClick={handleSubmission}>Login</button>
                    <p>
                        already have a account?
                        <span>
                            <Link to="/signup">Sign up</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
