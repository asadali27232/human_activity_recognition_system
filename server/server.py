from flask import Flask, jsonify, request
from flask_cors import CORS
from threading import Thread
import pandas as pd
import os
import time

from lstm_model import LSTMModel  # Import the LSTMModel class

app = Flask(__name__)
CORS(app)  # Enable CORS

# Path to the directory containing elder CSV files
ELDER_FILES_DIR = 'elders_live'

# Initialize the elders data and the current row indices
elders_data = []
current_indices = {}

def update_elders_data():
    global elders_data, current_indices
    while True:
        new_elders_data = []
        for file_name in os.listdir(ELDER_FILES_DIR):
            if file_name.endswith('.csv'):
                elder_id = file_name.split('.')[0]
                file_path = os.path.join(ELDER_FILES_DIR, file_name)

                # Read the CSV file
                df = pd.read_csv(file_path)

                # Check if the DataFrame is not empty
                if not df.empty:
                    # Initialize the current index if not already
                    if elder_id not in current_indices:
                        current_indices[elder_id] = 0

                    # Get the current index and activity
                    current_index = current_indices[elder_id]

                    # Ensure the index is within the bounds of the DataFrame
                    if current_index < len(df):
                        current_activity = df['predicted_label'].iloc[current_index].capitalize(
                        )
                        new_elders_data.append({
                            'id': elder_id,
                            'name': f'Elder {elder_id}',
                            'activity': current_activity
                        })

                        # Update the index for the next step
                        current_indices[elder_id] = (
                            current_index + 1) % len(df)
                    else:
                        print(f"Index {current_index} is out of bounds for {
                              file_name}")

        elders_data = new_elders_data
        time.sleep(0.1)  # Update every second


@app.route('/get_elders', methods=['GET'])
def get_elders():
    return jsonify(elders_data)


@app.route('/add_elder', methods=['POST'])
def add_elder():
    data = request.json
    elder_id = data.get('id')

    if not elder_id:
        return jsonify({'error': 'Elder ID is required'}), 400

    file_path = os.path.join('data', f'{elder_id}.csv')
    output_path = os.path.join(ELDER_FILES_DIR, f'{elder_id}.csv')

    if os.path.isfile(output_path):
        return jsonify({'message': f'Elder {elder_id} already exsist.'}), 200

    if not os.path.isfile(file_path):
        return jsonify({'error': f'Input file for elder {elder_id} not found'}), 404

    # Define the labels dictionary
    labels_dic = {
        1: 'Walking',
        3: 'Shuffling',
        4: 'Stairs (asce)',
        5: 'Stairs (desc)',
        6: 'Standing',
        7: 'Sitting',
        8: 'Lying'
    }

    model_path = 'model.h5'

    # Create an instance of the LSTMModel class
    lstm_model = LSTMModel(model_path, labels_dic)

    # Predict and save to the output CSV
    lstm_model.predict_and_save(file_path, output_path)

    return jsonify({'message': f'Elder {elder_id} Admitted to ElderCare+'}), 200


@app.route('/remove_elder/<id>', methods=['DELETE'])
def remove_elder(id):
    global elders_data, current_indices

    file_path = os.path.join(ELDER_FILES_DIR, f'{id}.csv')

    if os.path.isfile(file_path):
        os.remove(file_path)

        # Remove elder from elders_data and current_indices
        elders_data = [elder for elder in elders_data if elder['id'] != id]
        if id in current_indices:
            del current_indices[id]

        return jsonify({'message': f'Elder {id} removed successfully!'}), 200
    else:
        return jsonify({'error': f'Elder {id} not found'}), 404


if __name__ == '__main__':
    # Start the background thread
    thread = Thread(target=update_elders_data)
    thread.daemon = True
    thread.start()

    # Make the server accessible externally
    app.run(debug=True, host='0.0.0.0')
