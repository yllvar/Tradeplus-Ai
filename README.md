# DeepSeek Chatbot

This project is a React Native/Expo chat application that integrates with the DeepSeek AI model using the Vercel AI SDK. It features a simple chat UI and streams responses from the DeepSeek model via a backend API route.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Environment Variables

You must create a `.env` file in the root of the project with the following content:

```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

Replace `your_deepseek_api_key_here` with your actual DeepSeek API key.

### Installation

1. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

2. Start the Expo development server:
   ```sh
   npx expo start
   # or
   npm run start
   # or
   yarn start
   ```

### Usage

- The chat UI is the main screen of the app.
- Messages are sent to the DeepSeek model via the `/app/api/chat+api.ts` endpoint.
- The API key is required for all requests to the DeepSeek model.

### Additional Notes

- Make sure your `.env` file is **not** committed to version control.
- If you use other providers or features, you may need to add additional environment variables as required by those services.

## License

MIT
