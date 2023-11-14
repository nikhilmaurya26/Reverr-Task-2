import React, { useState } from 'react'
import styles from "./Singup.module.css"
import Input from '../Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import { auth } from '../../firebase'
const Signup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    })
    const [submitDisable, setSubmitDisable] = useState(false);
    const [err, setError] = useState("")
    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setError("Fill all field");
            return;
        }
        setError("")
        setSubmitDisable(true)
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async(res) => {
                const user = res.user;
                await updateProfile(user,{
                    displayName:values.name,
                })
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
                <h1 className={styles.heading}>Sign up</h1>
                <Input label="Name" placeholder="Enter your Name"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, name: event.target.value }))
                    }
                />
                <Input label="Email" placeholder="Enter your email"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                />
                <Input label="Password" placeholder="Enter your password"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                    }
                />
                <div className={styles.footer}>
                    <b className={styles.err}>{err}</b>
                    <button
                        disabled={submitDisable}
                        onClick={handleSubmission}>Signup</button>
                    <p>
                        already have a account?
                        <span>
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
