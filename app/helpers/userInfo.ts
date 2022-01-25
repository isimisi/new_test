export interface DbUser {
  id: number;
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  employer: string | null;
  organization_id: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  plan_id: number | null;
  stripe_customer_id: string | null;
  marketing: number;
}

export interface AccessToken {
  type: string;
  token: string;
  refreshToken: string | null;
}

export interface Organization {
  id: number;
  name: string;
  cvr: string;
  address: string;
  zipcode: string;
  city: string;
  cityname: string | null;
  protected: number;
  phone: string | null;
  email: string | null;
  start_date: string;
  employees: number | null;
  industry_code: number;
  industry_desc: string;
  plan_id: number;
  created_at: string;
  updated_at: string;
}

export interface UserMeta {
  access_token: AccessToken;
  dbUser: DbUser;
  organization: Organization;
}

export interface AuthUser {
  "https://juristic.io/meta"?: UserMeta;
  nickname?: string;
  name?: string;
  picture?: string;
  updated_at?: string;
  email?: string;
  email_verified?: boolean;
  sub?: string;
}

export const getPlanId = (user?: AuthUser): number | null => {
  const meta = user && user["https://juristic.io/meta"];
  if (meta) {
    return meta.dbUser.plan_id || meta.organization.plan_id;
  }
  return null;
};

export const getToken = (user?: AuthUser): string => {
  const meta = user && user["https://juristic.io/meta"];
  if (meta) {
    return meta.access_token.token;
  }
  return "";
};
