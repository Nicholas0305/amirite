import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Draggable from 'react-draggable';

function LoginForm() {
    const formSchema = yup.object({
        username: yup.string().required("Please enter username"),
        password: yup.string().required("Please enter password."),
       
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json(); // This returns the promise for the next .then()
                    }
                    throw new Error('Network response was not ok.');
                })
              
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }
    });
   return (
        <Draggable>
            <div id="newform">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email_title}
                            placeholder="username"
                        />
                        {formik.errors.email_title && <div>{formik.errors.email_title}</div>}
                    </div>

                    <div>
                        <label htmlFor="Password">password</label>
                        <input
                            id="password"
                            name="password"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.subject}
                            placeholder="password"
                        />
                        {formik.errors.subject && <div>{formik.errors.subject}</div>}
                    </div>

             
                    <button type="submit">Submit</button>
                    
                </form>

            </div>
        </Draggable>
    );
}

export default LoginForm;
