export type MerchantInterface = {
    id?: number;
    merchant_code: string;
    merchant_name: string;
    description: string;
    type: string;
    created_at: string;
};

export type GetListMerchantRequestBody = {
    order: {
        column: number;
        dir: string;
    }[];
    search: {
        regex: boolean;
        value: string;
    };
    length: number;
    start: number;
};

export type GetListMerchantResponse = {
    code: string;
    name: string;
    description: string;
    merchantType: string;
    rowNum: number;
};

export type PaymentInterface = {
    code: string;
    name: string;
    description: string;
    created_at?: string;
};

export type ChannelInterface = {
    methode_code: string;
    channel_code: string;
    channel_name: string;
    description: string;
    logo: string;
};

export type BankInterface = {
    bank_code: string;
    bank_name: string;
    swift_code: string;
    address: string;
    logo: string;
};

export type ProviderInterface = {
    provider_code: string;
    provider_name: string;
};
