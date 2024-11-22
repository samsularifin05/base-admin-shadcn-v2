import {
  FormLoginDto,
  FormMasterDataDto,
  intitalFormLogin,
  intitalFormMasterData
} from '@/pages';

export interface FormState {
  LoginForm: FormLoginDto;
  FormMasterData: FormMasterDataDto;
}

export const initialState: FormState = {
  LoginForm: intitalFormLogin,
  FormMasterData: intitalFormMasterData
};
