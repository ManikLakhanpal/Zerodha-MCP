import { kc } from "../config/KiteConfig";

export async function placeOrder(
    variety: "amo" | "regular" | "co" | "auction" | "iceberg",
    tradingsymbol: string,
    exchange: "NSE" | "BSE",
    qty: Number,
    orderType: "BUY" | "SELL",
) {
    try {
        const data = await kc.placeOrder(
            variety, {
                exchange: exchange,
                tradingsymbol: tradingsymbol,
                transaction_type: orderType,
                quantity: Number(qty),
                product: "CNC",
                order_type: "MARKET"
            }
        );
        // console.log(data);

        return data;
    } catch (err) {
        console.log(`Error in placeOrder: ${JSON.stringify(err, null, 2)}`);

        return err;
    }
}

export async function getHoldings() {
  try {
    const profile = await kc.getHoldings();
    // console.log(profile);

    return profile;
  } catch (err) {
    console.error("Error getting profile:", err);
    return { error: "Failed to get profile", err };
  }
}

export async function getMFHoldings() {
  try {
    const mfHoldings = await kc.getMFHoldings();
    // console.log(JSON.stringify(mfHoldings, null, 5));

    return JSON.stringify(mfHoldings, null, 2);
  } catch (err) {

    console.error("Error getting MF holdings:", err);
    return { error: "Failed to get MF holdings", err };
  }
}

// ! You need to pay for this via Zerodha to use this functionality
export async function getStocksData(instruments: string | string[]) {
  try {
    const data = await kc.getQuote(instruments);
    // console.log(JSON.stringify(data, null, 5));

    return data;

  } catch (err) {
    console.error("Error getting MF SIPs:", err);

    return { error: "Failed to get MF SIPs", err };
  }
}