import { AppDispatch, AppThunk, themesActions, utilityActions } from "@/app";
import { FormLoginDto, ResponseLoginDto } from "../model";
import { ToastNotificationInfo, apiInstance, urlApi } from "@/shared";
import { setItem } from "@/shared";

export const loginAction = (data: FormLoginDto): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(utilityActions.setLoading({ screen: true }));
    try {
      dispatch(utilityActions.setLoading({ screen: true }));
      const result = await apiInstance.post<ResponseLoginDto>(
        urlApi.auth,
        data
      );
      setItem("userdata", result.data);
      dispatch(themesActions.setIsLogin(true));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(utilityActions.stopLoading());
      ToastNotificationInfo(`${error}`);
    }
  };
};
