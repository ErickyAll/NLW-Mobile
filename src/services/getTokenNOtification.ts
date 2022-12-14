import * as Notifications from 'expo-notifications'

export async function getTokenNotification() {
  const { granted } = await Notifications.getPermissionsAsync()

  if (!granted) {
    await Notifications.requestPermissionsAsync()
  }

  if (granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync()
    console.log('Notification token =>', pushToken.data)

    return pushToken.data
  }
}
