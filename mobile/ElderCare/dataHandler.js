// dataHandler.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class Data {
    constructor() {
        this.storageKey = 'eldersData';
        this.data = [];
        this.loadData();
    }

    async loadData() {
        try {
            const jsonValue = await AsyncStorage.getItem(this.storageKey);
            this.data = jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error loading data', e);
            this.data = [];
        }
    }

    async saveData() {
        try {
            const jsonValue = JSON.stringify(this.data);
            await AsyncStorage.setItem(this.storageKey, jsonValue);
        } catch (e) {
            console.error('Error saving data', e);
        }
    }

    getData() {
        return this.data;
    }

    async addData(id) {
        this.data.push({ id });
        await this.saveData();
    }

    async removeData(id) {
        this.data = this.data.filter((elder) => elder.id !== id);
        await this.saveData();
    }
}

export default Data;
