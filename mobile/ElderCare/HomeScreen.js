import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';

export default function HomeScreen() {
    const [eldersData, setEldersData] = useState([]);
    const previousActivityRef = useRef({}); // Track previous activity states

    useEffect(() => {
        // Function to fetch elder data
        const fetchEldersData = () => {
            fetch('http://192.168.10.7:5000/get_elders') // Replace with your local IP
                .then((response) => response.json())
                .then((data) => {
                    // Check for activity change to 'Shuffling'
                    data.forEach((elder) => {
                        const prevActivity =
                            previousActivityRef.current[elder.id];
                        if (
                            prevActivity &&
                            prevActivity !== 'Shuffling' &&
                            elder.activity === 'Shuffling'
                        ) {
                            Alert.alert(
                                'Alert',
                                `${elder.name} has started shuffling.`
                            );
                        }
                        // Update previous activity state
                        previousActivityRef.current[elder.id] = elder.activity;
                    });
                    setEldersData(data);
                })
                .catch((error) =>
                    console.error('Error fetching elders data:', error)
                );
        };

        // Fetch data immediately
        fetchEldersData();

        // Set up interval to fetch data every second
        const intervalId = setInterval(fetchEldersData, 1000); // 1000ms = 1s

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleRemove = (id) => {
        const apiUrl = `http://192.168.10.7:5000/remove_elder/${id}`;
        fetch(apiUrl, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to remove elder.');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    setEldersData(
                        eldersData.filter((elder) => elder.id !== id)
                    );
                    Alert.alert('Success', data.message);
                } else {
                    Alert.alert('Error', 'Failed to remove elder.');
                }
            })
            .catch((error) => {
                Alert.alert('Server Error', error.message);
            });
    };

    const renderActivityIcon = (activity) => {
        switch (activity) {
            case 'Walking':
                return (
                    <Image
                        source={require('./assets/walking.png')}
                        style={styles.icon}
                    />
                );
            case 'Shuffling':
                return (
                    <Image
                        source={require('./assets/shuffling.png')}
                        style={styles.icon}
                    />
                );
            case 'Stairs (asce)':
                return (
                    <Image
                        source={require('./assets/stairs_ascending.png')}
                        style={styles.icon}
                    />
                );
            case 'Stairs (desc)':
                return (
                    <Image
                        source={require('./assets/stairs_descending.png')}
                        style={styles.icon}
                    />
                );
            case 'Standing':
                return (
                    <Image
                        source={require('./assets/standing.png')}
                        style={styles.icon}
                    />
                );
            case 'Sitting':
                return (
                    <Image
                        source={require('./assets/sitting.png')}
                        style={styles.icon}
                    />
                );
            case 'Lying':
                return (
                    <Image
                        source={require('./assets/lying.png')}
                        style={styles.icon}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./assets/logo.png')} // Replace with your logo path
                    style={styles.logo}
                />
                <Text style={styles.appName}>ElderCare+</Text>
                <Text style={styles.slogan}>Caring for Every Step</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {eldersData.map((elder) => (
                        <View
                            key={elder.id}
                            style={[
                                styles.tile,
                                elder.activity === 'Shuffling' &&
                                    styles.shufflingTile,
                            ]}>
                            <Text style={styles.elderName}>{elder.name}</Text>
                            {renderActivityIcon(elder.activity)}
                            <View style={styles.activityContainer}>
                                <Text style={styles.activityText}>
                                    {elder.activity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemove(elder.id)} // Handle removal
                            >
                                <Image
                                    source={require('./assets/remove.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F9',
    },
    header: {
        flex: 0.3, // Occupies 30% of the screen height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D328C',
        padding: 20,
        borderBottomRightRadius: 30,
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
        flex: 0.7,
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    tile: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    shufflingTile: {
        borderColor: '#FF1B08', // Red color for shuffling
    },
    elderName: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        marginRight: 10, // Add margin to the right of the elder name
    },
    activityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        marginLeft: 5,
    },
    activityText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },
    removeButton: {
        padding: 5,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});
