import { Image, FlatList } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native'

export function Home() {

    const [games, setGames] = useState<GameCardProps[]>([])
    const navigation = useNavigation();

    function handleCardClick({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', {id, title, bannerUrl})
    }

    useEffect(() => {
        fetch("http://192.168.2.134:3333/games")
            .then(data => data.json())
            .then(data => setGames(data))
    })

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Heading
                    title='Encontre seu duo!'
                    subtitle='Selecione o game que deseja jogar...'
                />

                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            data={item}
                            onPress={() => handleCardClick(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    );
}