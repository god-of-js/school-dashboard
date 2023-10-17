import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  name: Yup.string().required(isRequiredMessage),
});
