import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext.js'

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
