export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  blockNative: {
    url: process.env.BLOCK_NATIVE_URL,
    apiKey: process.env.BLOCK_NATIVE_APIKEY
  }
});