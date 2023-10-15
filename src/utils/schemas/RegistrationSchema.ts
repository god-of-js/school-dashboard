import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';

export default Yup.object({
    email: Yup.string().email(isEmail).required(isRequiredMessage),
    name: Yup.string().required(isRequiredMessage),
    password: Yup.string().required(isRequiredMessage).min(8),
});
