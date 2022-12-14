import { useState } from "react";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "./../form-input/form-input.component";
import { signInWithGooglePopup } from "./../../utils/firebase/firebase.utils";
import { signInAuthUserFromEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
   email: "",
   password: "",
};

const SignInForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields;

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   };

   const signInWithGoogle = async () => {
      await signInWithGooglePopup();
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         await signInAuthUserFromEmailAndPassword(email, password);
         resetFormFields();
      } catch (error) {
         switch (error.code) {
            case "auth/wrong-password":
               alert("Wrong password");
               break;

            case "auth/user-not-found":
               alert("User does not exist");
               break;

            default:
               alert(`${error.message}`);
               break;
         }
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormFields({ ...formFields, [name]: value });
   };

   return (
      <div className="sign-up-container">
         <h2>Already registered?</h2>
         <span>Sign in with your email and password</span>

         <form onSubmit={handleSubmit}>
            <FormInput
               label="Email"
               type="email"
               onChange={handleChange}
               name="email"
               value={email}
            />

            <FormInput
               label="Password"
               type="password"
               onChange={handleChange}
               name="password"
               value={password}
            />
            <div className="buttons-container">
               <Button type="submit" onClick={handleSubmit}>
                  Sign In
               </Button>
               <Button
                  type="button"
                  buttonType={"google"}
                  onClick={signInWithGoogle}
               >
                  Google Sign In
               </Button>
            </div>
         </form>
      </div>
   );
};

export default SignInForm;
