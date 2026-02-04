# Offline Notes App 📝

A beautiful, fast, and private offline notes application built with React Native and Expo. Seamlessly capture your thoughts with text, images, and location tags.

## ✨ Features

- **Offline First**: All data is stored locally on your device for instant access and privacy.
- **Rich Notes**:
  - **Title & Description**: Organize thoughts clearly.
  - **Images**: Attach photos from your gallery.
  - **Location**: Tag notes with your current location.
- **Pin Notes**: Pin important notes to the top of your list for quick access.
- **User Profile**:
  - Personalized profile with avatar, name, and email.
  - **Edit Profile**: Update your details anytime.
- **Premium UI/UX**:
  - Custom Splash Screen with animations.
  - Modern, clean design with a curated color palette.
  - Smooth transitions and interactive elements.

## 📱 Screens

1. **Splash Screen**: Animated logo intro with auto-login check.
2. **Profile Setup**: Create or edit your user identity.
3. **Home**: View your list of notes, sorted by pinned status and date.
4. **Add Note**: A dedicated editor with title/description inputs and media tools.
5. **Profile**: View account details and manage settings.

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack & Bottom Tabs)
- **Storage**: AsyncStorage (Persistent offline data)
- **Native Features**:
  - `expo-image-picker` (Media access)
  - `expo-location` (Geolocation)
  - `expo-splash-screen` (Launch experience)
- **Icons**: Ionicons (@expo/vector-icons)

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the App**
   ```bash
   npx expo start
   ```

3. **Run on Device**
   - Scan the QR code with the **Expo Go** app (Android/iOS).
   - Or press `a` for Android Emulator / `i` for iOS Simulator.

## 🎨 Design

The app features a custom design system with:
- **Primary Color**: Deep Purple/Pink gradient style.
- **Surface**: Clean white cards with soft shadows.
- **Typography**: Modern and readable fonts.

---

*Built with ❤️ using Expo.*
