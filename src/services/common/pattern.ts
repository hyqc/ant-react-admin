export const AdminUserPassword = /^[\S][\s\S]{4,30}[\S]$/g;
export const AdminMenuKey = /^([A-Z][a-zA-Z0-9]*)+$/g;
export const AdminPerssionKey = AdminMenuKey;
export const AdminRouterPath = /^(\/[a-z][a-zA-Z0-9]*\/?)+$/g;
export const AdminAPIKey = /^[a-z][a-zA-Z0-9]*::[a-z][a-zA-Z0-9]*$/g;
