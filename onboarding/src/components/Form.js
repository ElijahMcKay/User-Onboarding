import React from 'react';
import { withFormik, Form, Field } from "formik"; 
import * as Yup from "yup"; 
import axios from "axios"; 

function Form({ values, errors, touched, isSubmitting }) {

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

export default FormikForm