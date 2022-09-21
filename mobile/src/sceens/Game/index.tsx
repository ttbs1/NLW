import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';

export type AdProps = {
    hourEnd: string,
    hourStart: string,
    id: string,
    name: string,
    useVoiceChannel: boolean,
    weekDays: string[]
    yearsPlaying: number
}

export function Game() {

    const navigation = useNavigation();

    const route = useRoute();
    const game = route.params as GameParams;

    function handleGoBack() {
        navigation.goBack();
    }

    const [ads, setAds] = useState<AdProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('')

    async function getUserDiscord(adsId: string) {
        fetch(`http://192.168.2.134:3333/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setDiscordDuoSelected(data.discord))
    }

    useEffect(() => {
        fetch(`http://192.168.2.134:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setAds(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>
                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right} />
                </View>
                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />
                <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
                <FlatList
                    data={ads}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onClick={() => getUserDiscord(item.id)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={styles.contentList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => <Text style={styles.emptyListText}>Não há anúncios publicados por aqui.</Text>}
                />


                <DuoMatch discord={discordDuoSelected} visible={discordDuoSelected ? true : false} onClose={() => setDiscordDuoSelected('')} />
            </SafeAreaView>
        </Background>
    );
}