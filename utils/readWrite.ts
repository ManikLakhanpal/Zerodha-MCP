import fs from "fs";
import path from "path";

interface Tokens {
  access_token: string;
  request_token: string;
}

// * Gets the tokens from the config file
function getTokens(): Tokens | undefined {
  try {
    const data = fs.readFileSync(path.join(__dirname, "../config/tokens.json"), "utf-8");
    
    return JSON.parse(data);
  } catch (error) {
    console.error("Error retrieving codes: ", error);
    return undefined;
  }
}

// * Sets the tokens in the config file
function setTokens(props: Tokens): boolean {
  try {
    const data = {
      request_token: props.request_token,
      access_token: props.access_token,
    };

    fs.writeFileSync(path.join(__dirname, "../config/tokens.json"), JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error setting the tokens: ", error);
    return false;
  }
}

export { getTokens, setTokens, Tokens };
