# Elderly Human Recognition System
This project is an Elderly Human Recognition System.Human Activity Recognition 70+ (HAR70+) dataset is a professionally-annotated dataset containing 18 fit-to-frail older-adult subjects (70-95 years old) wearing two 3-axial accelerometers for around 40 minutes during a semi-structured free-living protocol. The sensors were attached to the right thigh and lower back. The Project designed to handle the uploading of files of patients data , stop predictions, and retrieve results through a web interface. The system uses Flask for the backend and HTML/CSS with JavaScript for the frontend.

## Table of Contents
- [Machine learning](#machine-learning)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Machine learning
### Data Collection and Cleaning

- Collected multiple CSV files containing accelerometer data.
- Loaded data into Pandas DataFrames and cleaned by removing duplicates and unnecessary columns (e.g., timestamps).

### Data Exploration and Visualization

- Visualized activity distribution using pie charts and bar plots to understand data balance.
- Explored relationships between variables through scatter plots and correlation matrices.

### Model Training and Evaluation

- Split data into training and testing sets.
- Trained classifiers (Logistic Regression, Decision Trees, Random Forests) and evaluated using metrics (accuracy, confusion matrices).
- Tuned hyperparameters for better model performance.

### Model Persistence

- Saved the best model (Random Forest) using joblib for future use.

### Prediction on New Data

- Demonstrated how to load the saved model and make predictions on new accelerometer data.

### LSTM Model Training

- Implemented an LSTM model using TensorFlow/Keras for sequence data.
- Trained the LSTM model, monitored performance metrics (e.g., loss, accuracy).

## Installation

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/HaroonMalik771/Human_activity_recognition_system.git
   
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask application:
    ```bash
    python app.py
    ```

5. Open your web browser and go to `http://127.0.0.1:5000/`.

## Usage

### Upload a File
1. Click on the "Choose File" button in the "Upload a File" section.
2. Select a CSV file from your local machine.
3. Click on the "Upload" button. A popup message will display "Your file is uploaded successfully."

### Stop Prediction
1. Enter the File ID in the "Stop Prediction" section.
2. Click on the "Stop" button to stop the prediction for the entered File ID.

### Get Results
1. Enter the File ID in the "Get Results" section.
2. Click on the "Get Results" button to be redirected to the results page.

## Folder Structure

```
project-root/
│
├── models/
│   └── lstm_model.h5             # Saved LSTM model
│
├── test_data/
│   └── new.csv                   # Example test data file
│
├── web/
│   ├── static/
│   │   └── images/
│   │       └── Screenshot.png    # Placeholder image
│   │
│   ├── templates/
│   │   ├── index.html            # HTML template for main interface
│   │   └── results.html          # HTML template for results page
│   │
│   ├── app.py                    # Main Flask application
│   └── requirements.txt          # List of Python packages required
│
└── README.md                     # Project README file
```

