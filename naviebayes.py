import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

# Load the Iris dataset
iris = load_iris()
data = pd.DataFrame(data=iris.data, columns=iris.feature_names)
data['target'] = iris.target

# Selecting features and target variable
X = data[['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']]
y = data['target']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a Gaussian Naive Bayes classifier
classifier = GaussianNB()

# Train the classifier on the training data
classifier.fit(X_train, y_train)

# Predict probabilities on the test data
y_prob_naive_bayes = classifier.predict_proba(X_test)

# Predict class labels on the test data
y_pred_gaussian = classifier.predict(X_test)

# Calculate and print accuracy
accuracy_gaussian = accuracy_score(y_test, y_pred_gaussian)
print("Accuracy using Gaussian Probability:", accuracy_gaussian)

# Print the probabilities for the top 5 test records
top_5_probabilities = y_prob_naive_bayes[:5]
print("\nTop 5 Predicted Probabilities and True Classes:")
for i, probabilities in enumerate(top_5_probabilities):
    print(f"Record {i + 1} - True Class: {y_test.iloc[i]}, Probabilities: {probabilities}")

# Plot the probability distribution for each class
classes = np.unique(y_train)
plt.figure(figsize=(12, 6))
for class_name in classes:
    prob = y_prob_naive_bayes[:, class_name]
    plt.hist(prob, bins=20, alpha=0.5, label=f'Class {class_name}')

plt.xlabel('Probability')
plt.ylabel('Frequency')
plt.title('Naive Bayes Probability Distribution for Iris Classes')
plt.legend(loc='best')
plt.savefig('Probability Distribution')
plt.show()

# Predict class labels for new sample data
new_data = pd.DataFrame({
    'sepal length (cm)': [5.1, 6.2, 4.8],
    'sepal width (cm)': [3.5, 2.9, 3.4],
    'petal length (cm)': [1.4, 4.3, 1.9],
    'petal width (cm)': [0.2, 1.3, 0.2]
})

predicted_class = classifier.predict(new_data)
print("\nPredicted Classes for New Data using Gaussian Probability:", predicted_class)
