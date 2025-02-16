import React from 'react'
import { Button, useTheme, ButtonProps, DefaultTheme } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native";

type ThemedButtonProps = ButtonProps & {
    type?: string
  style?: StyleProp<ViewStyle>;
};

const ThemedButton: React.FC<ThemedButtonProps> = ({type, style, ...props}) => {
    const theme = useTheme<typeof DefaultTheme>()
    if (type === "primary") {
        return (
          <Button
            mode="contained"
            style={[{ backgroundColor: theme.colors.primary }, style]}
            {...props}
          >
            Press me
          </Button>
        );
    } else if (type === "secondary") {
        return (
          <Button
            mode='outlined'
            style={[{ backgroundColor: theme.colors.primary }, style]}
            {...props}
          >
            Press me
          </Button>
        );
    } else {
        return (
          <Button
            mode='text'
            style={[{ backgroundColor: theme.colors.primary }, style]}
            {...props}
          >
            Press me
          </Button>
        );
    }
    
    
}

export default ThemedButton