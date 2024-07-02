import { AppDispatch, AppThunk, utilityActions } from "@/app";
import { apiInstance, urlApi } from "@/shared";
import { ResponseFormMasterDataDto } from "../model";
import { setMasterData } from "../redux";

export const serviceMasterData = () => {
  const getMasterData = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(utilityActions.setLoading({ table: true }));
      try {
        const response = await apiInstance.get<ResponseFormMasterDataDto[]>(
          urlApi.masterData.user
        );
        dispatch(setMasterData({ data: response.data, count: response.count }));
      } catch (error) {
        dispatch(setMasterData({ data: [], count: 0 }));
      } finally {
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  return {
    getMasterData
  };
};
