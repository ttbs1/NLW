import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export type GameCardProps = {
    id: string;
    title: string;
    _count: {
        ads: number;
    }
    bannerUrl: string;
}

type Props = TouchableOpacityProps & {
    data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground
                style={styles.cover}
                source={{ uri: data.bannerUrl }}
            >

                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >
                    <Text style={styles.name}>
                        {data.title}
                    </Text>
                    <Text style={styles.ads}>
                        {data._count.ads} {data._count.ads == 1 ? "anúncio":"anúncios"}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}