import {
  getHoldings,
  placeOrder,
  getMFHoldings,
  getMFSIPs,
} from "./functions/OrderRelated";
import { generateSession, login, setLoginTokens, startKite } from "./config/KiteConfig";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

startKite();

const server = new McpServer({
  name: "Zerodha MCP",
  version: "1.0.0",
});

// * Tool to place a order on the real Indian Stock Market through Zerodha
server.tool(
  "place-stock-order",
  "Places an order related to stocks on the real Indian Stock Market through Zerodha",
  {
    variety: z.enum(["amo", "regular", "co", "auction", "iceberg"]),
    stock: z.string(),
    qty: z.number(),
    exchange: z.enum(["NSE", "BSE"]),
    orderType: z.enum(["BUY", "SELL"])
  },
  async ({ variety, stock, qty, exchange, orderType }) => {
    const data = await placeOrder(variety, stock, exchange, qty, orderType);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2), // pretty print
        },
      ],
    };
  }
);

// * Tool to get the profile of the user on Zerodha
server.tool(
  "get-zerodha-holdings",
  "Get the Stock Market holdings of the user on Zerodha",
  async () => {
    const data = await getHoldings();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2), // pretty print
        },
      ],
    };
  }
);

server.tool(
  "get-zerodha-mutual-fund-sips",
  "Get the Mutual Fund SIPs of the user on Zerodha",
  async () => {
    const data = await getMFSIPs();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2), // pretty print
        },
      ],
    };
  }
);

// * Tool to get the mutual fund holdings of the user on Zerodha
// TODO: This tool is not working, need to fix it
server.tool(
  "zerodha-mf-holdings",
  "Get the mutual fund holdings of the user on Zerodha",
  async () => {
    const data = await getMFHoldings();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 5), // pretty print
        },
      ],
    };
  }
);

// * Tool to login to Zerodha
server.tool(
  "login-to-zerodha",
  `This tool is used to login to Zerodha, you will return 
  the login URL to the user, so that they can login to Zerodha,
  after that you will call set-zerodha-tokens to
  set the tokens, user will provide you the request token in URL, you
  will then call another tool for it and pass the request token get the access token and save the values in the config file that function`,
  async () => {
    const data = await login();

    if (data) {
      return {
        content: [{ type: "text", text: data }],
      };
    }

    return {
      content: [{ type: "text", text: "Login failed" }],
    };
  }
);

// * Tool to set the tokens for Zerodha
server.tool(
  "set-zerodha-tokens",
  `This tool is used to set the tokens for Zerodha. You will get the request token from the user (might be in a URL),
  then call another function to generate the access token, save both tokens to the config file,
  and return a success message if the tokens are set successfully.`,
  {
    request_token: z.string(),
  },
  async ({ request_token }) => {
    try {

      const access_token = await generateSession(request_token);

      if (access_token !== undefined) {
        const data = await setLoginTokens({
          request_token,
          access_token,
        });

        if (data !== undefined && data == true) {
          return {
            content: [{ type: "text", text: "Tokens set successfully" }],
          };
        }
      }

      return {
        content: [{ type: "text", text: `Tokens set failed, access token: ${access_token}` }],
      };
    } catch (error) {
      console.error("Error setting tokens:", error);
      return {
        content: [{ type: "text", text: "An error occurred while setting tokens." }],
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

await getHoldings();
