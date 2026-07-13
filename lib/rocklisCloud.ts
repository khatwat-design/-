export const ROCKLIS_CLOUD_API_URL = "https://rocklis.cloud/api/v1/orders";
export const ROCKLIS_CLOUD_PRODUCT_ID = 9; // "درع روكلس"
export const ROCKLIS_CLOUD_PAYMENT_METHOD_ID = 1; // "نقدي" (cash on delivery)
// Must match the `source` enum on rocklis.cloud's orders table
// (bot, pos, excel, website, messenger, whatsapp, instagram, calling, other, tiktok).
export const ROCKLIS_CLOUD_SOURCE = "website";
