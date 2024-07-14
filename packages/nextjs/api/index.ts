// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");

const getAdvertiserQuery = `
    query GetAdvertiserByWallet($wallet: Bytes!) {
      advertisers(where: { wallet: $wallet }) {
        id
        wallet
        totalPaid
        interests
        ads {
            id
            imageUrl
            websiteUrl
            adVector
        }
      }
    }
`;

const getAdQueryByAdId = `
  query GetAdByAdId($adId: Bytes!) {
    adCreateds(where: { adId: $adId }) {
      id
      imageUrl
      websiteUrl
      advertiser {
        wallet
      }
    }
  }
`;

export async function getAdvertiser(wallet: string) {
  const requestBody = {
    query: getAdvertiserQuery,
    variables: { wallet },
  };

  const res = await axios.post("https://api.studio.thegraph.com/query/57147/adfhenture/v0.0.8", requestBody);
  return res.data.data.advertisers[0];
}

export async function getAdByAdId(adId: string) {
  const requestBody = {
    query: getAdQueryByAdId,
    variables: { adId },
  };

  const res = await axios.post("https://api.studio.thegraph.com/query/57147/adfhenture/v0.0.8", requestBody);
  return res.data.data.adCreateds[0];
}
