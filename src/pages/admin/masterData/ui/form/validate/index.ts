import * as yup from "yup";

export const validateFormMasterData = yup.object().shape({
  name: yup.string().required("Username is required")
});
