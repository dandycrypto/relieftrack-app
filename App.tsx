import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const PWA_URL = 'https://relieftrack.dysolvit.com';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
      <WebView source={{ uri: PWA_URL }} startInLoadingState javaScriptEnabled />
    </View>
  );
}
