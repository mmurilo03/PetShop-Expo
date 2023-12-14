import { ActivityIndicator, DimensionValue, View } from "react-native"
import { defaultTheme } from "../../global/styles/themes"

interface Props {
    styles: {width: DimensionValue | undefined, height: DimensionValue | undefined}
}

export const Loading = ({styles}: Props) => {
    return (
        <View style={styles}>
            <ActivityIndicator size={"large"} color={defaultTheme.COLORS.blueSecond}/>
        </View>
    )
}