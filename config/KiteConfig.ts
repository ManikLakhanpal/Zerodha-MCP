import { KiteConnect } from "kiteconnect";
import { 
  getTokens, 
  setTokens, 
  Tokens 
} from "../utils/readWrite";


const apiKey = process.env.API_KEY!;
const apiSecret = process.env.API_SECRET!;

const kc = new KiteConnect({ api_key: apiKey });

// * Generates Login URL and returns it
async function login(): Promise<string | undefined> {
  try {
    return kc.getLoginURL();
  } catch (err) {
    console.error("Error getting login URL:", err);
    return undefined;
  }
}

// * Starts the Kite Connect instance
async function startKite() {
  try {
    const { access_token } = getTokens()!;
    kc.setAccessToken(access_token);
    await getProfile();
  } catch (err) {
    console.error(err);
  }
}

// * Generates a session and sets the access token
async function generateSession(request_token: string | undefined): Promise<string | undefined> {
  try {
    if (request_token == undefined) {
      request_token = getTokens()!.request_token;
    }

    const response = await kc.generateSession(request_token!, apiSecret);
    // console.log(response.access_token)
    kc.setAccessToken(response.access_token);
    // console.log("Session generated:", response);
    return response.access_token;
  } catch (err) {
    console.error("Error generating session:", err);
    return undefined;
  }
}

// * Gets the profile of the user
async function getProfile(): Promise<any> {
  try {
    const profile = await kc.getHoldings();
    // console.log(profile);

    return profile;
  } catch (err) {
    console.error("Error getting profile:", err);

  }
}

// * Sets the tokens in the config file
async function setLoginTokens(tokens: Tokens) {
  try {
    return setTokens(tokens);

  } catch (err) {
    console.error("Error setting tokens:", err);
    return false;
  }
}

// console.log(await login());
// await generateSession("w3afHuqqwPHBBoIBzl685TwjMuA71jCW");
// console.log(await getProfile());

export { 
  startKite, 
  kc, 
  generateSession, 
  login,
  setLoginTokens,
  getProfile
};