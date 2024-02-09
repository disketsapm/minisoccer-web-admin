export type AuditLogsInterface = {
    id?: number;
    timestamp: string;
    user: string;
    role: string;
    ip_address: string;
    action_token: string;
    menu: string;
    submenu: string;
};
