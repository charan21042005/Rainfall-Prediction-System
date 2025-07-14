# Rainfall Prediction System
deploy - Link => https://weather-oracle-frontend.onrender.com/
## Overview
The "Rainfall Prediction System" is a machine learning-based project developed by the Algo Troopers team during the summer training program (June 22 - July 14, 2025) under the School of Computer Science and Engineering. This system predicts rainfall occurrence (`rain_tomorrow`: 0 for no rain, 1 for rain) using the 2024-2025 USA rainfall dataset, leveraging meteorological parameters such as `temperature`, `humidity`, `wind_speed`, `precipitation`, `cloud_cover`, and `pressure`. The project integrates a Decision Tree Classifier with 98% accuracy, a web-based interface, and a Power BI dashboard for visualization, offering real-time insights for agriculture, disaster management, and planning.

## Features
- **Accurate Prediction**: Achieves 98% accuracy in classifying `rain_tomorrow` using a Decision Tree Classifier.
- **Real-Time Interface**: Allows users to input weather data and receive instant predictions via a web dashboard.
- **Interactive Visualization**: Includes a Power BI dashboard to analyze rainfall trends, distributions, and regional patterns.
- **Comprehensive Analysis**: Utilizes Exploratory Data Analysis (EDA) to derive insights from the 70k+ row dataset.

## Repository Structure
Rainfall-Prediction-System/

├── data/                                   # Contains usa_rain_prediction_dataset_2024_2025.csv

├── docs/                                    # Project report and certificates

├── src/                                     # Source code (preprocessing.py, model_training.py, app.py)

├── outputs/                                 # Screenshots (web_dashboard.png, powerbi_dashboard.png)

├── README.md                                # This file

├── LICENSE                                  # License information

├── Rainfall_Prediction_Dashboard.pbix       # Power BI dashboard file



## Installation
1. **Clone the Repository**:
   - Download the ZIP file from this GitHub page or clone via `git clone https://github.com/yourusername/Rainfall-Prediction-System.git`.
   - Extract the ZIP file to your local machine.

2. **Install Dependencies**:
   - Navigate to the project folder locally.
   - Create a `requirements.txt` with dependencies: `pandas`, `numpy`, `scikit-learn`, `flask`.
   - Run `pip install -r requirements.txt` in your terminal or command prompt.

3. **Run the Flask Application**:
   - Navigate to the `src/` folder.
   - Execute `python app.py` in your terminal.
   - Access the web interface at `http://localhost:5000`.

4. **Open Power BI Dashboard**:
   - Double-click `Rainfall_Prediction_Dashboard.pbix` to open in Power BI Desktop.
   - Interact with the dashboard (requires Power BI Desktop installed).

## Usage
- **Web Interface**: Input weather parameters (e.g., `humidity`, `temperature`) to get `rain_tomorrow` predictions.
- **Power BI Dashboard**: Explore rainfall distributions, trends, and regional data using slicers for `location` and `date`.
- **Analysis**: Refer to the project report (`docs/76_CSE343_CSE443_Report_14_07_2025_05_18_46.docx`) for methodology and results.

## Workflow
The Algo Troopers followed a structured workflow to develop this project:
1. **Data Collection and Preparation**:
   - Acquired the `usa_rain_prediction_dataset_2024_2025.csv` with 70k+ rows.
   - Cleaned data in Power Query Editor (handled missing values, set data types: `date` as Date, `rain_tomorrow` as Whole Number, etc.).
2. **Exploratory Data Analysis (EDA)**:
   - Analyzed correlations between `humidity`, `precipitation`, and `rain_tomorrow` using Python (Pandas, Matplotlib).
   - Identified patterns and outliers in the dataset.
3. **Model Development**:
   - Built a Decision Tree Classifier using Scikit-learn, trained on 80% of the data, and validated with 20%.
   - Achieved 98% accuracy after hyperparameter tuning (e.g., max depth, min samples split).
4. **Web Development**:
   - Created a Flask-based web app (`app.py`) with HTML/CSS/JavaScript for real-time predictions.
   - Integrated the trained model for user inputs.
5. **Visualization**:
   - Designed a Power BI dashboard with:
     - Clustered Bar Chart for `rain_tomorrow` distribution.
     - Line Chart for `precipitation` trends over `date`.
     - Stacked Column Chart for average weather parameters by `location`.
     - Filled Map for geographical `rain_tomorrow` probability.
     - Card Visuals for key metrics.
   - Added `location` and `date` slicers for interactivity.
6. **Testing and Deployment**:
   - Tested the web app and dashboard with sample data.
   - Uploaded files to GitHub and saved the Power BI file locally (to be shared via link if >100MB).
7. **Documentation**:
   - Compiled a project report and updated this README with workflow and results.

## Results
- Achieved 98% accuracy with the Decision Tree Classifier on the `rain_tomorrow` prediction.
- Successfully integrated real-time prediction and interactive visualization components.
- Power BI dashboard effectively visualizes rainfall patterns across the USA.

## Challenges
- Handling the 70k+ row dataset’s performance in Power BI and Python.
- Ensuring seamless integration between the Flask backend and web frontend.
- Managing dataset imbalances (e.g., more 0s than 1s in `rain_tomorrow`) with resampling techniques.

## Learnings
- Gained expertise in data preprocessing, machine learning model optimization, and full-stack development.
- Developed skills in creating interactive Power BI dashboards and managing collaborative team projects.

## Future Improvements
- Incorporate additional weather variables (e.g., soil moisture).
- Explore advanced models (e.g., neural networks) for enhanced accuracy.
- Deploy the system on a cloud platform (e.g., Azure) for wider accessibility.

## License
This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute, with proper attribution.

## Acknowledgments
The Algo Troopers extend heartfelt gratitude to our mentor, Dr. [Mentor Name], Assistant Professor at the School of Computer Science and Engineering, for expert guidance. We thank the School for providing tools, datasets, and a supportive environment. Special thanks to teammates [Teammate 1 Name], [Teammate 2 Name], [Teammate 3 Name], and [Teammate 4 Name] for their collaborative efforts. Lastly, we acknowledge our families for their encouragement.

## Contact
For questions or contributions, open an issue on this repository or contact Tokachichu SriCharan at [tokachichusricharan2005@gmail.com].
