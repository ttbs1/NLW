import { TouchableOpacity, View, Text } from 'react-native';
import { AdProps } from '../../sceens/Game';

import { styles } from './styles';
import { THEME } from '../../theme';
import { GameController } from 'phosphor-react-native'

import { DuoInfo } from '../DuoInfo';

type Props = {
    data: AdProps;
    onClick: () => void;
}

export function DuoCard({ data, onClick }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo label='Nome' value={data.name} />
            <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} ${data.yearsPlaying == 1 ? "ano" : "anos"}`} />
            <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} ${data.weekDays.length == 1 ? "dia" : "dias"} \u2022 ${data.hourStart} - ${data.hourEnd}`} />
            <DuoInfo label='Chamada de áudio?' value={data.useVoiceChannel ? "Sim" : "Não"} colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />

            <TouchableOpacity 
                style={styles.button}
                onPress={onClick}
            >
                <GameController 
                    color={THEME.COLORS.TEXT}
                    size={20}
                />
                <Text style={styles.buttonTitle}>
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    );
}