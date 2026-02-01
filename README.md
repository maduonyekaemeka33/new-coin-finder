# Jupiter Swap Web App

A web interface to swap Solana tokens directly via Jupiter, with Phantom Wallet integration.

## Features
- Connect Phantom Wallet
- Get swap quotes from Jupiter
- Execute token swaps securely

## Serverless Functions

### api/swap.js

**Purpose:** Serverless endpoint to execute token swaps via Jupiter on the Solana blockchain.

### Description
This serverless function handles the backend logic for executing Solana token swaps using the Jupiter API. It receives a swap route and the user’s public key from the frontend, constructs the swap transaction, and returns it in a format the user’s wallet (e.g., Phantom) can sign and send to the blockchain.

### How it works
1. Accepts only **POST requests**. Other methods return `405 Method Not Allowed`.
2. Expects a JSON body with:
   - `route` → the swap route from Jupiter’s quote API
   - `userPublicKey` → the wallet public key of the user
3. Calls Jupiter’s swap API endpoint (`https://quote-api.jup.ag/v6/swap`) with `wrapUnwrapSOL: true`.
4. Returns the **serialized swap transaction** (`swapTransaction`) to the frontend.
5. **No private keys or funds** are stored on the server — the user must sign the transaction in their wallet.

### Security Notes
- Non-custodial: this server cannot move funds by itself.
- All transactions require explicit user approval via their wallet.
- The server only generates the transaction; signing happens in the browser.

### Usage Example
```js
const response = await fetch("/api/swap", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ route, userPublicKey })
});

const { swapTransaction } = await response.json();
