import { useState } from 'react';
import { Link } from 'react-router-dom';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import OnChangeParams from '../../types/OnChangeParams';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    cpassword: ''
  });
  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  function registerUser() {}
  return (
    <>
      <h1 className="my-14 font-bold text-lg">Nice to e-meet you!</h1>
      <UiForm formData={formData} onSubmit={registerUser}>
        {({ errors }) => (
          <div className="grid gap-8">
            <UiInput
              placeholder="Enter your name"
              label="Name"
              value={formData.name}
              name="name"
              error={errors.name}
              onChange={onChange}
            />
            <UiInput
              placeholder="Enter your email"
              label="Email"
              value={formData.email}
              name="email"
              error={errors.email}
              onChange={onChange}
            />
            <UiInput
              placeholder="Enter your Password"
              label="Password"
              value={formData.password}
              name="password"
              type="password"
              onChange={onChange}
            />
            <UiInput
              placeholder="Enter your Password"
              label="ConfirmPassword"
              value={formData.password}
              name="password"
              type="password"
              onChange={onChange}
            />
            <UiInput
              placeholder="Confirm your Password"
              label="Confirm Password"
              value={formData.cpassword}
              name="cpassword"
              type="password"
              onChange={onChange}
            />
            <UiButton block>Submit</UiButton>
            <p className="text-sm text-center">
              Already a member?{' '}
              <Link to="/auth/login" className="text-primary underline">
                Login
              </Link>
            </p>
          </div>
        )}
      </UiForm>
    </>
  );
}
