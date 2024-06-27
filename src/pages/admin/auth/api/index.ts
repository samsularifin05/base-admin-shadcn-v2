import { AppDispatch, AppThunk, themesActions, utilityActions } from "@/app";
import { FormLoginDto } from "../model";
import { ToastNotificationInfo, timoutDelay } from "@/shared";

export const loginAction = (data: FormLoginDto): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(utilityActions.setLoading({ screen: true }));

    timoutDelay(300);
    if (data.user_id === "admin" && data.password === "123") {
      dispatch(themesActions.setIsLogin(true));
    } else {
      ToastNotificationInfo("User id dan password salah");
    }
  };
};
