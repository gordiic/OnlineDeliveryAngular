import { AccountStatus } from './AccountStatus';
import { Order } from './Order';
import { UserType } from './UserType';

export class User {
  id: number = 0;
  userName: string = '';
  email: string = '';
  password: string = '';
  name: string = '';
  lastName: string = '';
  birthDate: string = '';
  address: string = '';
  userType: UserType = UserType.ordinaryUser;
  accountStatus: AccountStatus = AccountStatus.processing;
  orders: Order[] = [];
  public verificated(u: User) {
    if (this.accountStatus === AccountStatus.processing) {
      return true;
    } else {
      return false;
    }
  }

  public isAccepted(accountStatus: string) {
    if (accountStatus === 'accepted') {
      return true;
    } else {
      return false;
    }
  }

  public isProcessing(accountStatus: string) {
    if (accountStatus === 'processing') {
      return true;
    } else {
      return false;
    }
  }

  public isAdministrator(userType: string) {
    if (userType === 'administrator') {
      return true;
    } else {
      return false;
    }
  }
  public isOrdinaryUser(userType: string) {
    if (userType === 'ordinaryUser') {
      return true;
    } else {
      return false;
    }
  }

  public isDeliverer(userType: string) {
    if (userType === 'deliverer') {
      return true;
    } else {
      return false;
    }
  }
}
