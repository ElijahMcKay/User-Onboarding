import React, { useState } from 'react';
import { withFormik, Form, Field } from "formik"; 
import * as Yup from "yup"; 
import axios from "axios"; 

function nameForm({ values, errors, touched, isSubmitting }){

    return (
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field 
                name="name"
                placeholder="name"
                />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field 
                name="email"
                type="email"
                placeholder="Email address"
                />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field
                name="password"
                type="password"
                placeholder="Password"
                />
            </div>
            <label>
                <Field 
                type="checkbox"
                name="tos"
                checked={values.tos} 
                />
                Accept TOS
            </label>
            <button disabled={isSubmitting}>Submit!</button>
        </Form>
    )
}


    const FormikForm = withFormik({
        mapPropsToValues({ name, email, password, tos }) {
            return {
                name: name || '', 
                email: email || '', 
                password: password || '', 
                tos: tos || false,
            }
        },

    //=============== VALIDATION SCHEMA =================
    validationSchema: Yup.object().shape({
        name: Yup.string().min(5, "Name must be longer than 5 characters.").required("Name is required"),
        email: Yup.string().email("Email is not valid").required("Email is required"),
        password: Yup.string().min(6, "Password must be 6 characters or longer").required("Password is required"),
        tos: Yup.bool()
        .oneOf([true], 'You must accept the terms')
        .required('You have to agree with our terms')
    }),
//=============== END VALIDATION SCHEMA ===============

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        // console.log(values); 
        //HTTP REQUESTS

        const [users, setUsers] = useState([]); 

        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" }); 
        } else {
            axios  
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log(res); 
                    resetForm(); 
                    setSubmitting(false); 
                    setUsers(res.data.email)
                    console.log(users); 
                })
                .catch(err => {
                    console.log(err); 
                    setSubmitting(false); 
                }); 
            }
        }
    })(nameForm); 

export default FormikForm; 