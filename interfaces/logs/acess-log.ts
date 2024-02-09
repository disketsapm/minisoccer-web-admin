export type AccessLogsInterface = {
    id?: number;
    timestamp: string;
    reference_no: string;
    user: string;
    role: string;
    ip_address: string;
    credential: string;
    result: string;
    reason: string;
};
