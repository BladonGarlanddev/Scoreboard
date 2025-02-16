import { useTheme, DefaultTheme } from 'react-native-paper';
import { View, StyleProp, ViewStyle } from 'react-native';

type ThemedContainerProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

const ThemedContainer: React.FC<ThemedContainerProps> = ({ style, children }) => {
    const theme = useTheme<typeof DefaultTheme>();
    return (
    <View style={style}>
      {children}
    </View>
  );
}

export default ThemedContainer;