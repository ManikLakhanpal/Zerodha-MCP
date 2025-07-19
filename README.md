# 🚀 Zerodha MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with the Zerodha trading platform. This server enables AI assistants to place stock orders, view holdings, and manage mutual fund investments through Zerodha's API.

![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![MCP SDK](https://img.shields.io/badge/MCP%20SDK-1.16.0-green)
![KiteConnect](https://img.shields.io/badge/KiteConnect-5.0.1-orange)
![Bun](https://img.shields.io/badge/Bun-Latest-yellow)

## 🎯 Features

### Trading Tools
- **Place Stock Orders** - Execute buy/sell orders on NSE and BSE
- **View Holdings** - Get current stock portfolio holdings
- **Mutual Fund SIPs** - View active Systematic Investment Plans
- **Mutual Fund Holdings** - Check mutual fund portfolio (experimental)

### Authentication
- **Zerodha Login** - Secure OAuth-based authentication
- **Token Management** - Automatic token storage and refresh
- **Session Handling** - Persistent login sessions

### Technical Features
- **TypeScript** - Full type safety across the codebase
- **MCP Protocol** - Standardized AI assistant integration
- **Error Handling** - Comprehensive error management
- **Logging** - Detailed operation logging

## 🏗️ Architecture

```
zerodha-mcp/
├── config/
│   ├── KiteConfig.ts
│   └── tokens.json     
├── functions/
│   └── OrderRelated.ts  
├── utils/
│   └── readWrite.ts     
├── .env                 
├── bun.lock
├── main.ts            
└── package.json 
```

## 🛠️ Tech Stack

- **TypeScript** - Type-safe JavaScript
- **MCP SDK** - Model Context Protocol implementation
- **KiteConnect** - Zerodha's official trading API
- **Axios** - HTTP client for API requests
- **Bun** - Required JavaScript runtime

## 📦 Installation

### Prerequisites
- [Bun](https://bun.sh/) - Required runtime
- Zerodha trading account
- Zerodha API credentials

### 1. Clone the Repository
```bash
git clone git@github.com:ManikLakhanpal/Zerodha-MCP.git
cd zerodha-mcp
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
API_KEY=your_zerodha_api_key
API_SECRET=your_zerodha_api_secret
```

### 4. Get Zerodha API Credentials
1. Log in to your Zerodha account
2. Go to [Zerodha Developers](https://developers.kite.trade/)
3. Create a new application
4. Copy your API Key and API Secret

## 🚀 Usage

### Starting the MCP Server
```bash
bun main.ts
```

### Using with Claude

This MCP server is designed to work with Claude AI assistants. Here's how to set it up:

#### 1. Install Claude Desktop
First, download and install [Claude Desktop](https://claude.ai/download) for your operating system.

#### 2. Configure Claude to Use MCP ⚙️
1. 📱 Open Claude Desktop
2. 🔧 Go to **Settings** → **Developer Settings**
3. 📄 Click **Open Config File** to open `claude_desktop_config.json` in your default editor
4. ✏️ Add the following configuration to the `mcpServers` section:

```json
{
  "mcpServers": {
    "kite": {
      "command": "/opt/homebrew/bin/bun", # Use `which bun` to get path
      "env": {
        "API_KEY": "your_zerodha_api_key",
        "API_SECRET": "your_zerodha_api_secret"
      },
      "args": ["/path/to/your/zerodha-mcp/main.ts"] # Paste the absolute path to main.ts
    }
  }
}
```

**🔧 Important Notes:**
- 🛠️ Replace `/opt/homebrew/bin/bun` with your Bun installation path (use `which bun` to find it)
- 📁 Replace `/path/to/your/zerodha-mcp/main.ts` with the actual path to your project's `main.ts` file
- 🔑 Replace `your_zerodha_api_key` and `your_zerodha_api_secret` with your actual Zerodha API credentials
- 🏷️ The server name `"kite"` can be changed to any name you prefer

#### 3. Authentication Flow 🔐
1. **🔑 First Login**: Ask Claude to "login to Zerodha"
2. **🌐 Get Login URL**: Claude will provide a login URL
3. **✅ Complete Login**: Open the URL in your browser and complete Zerodha login
4. **🔧 Set Tokens**: Copy the request token from the URL and ask Claude to "set Zerodha tokens" with the token

#### 4. Available Commands in Claude 💬
Once connected, you can ask Claude to:

- **🔐 "Login to Zerodha"** - Get authentication URL
- **🔧 "Set Zerodha tokens with [request_token]"** - Complete authentication
- **📈 "Place a buy order for 10 shares of RELIANCE on NSE"** - Execute trades
- **📊 "Show my current holdings"** - View portfolio
- **💰 "Get my mutual fund SIPs"** - View SIP investments
- **🏦 "Check my mutual fund holdings"** - View MF portfolio

#### 5. Example Conversations 💭
```
You: 🔐 "Login to Zerodha"
Claude: 🌐 [Provides login URL]

You: 🔧 "Set Zerodha tokens with abc123xyz"
Claude: ✅ [Confirms token setup]

You: 📈 "Buy 5 shares of TCS on NSE"
Claude: 💰 [Executes order and shows result]

You: 📊 "What stocks do I currently hold?"
Claude: 📋 [Shows your portfolio holdings]
```

### Available Tools 🛠️

#### 1. 🔐 Login to Zerodha
```typescript
// Tool: login-to-zerodha
// Returns a login URL for user authentication
```

#### 2. 🔧 Set Authentication Tokens
```typescript
// Tool: set-zerodha-tokens
// Parameters: { request_token: string }
// Sets access tokens after successful login
```

#### 3. 📈 Place Stock Order
```typescript
// Tool: place-stock-order
// Parameters: {
//   variety: "regular" | "amo" | "co" | "auction" | "iceberg",
//   stock: string,
//   qty: number,
//   exchange: "NSE" | "BSE",
//   orderType: "BUY" | "SELL"
// }
```

#### 4. 📊 Get Holdings
```typescript
// Tool: get-zerodha-holdings
// Returns current stock portfolio holdings
```

#### 5. 💰 Get Mutual Fund SIPs
```typescript
// Tool: get-zerodha-mutual-fund-sips
// Returns active Systematic Investment Plans
```

#### 6. 🏦 Get Mutual Fund Holdings
```typescript
// Tool: zerodha-mf-holdings
// Returns mutual fund portfolio (experimental)
```

## 🔧 Configuration

### 🔐 Token Management
The server automatically manages authentication tokens:
- 📁 Tokens are stored in `config/tokens.json`
- 🔄 Automatic token refresh on session expiry
- 🛡️ Secure token handling with error recovery

### ⚡ API Limits
- ⏱️ Zerodha has rate limits on API calls
- 🛠️ The server includes built-in error handling
- 📝 Failed requests are logged with detailed error information

## 🔒 Security

- **🔐 Environment Variables** - API credentials stored securely on your local machine
- **📝 Error Logging** - No sensitive data in error messages

## 📊 API Reference

### 🏢 Zerodha API Integration
The server uses Zerodha's official KiteConnect API:
- **📈 Trading** - Place orders, view holdings
- **💰 Mutual Funds** - SIP management and holdings
- **🔐 Authentication** - OAuth-based login flow

### 🤖 MCP Protocol
Implements the Model Context Protocol for AI assistant integration:
- **🛠️ Tool Definitions** - Structured parameter schemas
- **🛡️ Error Handling** - Graceful failure responses
- **🔒 Type Safety** - Zod schema validation

## 🧪 Development

### 📁 Project Structure
```
src/
├── main.ts              # Server entry point
├── config/
│   └── KiteConfig.ts    # Zerodha configuration
├── functions/
│   └── OrderRelated.ts  # Trading functions
└── utils/
    └── readWrite.ts     # File utilities
```

### 🛠️ Adding New Tools
1. 📝 Define the tool in `main.ts`
2. ⚙️ Implement the function in `functions/`
3. 🛡️ Add proper error handling
4. 📚 Update this README


## 🚨 Important Notes

### ⚠️ Trading Risks
- **💰 Real Money Trading** - This server executes real trades
- **⏰ Market Hours** - Orders only work during market hours
- **🛡️ Risk Management** - Implement proper stop-loss mechanisms
- **🧪 Testing** - Use paper trading for testing

### 🔧 API Limitations
- **⏱️ Rate Limits** - Respect Zerodha's API rate limits
- **🕐 Market Hours** - Some functions only work during trading hours
- **🏦 Account Type** - Requires a Zerodha trading account

## 🔧 Troubleshooting

### 🚨 Common Issues

#### 🔐 Authentication Errors
```bash
# Check if tokens are valid
cat config/tokens.json

# Re-authenticate if needed
# Use login-to-zerodha tool
```

#### ⚠️ API Errors
- 🔑 Verify API credentials in `.env`
- 🏦 Check Zerodha account status
- ⏰ Ensure market hours for trading functions

#### 🌐 Network Issues
- 📡 Check internet connection
- 🏢 Verify Zerodha API status
- 📝 Review error logs for details

#### 🤖 Claude MCP Connection Issues
- **🔍 Server Not Found**: Ensure the working directory path is correct
- **🛠️ Command Not Found**: Make sure `bun` is installed and in PATH
- **🔐 Authentication Failed**: Check environment variables are set correctly
- **⏰ Token Expired**: Re-authenticate using the login flow
- **🚫 Permission Denied**: Ensure the project folder has proper read/write permissions

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/new-tool`)
3. ⚙️ Implement your changes
4. 🛡️ Add proper error handling
5. 📚 Update documentation
6. 📤 Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is for educational and personal use only. Trading involves substantial risk of loss and is not suitable for all investors. The developers are not responsible for any financial losses incurred through the use of this software. 🛡️

## 🆘 Support

- **🐛 Issues** - Report bugs via GitHub Issues
- **📚 Documentation** - Check this README and code comments
- **🏢 Zerodha Support** - Contact Zerodha for API-related issues

## 🙏 Acknowledgments

- **🏢 Zerodha** - Trading platform and API
- **🤖 MCP SDK** - Model Context Protocol implementation
- **🔒 TypeScript** - Type safety and development experience

---

**Made by Manik Lakhanpal 🔥** 