import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddElderScreen() {
    const [selectedElder, setSelectedElder] = useState('1'); // Default to '1'
    const [loading, setLoading] = useState(false); // State for loading

    const handleAdd = () => {
        // Construct the API URL
        const apiUrl = 'http://192.168.10.9:5000/add_elder'; // Replace with your server URL

        // Set loading to true
        setLoading(true);

        // Make the API request to add an elder
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: selectedElder }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Show success message
                Alert.alert('Success', data.message);
            })
            .catch((error) => {
                // Show error message
                Alert.alert('Error', 'Failed to add elder. Please try again.');
            })
            .finally(() => {
                // Set loading to false
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./assets/logo.png')} // Replace with your logo path
                    style={styles.logo}
                />
                <Text style={styles.appName}>ElderCare+</Text>
                <Text style={styles.slogan}>Add New Elder Person</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>
                    Select an elder from the list below to admit into
                    ElderCare+.
                </Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedElder}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            setSelectedElder(itemValue)
                        }>
                        <Picker.Item label="Elder 1" value="1" />
                        <Picker.Item label="Elder 2" value="2" />
                        <Picker.Item label="Elder 3" value="3" />
                        <Picker.Item label="Elder 4" value="4" />
                        <Picker.Item label="Elder 5" value="5" />
                        <Picker.Item label="Elder 6" value="6" />
                        <Picker.Item label="Elder 7" value="7" />
                        <Picker.Item label="Elder 8" value="8" />
                        <Picker.Item label="Elder 9" value="9" />
                        <Picker.Item label="Elder 10" value="10" />
                        <Picker.Item label="Elder 11" value="11" />
                        <Picker.Item label="Elder 12" value="12" />
                        <Picker.Item label="Elder 13" value="13" />
                        <Picker.Item label="Elder 14" value="14" />
                        <Picker.Item label="Elder 15" value="15" />
                        <Picker.Item label="Elder 16" value="16" />
                        <Picker.Item label="Elder 17" value="17" />
                        <Picker.Item label="Elder 18" value="18" />
                    </Picker>
                </View>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#FF1B08"
                        style={styles.loader}
                    />
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAdd}
                        disabled={loading}>
                        <Text style={styles.buttonText}>Add Elder</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.footerHeading}>Need Assistance?</Text>
                <Text style={styles.footerText}>
                    If you need help with adding an elder, click the dropdown to
                    open a list of available elder persons then select one
                    elder.
                </Text>
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
    pickerContainer: {
        width: '100%',
        borderColor: '#2D328C',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
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
    footerHeading: {
        fontSize: 20,
        color: '#2D328C',
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 10,
    },
    loader: {
        marginTop: 20,
    },
});
