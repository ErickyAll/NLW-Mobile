
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';
import { Activity, CheckCircle } from 'phosphor-react-native'
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
interface Props extends ModalProps {
  discord: string;
  onClose: () => void
}

export function DuoMath({ discord, onClose, ...rest }: Props) {
  const [isCopy, setIsCopy] = useState(false)

  async function handleCopyDiscordUSer() {
    setIsCopy(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert("Discord Copiado1", "Usuário copiado para area de transferência")

    setIsCopy(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIcon}
          >
            <MaterialIcons
              name="close"
              size={22}
              color={THEME.COLORS.CAPTION_500}
            />

          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
          />

          <Heading
            style={{ alignItems: 'center', marginTop: 24 }}
            title="Let' PLay"
            subtitle='Agora é só começar a jogar!'
          />
          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity
            onPress={handleCopyDiscordUSer}
            style={styles.discordBtn}
            disabled={isCopy}
          >
            <Text style={styles.discord} >
              {isCopy ? <ActivityIndicator
                color={THEME.COLORS.PRIMARY}
              /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}