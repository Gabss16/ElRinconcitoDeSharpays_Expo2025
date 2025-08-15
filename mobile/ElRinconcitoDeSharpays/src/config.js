import { Platform } from "react-native";

// Puedes cambiar esta IP según el entorno
const LOCAL_IP = "192.168.56.1";
const ANDROID_IP = "10.10.1.141";

export const API_HOST =
  Platform.OS === "android"
    ? `http://${ANDROID_IP}:4000`
    : `http://${LOCAL_IP}:4000`;

export const API_URL = `${API_HOST}/api`;
