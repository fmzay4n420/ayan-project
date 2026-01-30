
export type UserStatus = 'Pending' | 'Active';
export type WithdrawStatus = 'Pending' | 'Paid' | 'Rejected';

export interface User {
  id: string;
  phone: string;
  password: string;
  name: string;
  profilePic?: string;
  referCode: string;
  referredBy?: string;
  balance: number;
  status: UserStatus;
  referCount: number;
  createdAt: string;
}

export interface WithdrawRequest {
  id: string;
  userId: string;
  userPhone: string;
  method: 'Bkash' | 'Nagad';
  number: string;
  amount: number;
  status: WithdrawStatus;
  requestedAt: string;
}

export interface AppState {
  users: User[];
  withdraws: WithdrawRequest[];
  currentUser: User | null;
  isAdmin: boolean;
}
