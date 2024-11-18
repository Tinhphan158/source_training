export enum EnumPath {
  home = '/',
  login = '/login',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  listEmployees = '/employees',
  contracts = '/contracts',
  help = '/help',
  contact = '/contact',
  department = '/department',
  userProfile = '/user-profile',
}

export enum EnumSidebar {
  home = 'Trang chủ',
  employees = 'Danh sách nhân viên',
  contracts = 'Danh sách hợp đồng',
  help = 'Trợ giúp',
  contact = 'Liên hệ',
  department = 'Danh sách phòng ban',
  userProfile = 'Thông tin cá nhân',
}

export enum EnumRole {}

export enum EnumGender {}

export enum EnumStatus {}

export type IAuthProfile = Record<string, any>;
