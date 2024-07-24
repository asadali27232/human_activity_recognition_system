
from flask import Flask, request, jsonify, render_template, url_for, redirect
import pandas as pd
import numpy as np
import threading
import time
import uuid
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import LSTM
from tensorflow.keras.initializers import Orthogonal

app = Flask(__name__, static_url_path='/static')

# Define a custom LSTM class to handle the 'time_major' argument
class CustomLSTM(LSTM):
    def __init__(self, units, **kwargs):
        if 'time_major' in kwargs:
            kwargs.pop('time_major')
        super().__init__(units, **kwargs)

# Register the custom objects
custom_objects = {'Orthogonal': Orthogonal, 'LSTM': CustomLSTM}

# Load the saved LSTM model with custom objects
loaded_model = load_model(
    "D:/Semester 7/Human_activity_recognition_system/models/lstm_model.h5",
    custom_objects=custom_objects
)

# Dictionary to store results and threads for each file
results = {}
threads = {}
stop_signals = {}

labels_dic = {1:'walking', 3:'shuffling', 4:'stairs (ascending)', 5:'stairs (descending)', 6:'standing', 7:'sitting', 8:'lying'}
labels_key = list(labels_dic.keys())  # Convert to list, to make it easy to present through graph

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        df = pd.read_csv(file)
        file_id = str(len(results) + 1)  # Sequential file ID
        results[file_id] = []
        stop_signals[file_id] = False
        thread = threading.Thread(target=predict_labels, args=(file_id, df))
        threads[file_id] = thread
        thread.start()
        return jsonify({"message": f"File uploaded successfully. Your file ID is {file_id}"}), 200

@app.route('/stop', methods=['POST'])
def stop_prediction():
    file_id = request.json.get('file_id')
    if file_id in stop_signals:
        stop_signals[file_id] = True
        return jsonify({"message": "Prediction stopped for file", "file_id": file_id}), 200
    else:
        return jsonify({"error": "Invalid file_id"}), 400

@app.route('/results/<file_id>', methods=['GET'])
def get_results(file_id):
    if file_id in results:
        return render_template('results.html', file_id=file_id, results=results[file_id], labels_dic=labels_dic)
    else:
        return jsonify({"error": "Invalid file_id"}), 400

def predict_labels(file_id, df):
    global stop_signals
    df = df.drop("timestamp", axis=1)  # Drop timestamp column if present
    data = np.array(df)
    
    for index, row in enumerate(data):
        if stop_signals[file_id]:
            break
        row_reshaped = row.reshape(1, -1)  # Reshape the row for prediction
        prediction = loaded_model.predict(row_reshaped)
        predicted_label = labels_key[np.argmax(prediction)]
        results[file_id].append({"row": index, "label": predicted_label})
        print(labels_dic[predicted_label])
        time.sleep(1)  # Delay for 1 second

if __name__ == '__main__':
    app.run(debug=True)


