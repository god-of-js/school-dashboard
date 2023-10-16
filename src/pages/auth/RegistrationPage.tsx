import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecordUser, useRegisterQuery } from '../../api/queries';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import OnChangeParams from '../../types/OnChangeParams';
import RegistrationSchema from '../../utils/schemas/RegistrationSchema';

export default function RegistrationPage() {
  const { request: registerUserRequest, isLoading: registerUserIsLoading } = useRegisterQuery()
  const { request: recordUserRequest, isLoading: recordUserIsLoading } = useRecordUser()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    cPassword: '',
  });
  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  async function registerUser() {
    try {
      const req = await registerUserRequest({email: formData.email, password: formData.password}) as {uid: string};
      const userData = {
        _id: req.uid,
        name: formData.name,
        email: formData.email
      }
      recordUserRequest(userData).then((e) => {
        console.log({
          e,
          userData
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h1 className="my-14 font-bold text-lg">Nice to e-meet you!</h1>
      <UiForm
        formData={formData}
        schema={RegistrationSchema}
        onSubmit={registerUser}
      >
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
              error={errors.password}
              onChange={onChange}
            />
            <UiInput
              placeholder="Confirm your Password"
              label="Confirm Password"
              value={formData.cPassword}
              error={errors.cPassword}
              name="cPassword"
              type="password"
              onChange={onChange}
            />
            <UiButton block loading={registerUserIsLoading || recordUserIsLoading}>Submit</UiButton>
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
