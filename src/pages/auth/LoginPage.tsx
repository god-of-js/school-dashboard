import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginUserQuery } from '../../api/queries';
import UiButton from '../../components/ui/UiButton';
import UiForm from '../../components/ui/UiForm';
import UiInput from '../../components/ui/UiInput';
import OnChangeParams from '../../types/OnChangeParams';
import LoginSchema from '../../utils/schemas/LoginSchema';

export default function LoginPage() {
  const { request, isLoading } = useLoginUserQuery();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  async function loginUser() {
    try {
      request(formData).then(({ uid }) => {
        localStorage.setItem('uid', uid);
        window.location.reload();
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1 className="my-14 font-bold text-lg">Welcome back! </h1>
      <UiForm formData={formData} schema={LoginSchema} onSubmit={loginUser}>
        {({ errors }) => (
          <div className="grid gap-8">
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
            <UiButton block loading={isLoading}>
              Submit
            </UiButton>
            <p className="text-sm text-center">
              Not a member?{' '}
              <Link to="/auth/join" className="text-primary underline">
                Register
              </Link>
            </p>
          </div>
        )}
      </UiForm>
    </>
  );
}
