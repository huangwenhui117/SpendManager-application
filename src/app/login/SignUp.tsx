import React, {useState} from "react";
import TextInput from "@/component/widget/TextInput";
import Button from "@/component/widget/Button";
import { signup } from "@/lib/loginApi";

interface SignUpProps {
  actionChange: (action: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ actionChange }) => {
  const [signupForm, setSignupForm] = useState({email: '', password: '', name: '', confirm: ''});
  const [errors, setErrors] = useState({email: '', password: '', name: '', confirm: ''});
  const [signupMessage, setSignupMessage] = useState('');
  type TouchedState = {
    email: boolean;
    confirm: boolean;
    password: boolean;
    name: boolean;
  };
  type Field = keyof TouchedState;

  const validateField = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email),
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$\.])[A-Za-z\d@!#$\.]{10,}$/.test(signupForm.password),
    name: /^[A-Za-z\s]+$/.test(signupForm.name),
    confirm: signupForm.password === signupForm.confirm
  }

  const isDisabledSubmit = () => {
    if (signupForm.email === '' || signupForm.password === '' || signupForm.name === '' || signupForm.confirm === '') {
      return true;
    }
    if (!validateField.email || !validateField.password || !validateField.name || !validateField.confirm) {
      return true;
    }
    return false;
  }
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabledSubmit()) {
      console.log(errors);
      signup({
        email: signupForm.email,
        password: signupForm.password,
        name: signupForm.name
      }).then((message) => {
        if (message === 'Successful Sign Up') {
          actionChange('login');
        } else {
          setSignupMessage(message);
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: Field) => {
    setSignupMessage('');
    setSignupForm({...signupForm, [field]: e.target.value});
  }

  const handleBlur = (field: Field) => {
    console.log('field', field);
    switch (field) {
    case 'email': validateField.email ? setErrors({...errors, email: ''}) : setErrors({...errors, email: 'Invalid email'});
      break;
    case 'password': {
      if (signupForm.password.length < 10) {
        setErrors({...errors, password: 'Password must be at least 10 characters'});
      } else if (!validateField.password) {
        setErrors({...errors, password: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@!#$.)'});
      } else {
        setErrors({...errors, password: ''});
      }
      console.log(errors);
    }
      break;
    case 'confirm': validateField.confirm ? setErrors({...errors, confirm: ''}): setErrors({...errors, confirm: 'Password does not match'});
      break;
    case 'name': validateField.name ? setErrors({...errors, name: ''}) : setErrors({...errors, name: 'Cannot Contains Special characters'});
      break;
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <TextInput
          label="Email"
          type="email"
          value={signupForm.email}
          onChange={(e) => handleChange(e, 'email')}
          error={errors.email}
          onBlur={() => handleBlur('email')}
          required
        />

        <TextInput
          label="Password"
          type="password"
          value={signupForm.password}
          onChange={(e) => handleChange(e, 'password')}
          onBlur={() =>  handleBlur('password')}
          error={errors.password}
          required
        />

        <TextInput
          label="Confirm Password"
          type="password"
          value={signupForm.confirm}
          onChange={(e) => handleChange(e, 'confirm')}
          onBlur={() =>  handleBlur('confirm')}
          error={errors.confirm}
          required
        />

        <TextInput
          label="name"
          type="text"
          value={signupForm.name}
          onChange={(e) => handleChange(e, 'name')}
          onBlur={() =>  handleBlur('name')}
          error={errors.name}
          required
        />

        <div className="flex space-x-4">
          <Button
            type="submit"
            variant="signup"
            disabled={
              isDisabledSubmit()
            }
          >
            Sign Up
          </Button>
          <Button
            type="button"
            onClick={() => actionChange('login')}
            variant="back"
          >
            Back
          </Button>
        </div>
        <div className="flex items-center justify-center text-sm text-red-600" hidden={
          signupMessage === ""
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span>{signupMessage}</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;