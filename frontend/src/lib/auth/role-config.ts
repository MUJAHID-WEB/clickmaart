export type IdentityRole = "admin" | "wholesaler" | "retailer" | "customer";

export type IdentityRoleConfig = {
  role: IdentityRole;
  label: string;
  loginTitle: string;
  loginDescription: string;
  identifierLabel: string;
  identifierPlaceholder: string;
  forgotPasswordLabel: string;
  oauthLabel: string;
  postLoginRoute: string;
};

export const IDENTITY_ROLE_CONFIG: Record<IdentityRole, IdentityRoleConfig> = {
  admin: {
    role: "admin",
    label: "Admin",
    loginTitle: "Admin Login",
    loginDescription:
      "Use email or mobile with password. Google OAuth can be added through the shared identity contract.",
    identifierLabel: "Email or mobile",
    identifierPlaceholder: "admin@clickmaart.com or +8801XXXXXXXXX",
    forgotPasswordLabel: "Forgot admin password?",
    oauthLabel: "Continue with Google",
    postLoginRoute: "/admin/dashboard",
  },
  wholesaler: {
    role: "wholesaler",
    label: "Wholesaler",
    loginTitle: "Wholesaler Login",
    loginDescription:
      "Only approved wholesaler accounts can continue into the panel. Locked accounts receive reset guidance automatically.",
    identifierLabel: "Mobile number or email",
    identifierPlaceholder: "+8801XXXXXXXXX or wholesaler@clickmaart.com",
    forgotPasswordLabel: "Forgot wholesaler password?",
    oauthLabel: "Continue with Google",
    postLoginRoute: "/wholesaler/profile",
  },
  retailer: {
    role: "retailer",
    label: "Retailer",
    loginTitle: "Retailer Login",
    loginDescription:
      "Retailer sign-in supports role-aware redirect, Google OAuth foundation, and account security notifications.",
    identifierLabel: "Mobile number or email",
    identifierPlaceholder: "+8801XXXXXXXXX or retailer@clickmaart.com",
    forgotPasswordLabel: "Forgot retailer password?",
    oauthLabel: "Continue with Google",
    postLoginRoute: "/retailer/profile",
  },
  customer: {
    role: "customer",
    label: "Customer",
    loginTitle: "Customer Login",
    loginDescription:
      "Customers can sign in from the public store and continue shopping with password recovery support.",
    identifierLabel: "Email or mobile",
    identifierPlaceholder: "customer@clickmaart.com or +8801XXXXXXXXX",
    forgotPasswordLabel: "Forgot your password?",
    oauthLabel: "Continue with Google",
    postLoginRoute: "/",
  },
};

export const ROLE_REDIRECTS = {
  admin: "/admin/dashboard",
  wholesaler: "/wholesaler/profile",
  retailer: "/retailer/profile",
  customer: "/",
} as const;
