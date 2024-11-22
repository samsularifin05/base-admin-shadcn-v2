import { ResponseFormMasterDataDto } from '../model';

export interface GetMasterDataDto {
  data: ResponseFormMasterDataDto[];
  count: number;
}

export interface MasterData {
  getMasterData: GetMasterDataDto;
}
export const initialState: MasterData = {
  getMasterData: {
    data: [],
    count: 0
  }
};
