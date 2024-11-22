import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetMasterDataDto, initialState } from './type';

const masterDataReducer = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    setMasterData(state, action: PayloadAction<GetMasterDataDto>) {
      state.getMasterData = action.payload;
    }
  }
});

const { setMasterData } = masterDataReducer.actions;

export { setMasterData };

export default masterDataReducer.reducer;
