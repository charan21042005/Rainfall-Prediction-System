from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
model = joblib.load('final_decision_tree_model_all_locations.pkl')
scaler = joblib.load('scaler_all_locations.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not all(key in data for key in ['humidity', 'windSpeed', 'precipitation', 'location']):
            return jsonify({'error': 'Missing required fields'}), 400

        # Prepare feature array: [Humidity, Wind Speed, Precipitation] + 20 Location dummies
        features = np.array([[data['humidity'], data['windSpeed'], data['precipitation']] +
                             [1 if data['location'] == loc else 0 for loc in [
                                 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
                                 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
                                 'Fort Worth', 'Columbus', 'Indianapolis', 'Charlotte', 'San Francisco',
                                 'Seattle', 'Denver', 'Washington D.C.'
                             ]]])

        # Scale the features
        features_scaled = scaler.transform(features)

        # Get prediction and probability
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]

        return jsonify({
            'prediction': 'Yes' if prediction == 1 else 'No',
            'probability_yes': float(probabilities[1])  # Probability of Yes class
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)