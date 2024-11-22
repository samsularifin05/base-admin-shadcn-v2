import { AppDispatch, AppThunk, themesActions, utilityActions } from '@/app';
import { ToastNotificationInfo } from '@/shared';
import { setItem } from '@/shared';

export const loginAction = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const data = state.form.LoginForm;
    dispatch(utilityActions.setLoading({ screen: true }));
    try {
      dispatch(utilityActions.setLoading({ screen: true }));
      if (data.user_id === 'admin@gmail.com' && data.password === 'admin1234') {
        setItem('userdata', data);
        dispatch(themesActions.setIsLogin(true));
        dispatch(utilityActions.stopLoading());
      }
    } catch (error) {
      dispatch(utilityActions.stopLoading());
      ToastNotificationInfo(`${error}`);
    }
  };
};
