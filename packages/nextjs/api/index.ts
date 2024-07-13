// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");

const getAdvertiserQuery = `
    query GetAdvertiserByWallet($wallet: Bytes!) {
      advertisers(where: { wallet: $wallet }) {
        id
        wallet
        totalPaid
        interests
      }
    }
`;

export async function getAdvertiser(wallet: string) {
  const requestBody = {
    query: getAdvertiserQuery,
    variables: { wallet },
  };

  const res = await axios.post("https://api.studio.thegraph.com/query/57147/adfhenture/v0.0.3", requestBody);
  return res.data.data.advertisers[0];
}
