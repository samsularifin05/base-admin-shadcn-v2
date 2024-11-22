import { Button, cn, FormPanel, RenderField } from "@/shared";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, formActions, useAppSelector } from "@/app";
import { validLoginSchema } from "./validate";
import { loginAction } from "../../service";
import { useEffect } from "react";

const FormLogin = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);

  const dispatch = useDispatch<AppDispatch>();

  function onSubmit() {
    dispatch(loginAction());
  }

  // This useEffect updates the initial form values to simulate pre-filled data
  useEffect(() => {
    dispatch(
      formActions.setValue({
        form: "LoginForm",
        values: {
          user_id: "admin@gmail.com",
          password: "admin1234"
        }
      })
    );
  }, [dispatch]);

  if (theme.getIsLogin) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <div className={cn("grid gap-6")}>
      <FormPanel
        formName={"LoginForm"}
        onSubmit={onSubmit}
        validate={validLoginSchema}
      >
        {({ form }) => (
          <>
            <div className="grid gap-2">
              <RenderField
                control={form.control}
                label="User Id"
                placeholder="Masukan User Id"
                name="user_id"
              />
              <RenderField
                control={form.control}
                label="Password"
                placeholder="Masukan Password"
                name="password"
                hiddenText
              />
              <Button
                type="submit"
                className="mt-2"
                loading={utility.getLoading.button}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </FormPanel>
    </div>
  );
};

export default FormLogin;
