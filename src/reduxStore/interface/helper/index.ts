export interface dataSignatur {
  APP_KEY: string;
  TOKEN: string;
  timestamp: number;
}

export interface LocalStorageItem<T> {
  nama: string;
  data: T;
}
