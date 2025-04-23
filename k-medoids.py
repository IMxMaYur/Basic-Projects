import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn_extra.cluster import KMedoids

# Load the Iris dataset
iris = load_iris()
data = pd.DataFrame(data=iris.data, columns=iris.feature_names)

# Standardize the data for better clustering performance
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)

# Apply PCA for 2D visualization
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(scaled_data)

# K-Medoids Clustering
k = 3
kmedoids = KMedoids(n_clusters=k, random_state=42, method='pam')
kmedoids.fit(scaled_data)
labels_kmedoids = kmedoids.labels_
medoids = kmedoids.cluster_centers_

# Visualize the K-Medoids Clusters in 2D
plt.figure(figsize=(10, 6))
colors = ['red', 'green', 'blue']
for i in range(k):
    plt.scatter(reduced_data[labels_kmedoids == i, 0], reduced_data[labels_kmedoids == i, 1],
                label=f'K-Medoids Cluster {i}', alpha=0.6, color=colors[i])

# Plot the medoids
medoids_2d = pca.transform(medoids)
plt.scatter(medoids_2d[:, 0], medoids_2d[:, 1], marker='X', s=200,
            c='black', label='K-Medoids Medoids')

plt.title('K-Medoids Clustering on Iris Dataset (PCA-reduced)')
plt.xlabel('PCA 1')
plt.ylabel('PCA 2')
plt.legend()
plt.grid(True)
plt.savefig('kmedoids_clusters.png')
plt.show()

# Print K-Medoids cluster assignments for the first 10 samples
print("\nK-Medoids cluster assignments for first 10 samples:")
for i in range(10):
    print(f"Sample {i+1}: Cluster {labels_kmedoids[i]}")
