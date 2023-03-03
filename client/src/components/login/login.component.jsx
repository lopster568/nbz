import images from "../../utils/image-links";

import Button from "../button/button.component";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser } from "../../api/user";
import { setCurrentUser } from "../../redux/user/user.actions";
import Notification from "../notification/notification.component";
import { clearNotification } from "../../redux/notification/notification.actions.js";
import { setNotification } from "../../redux/notification/notification.actions";
import { useFormik } from "formik"
import loginSchema from "../../utils/validation_schemas/login.schema.js";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification.notification)

    useEffect(() => {
        return () => {
            if (notification)
                dispatch(clearNotification())
        }
    })

    const onSubmit = async (values, actions) => {
        const { email, password } = values
        try {
            const user = loginUser({
                email, password
            })
            const response = await user
            console.log(response)
            dispatch(setCurrentUser(response.data))
            navigate("/explore")
        } catch (err) {
            console.log(err)
        }
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit
    })

    return (
        <>
            <Notification />
            <div className='flex flex-col pt-36 space-y-8' >
                <div className="mx-auto"  >
                    <div className="flex w-full bg-bg items-center justify-center">
                        <div className="hidden sm:block">
                            <img className="object-cover shadow-lg rounded mb-20" src={images.authBanner} height={"500"} width="512" alt="" />
                        </div>
                        <div className="flex flex-col justify-center ml-[-30px] mb-20" data-aos="fade-left"  >
                            <form className="bg-p max-w-[400px] w-full mx-auto p-16 rounded-lg" >
                                <h2 className="text-4xl dark:text-white font-bold text-center font-Raleway" >Login</h2>
                                <div>
                                    <label className="flex flex-col text-gray:400 py-2">Email</label>
                                    <input
                                        style={errors.email && touched.email ? { border: "1px solid red" } : {}}
                                        onChange={handleChange}
                                        value={values.email}
                                        onBlur={handleBlur}
                                        placeholder="email@abc.com"
                                        name="email"
                                        className="rounded-lg w-full bg-white mt-2 p-2 focus:border-blue focus:bg-bg focus:outline-none focus:text-white"
                                        type="email"
                                    />
                                    {errors.email && touched.email ? <p className="text-red-300 " >{errors.email}</p> : null}
                                </div>
                                <div>
                                    <label className="flex flex-col text-gray:400 py-2">Password</label>
                                    <input
                                        style={errors.password && touched.password ? { border: "1px solid red" } : {}}
                                        onChange={handleChange}
                                        value={values.password}
                                        onBlur={handleBlur}
                                        placeholder="Enter a password"
                                        name="password"
                                        className="rounded-lg w-full bg-white mt-2 p-2 focus:border-blue focus:bg-bg focus:outline-none focus:text-white"
                                        type="password"
                                    />
                                    {errors.password && touched.password ? <p className="text-red-300 " >{errors.password}</p> : null}
                                </div>

                                <div className="mt-4" >
                                    <Button color="a" handleClick={(e) => handleSubmit(e)} >Login</Button>
                                </div>
                                <div className="flex text-white justify-between py-2 space-x-4 text-text-grey" >
                                    <div>
                                        <p>Don't have an account?</p>
                                        <p className="text-green" > <button onClick={() => navigate("/signup")}>Register here ... </button> </p>
                                    </div>
                                    <p> <button> Forgot Password? </button></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;