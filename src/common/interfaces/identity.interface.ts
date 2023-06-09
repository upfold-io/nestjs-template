import { BaseIdentity } from './base.identity';

export interface IIdentity extends BaseIdentity {
  id: string;
  email_address: string;
  password: string;
}
