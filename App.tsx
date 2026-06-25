import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

const PWA_URL = 'https://relieftrack.duckdns.org';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <WebView
        source={{ uri: PWA_URL }}
        style={styles.webview}
        startInLoadingState
        allowsBackForwardNavigationGestures
        geolocationEnabled
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
