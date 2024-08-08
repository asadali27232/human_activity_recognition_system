import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';

export default function ConnectDeviceScreen() {
    const [loading, setLoading] = useState(false);

    const handleConnect = () => {
        setLoading(true);
        // Simulate searching process with a delay
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Device Not Found',
                'No accelerometer device was found. Please ensure the device is turned on, in range, and try again.',
                [
                    { text: 'Retry', onPress: () => handleConnect() },
                    { text: 'Cancel' },
                ],
                { cancelable: false }
            );
        }, 3000); // Simulate a 3-second search process
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./assets/logo.png')} // Replace with your logo path
                    style={styles.logo}
                />
                <Text style={styles.appName}>ElderCare+</Text>
                <Text style={styles.slogan}>Connect Your Accelerometer</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>
                    Connect to an actual accelerometer device to monitor real
                    elder person activity. Ensure the device is powered on and
                    within range.
                </Text>
                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>
                        To connect your accelerometer:
                    </Text>
                    <Text style={styles.instructionItem}>
                        1. Make sure your device is turned on.
                    </Text>
                    <Text style={styles.instructionItem}>
                        2. Ensure your device is Bluetooth or WiFi enabled.
                    </Text>
                    <Text style={styles.instructionItem}>
                        3. Place the accelerometer close to your phone.
                    </Text>
                    <Text style={styles.instructionItem}>
                        4. Press the "Connect" button to start.
                    </Text>
                </View>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#2D328C"
                        style={styles.spinner}
                    />
                ) : (
                    <TouchableOpacity
                        style={styles.connectButton}
                        onPress={handleConnect}>
                        <Text style={styles.buttonText}>Connect</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F9', // Light gray background for the entire screen
    },
    header: {
        flex: 0.3, // Occupies 30% of the screen height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D328C', // Blue background for the header
        padding: 20,
        borderBottomRightRadius: 30, // Rounded corners for a better look
        borderBottomLeftRadius: 30,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    appName: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
    },
    slogan: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    content: {
        flex: 0.7, // Occupies the remaining space
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    description: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    instructionContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#2D328C',
        borderWidth: 1,
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 18,
        color: '#2D328C',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    instructionItem: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    connectButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF1B08', // Red background for the button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    spinner: {
        marginVertical: 20,
    },
});
