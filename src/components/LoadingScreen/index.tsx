import { View } from "react-native";
import { Loading } from "../Loading";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loading styles={{ width: 100, height: 100 }} />
    </View>
  );
};
