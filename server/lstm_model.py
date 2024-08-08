import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import LSTM
from tensorflow.keras.initializers import Orthogonal

# Your CustomLSTM and LSTMModel classes should be included here


class CustomLSTM(LSTM):
    def __init__(self, units, **kwargs):
        if 'time_major' in kwargs:
            kwargs.pop('time_major')
        super().__init__(units, **kwargs)


class LSTMModel:
    def __init__(self, model_path, labels_dic):
        self.model_path = model_path
        self.labels_dic = labels_dic
        self.labels_key = list(labels_dic.keys())
        self.model = self.load_model()

    def load_model(self):
        custom_objects = {'Orthogonal': Orthogonal, 'LSTM': CustomLSTM}
        model = load_model(self.model_path, custom_objects=custom_objects)
        return model

    def preprocess_data(self, data):
        if 'timestamp' in data.columns:
            data = data.drop('timestamp', axis=1)
        data_array = np.array(data)
        return data_array

    def predict(self, new_data):
        preprocessed_data = self.preprocess_data(new_data)
        predictions = self.model.predict(preprocessed_data)
        predicted_labels = [self.labels_key[np.argmax(
            prediction)] for prediction in predictions]
        return [self.labels_dic[label] for label in predicted_labels]

    def predict_and_save(self, input_csv, output_csv):
        new_data = pd.read_csv(input_csv)
        predictions = self.predict(new_data)
        prd = pd.DataFrame()
        prd['predicted_label'] = predictions
        prd.to_csv(output_csv, index=False)
