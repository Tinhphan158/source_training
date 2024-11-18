export interface IRootObject {
  user: IUser;
  accessToken: string;
  code: number;
  refreshToken: string;
  tokenType: string;
  exchangeToken: string;
  role: string;
}
export interface IUser {
  id: number;
  tenant: ITenant;
  fullName: string;
  username: string;
  metadata?: any;
  appRoles?: any;
  email: string;
  tenantUserId?: any;
  phoneNumber: string;
  position?: any;
  parentId?: any;
  staffId: number;
  avatar?: any;
  department: string;
  accountEnabled: boolean;
  accountExpired: boolean;
  accountLocked: boolean;
  isCustomer: boolean;
  customerId: number;
  staffMetaDataId: number;
}
export interface ITenant {
  id: number;
  code: string;
  name: string;
  fullName: string;
  logo?: any;
  logoFullSizeUrl?: any;
  address: string;
  phoneNumber?: any;
  email: string;
  currency: string;
}
