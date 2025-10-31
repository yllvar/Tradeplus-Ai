# TradePlus AI

<div align="center">
  <img src="https://img.freepik.com/free-vector/chatbot-concept-illustration_114360-5622.jpg" width="800" alt="TradePlus AI Banner">
  
  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![DeepSeek](https://img.shields.io/badge/DeepSeek-181A20?style=for-the-badge&logo=openai&logoColor=white)](https://deepseek.com/)
</div>

## 🌟 AI-Powered Trading Assistant

TradePlus AI is a modern, cross-platform trading assistant that combines DeepSeek AI's intelligence with trading capabilities. Built with React Native and Expo, it provides a seamless experience for traders across mobile and web platforms with real-time market data and AI-powered insights.

### ✨ Features

- **AI-Powered Conversations**: Seamless integration with DeepSeek's advanced language model
- **Real-time Streaming**: Experience fluid, real-time responses from the AI
- **Cross-Platform**: Works on iOS, Android, and web
- **Modern UI/UX**: Clean, responsive interface with smooth animations
- **Dark/Light Mode**: Built-in theme support for comfortable usage
- **Message History**: View and continue previous conversations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cloudwalk-chat.git
   cd cloudwalk-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your DeepSeek API key:
   ```env
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

   > **Note**: Get your API key from [DeepSeek's platform](https://platform.deepseek.com/).

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Run on your preferred platform:
   ```bash
   # For iOS
   npx expo start --ios
   
   # For Android
   npx expo start --android
   
   # For web
   npx expo start --web
   ```

## 🛠️ Project Structure

```
tradeplus-ai/
├── app/                  # App routes and navigation
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── chat.tsx      # Main chat interface
│   │   └── index.tsx     # Home screen
│   ├── api/              # API routes
│   │   └── chat+api.ts   # DeepSeek AI integration
│   └── _layout.tsx       # Root layout
├── components/           # Reusable UI components
│   ├── ChatInput.tsx     # Message input component
│   └── MessageBubble.tsx # Chat message component
├── constants/            # App constants and theme
└── hooks/                # Custom React hooks
```

## 🤖 API Integration

The application uses the DeepSeek API for AI-powered conversations. The API key is securely stored in your local environment and never exposed to the client.

## 📱 Running on Mobile

1. **iOS Simulator**: Requires Xcode and a Mac
2. **Android Emulator**: Requires Android Studio
3. **Physical Device**: Use the Expo Go app (iOS/Android)

## 🚀 Deployment

### Web Deployment
```bash
npx expo export:web
npx serve web-build
```

### App Store / Play Store
Follow the [Expo deployment guide](https://docs.expo.dev/distribution/publishing-websites/) for publishing to app stores.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ using React Native, Expo, and DeepSeek AI
</div>   # or
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
