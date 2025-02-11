# Brain Tumor Detection Using VGG16

## Overview
This project uses the VGG16 deep learning model to detect brain tumors from MRI scans. It classifies brain scans as tumor-positive or tumor-negative, with the goal of assisting healthcare professionals in early diagnosis. The system leverages data augmentation to improve model performance and deploys the trained model through a REST API for easy integration with real-time applications.

Features
- Deep Learning Model: Utilizes the VGG16 model for tumor classification.
- Data Augmentation: Enhances dataset variability to improve model robustness.
- REST API: Deployed using Flask, providing an easy way to interact with the model.
- Web Interface: A user-friendly React-based front-end to upload scans and view results instantly.
- Instant Predictions: Quick tumor detection to support informed medical decision-making.
- PDF Report Generation: After the image analysis, a detailed PDF report is created with the prediction results for easy download.

### Dataset Organization for Brain Tumor Classification

To use the `Brain_Tumor.ipynb` notebook for training and testing a classification model, your dataset should be organized as described below. You can use any dataset you have access to, with subdirectories representing the classes (e.g., different tumor types or a "no tumor" class).

### Dataset Structure

The dataset should have a base directory with two main subfolders: `Training` and `Testing`. Each folder should contain subdirectories corresponding to the classes.

Example Structure

```
Brain_Tumor_Data/
├── Training/
│   ├── Class1/   # e.g., no_tumor
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   ├── Class2/   # e.g., pituitary_tumor
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   └── ClassN/   # Additional classes if applicable
│       ├── image1.jpg
│       ├── image2.jpg
│       └── ...
├── Testing/
│   ├── Class1/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   ├── Class2/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   └── ClassN/
│       ├── image1.jpg
│       ├── image2.jpg
│       └── ...
```

### Augmented Dataset

If data augmentation is applied, you can create an additional directory to store augmented images. The structure should mirror the original dataset, with separate subdirectories for each class.

Example Augmented Dataset Structure

```
Brain_Tumor_Data/
├── Augmented_Data/
│   ├── Training/
│   │   ├── Class1/
│   │   │   ├── augmented_image1.jpg
│   │   │   ├── augmented_image2.jpg
│   │   │   └── ...
│   │   ├── Class2/
│   │   │   ├── augmented_image1.jpg
│   │   │   ├── augmented_image2.jpg
│   │   │   └── ...
│   │   └── ClassN/
│   │       ├── augmented_image1.jpg
│   │       ├── augmented_image2.jpg
│   │       └── ...
```

## Get Started

### Install dependencies

```
pip install -r requirements.txt
```

## Start the server

Open a new terminal and run the following command:

```
waitress-serve --port=5000 app:app
```

## Start the web application

Open a new terminal and run the following commands:

```
cd client
```

### Install dependencies
```
npm install
```

### Start the React application
```
npm start
```

