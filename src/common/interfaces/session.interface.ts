export interface ISession {
  id?: string;
  identity_id?: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
