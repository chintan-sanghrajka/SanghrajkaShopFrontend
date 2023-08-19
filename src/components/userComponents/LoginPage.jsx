import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputTags from '../InputTags.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { BASE_URL } from '../helper.js';
import ProgressBar from './../ProgressBar.jsx';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const [noUsername, setNoUsername] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [noPassword, setNoPassword] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [loadingWidth, setLoadingWidth] = useState("0")
    const [progress, setProgress] = useState(true)

    useEffect(() => {
        setProgress(true)
    }, [data])

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const submitHandler = () => {
        setNoUsername(false)
        setNoPassword(false)
        setInvalidUsername(false)
        setInvalidPassword(false)
        if (data.username === undefined || data.username === "") {
            setNoUsername(true)
        }
        else if (data.password === undefined || data.password === "") {
            setNoPassword(true)
        }
        else if (data.username !== undefined && data.password !== undefined) {
            setLoadingWidth("70%")
            axios.post(`${BASE_URL}login/`, { userName: data.username, password: data.password, action: "password" }
            ).then((res) => {
                if (res.data.id === 1) {
                    setInvalidUsername(true)
                    setLoadingWidth("0")
                    setProgress(false)
                }
                else if (res.data.id === 2) {
                    setInvalidPassword(true)
                    setLoadingWidth("0")
                    setProgress(false)
                }
                else {
                    Cookies.set('user', JSON.stringify(res.data.user), { expires: 1 });
                    Cookies.set('token', res.data.token, { expires: 1 });
                    navigate('/')
                }
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    return (
        <>
            {progress && <ProgressBar loadingWidth={loadingWidth} />}
            <Container >
                <h2 className='my-4 ms-md-5 ms-3'>Welcome,</h2>
                <div className='input_tag_div mt-5'>
                    <InputTags props={{ type: "text", name: "username", placeholder: "Username", heading: "Username", changeHandler: onChangeHandler }} />
                    {noUsername && <p className='error_msg'>Please enter username</p>}
                    {invalidUsername && <p className='error_msg'>Invalid Username</p>}
                    <InputTags props={{ type: "password", name: "password", placeholder: "Password", heading: "Password", changeHandler: onChangeHandler }} />
                    {noPassword && <p className='error_msg'>Please enter password</p>}
                    {invalidPassword && <p className='error_msg'>Invalid Password</p>}
                    <div className='d-flex justify-content-between mt-4'>
                        <Button variant='primary' onClick={() => { navigate("/signup/user") }}><i className="bi bi-plus-square me-2"></i>Sign Up</Button>
                        <Button variant='success' onClick={submitHandler}><i className="bi bi-box-arrow-in-right me-2"></i>Login</Button>
                    </div>
                    <div className='d-flex justify-content-between mt-4'>
                        <Button variant='outline-secondary' className='btn-md-sm' onClick={() => { navigate("/signup/vendor") }}>Signup as Vendor</Button>
                        <Button variant='outline-secondary' onClick={() => { navigate("/login-with-OTP") }}>Login with OTP</Button>
                    </div>
                </div>
            </Container>
        </>

    )
}

export default LoginPage