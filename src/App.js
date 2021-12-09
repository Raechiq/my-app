import React from "react";

// TODO: import useFormik from formik library
import {useFormik} from "formik"
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
function App() {
  // TODO: add a const called formik assigned to useFormik()

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const formik = useFormik({
    initialValues:{
      username:'',
      email:'',
      password:''
    },
    onSubmit: values => {console.log("form:",values);},
    validate: values =>{
      let errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (formik.touched.password && !formik.values.password) {
        errors.password = "Required";
      } else if (formik.values.password.length <= 8) {
        errors.password = "Password must be more than 8 characters";
      }
      return errors;
    }
  });
  return (


    <div>
     <form onSubmit={formik.handleSubmit}>
      <div>Username</div>
       <input name="email" type="text" onChange={formik.handleChange} value ={formik.values.email}/>
       {formik.errors.email ? <div style={{color:'red'}}>{formik.errors.email}</div> : null}
       <div>Password</div>
       <input name="password" type="text" onChange={formik.handleChange} value ={formik.values.password}/>
       {formik.errors.password ? <div style={{color:'red'}}>{formik.errors.password}</div> : null}
       <button type="submit" onClick={open}>Submit</button>      
      
       <Dialog isOpen={showDialog} onDismiss={close}>
       <button className="close-button" onClick={close}>Close</button>
       {formik.errors.password || formik.errors.email ? <p style={{color:'red'}}>Missing Info</p>: <p style={{color:'green'}}>Login Successful</p>}
         
      </Dialog>
     </form>
    </div>
    
  );
}

export default App;
