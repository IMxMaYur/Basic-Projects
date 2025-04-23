### KMeans_Clustering.py ###

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# Load the Iris dataset
iris = load_iris()
data = pd.DataFrame(data=iris.data, columns=iris.feature_names)

# Standardize the data for better clustering performance
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)

# Apply PCA for 2D visualization
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(scaled_data)

# K-Means Clustering
k = 3  # Number of clusters
kmeans = KMeans(n_clusters=k, random_state=42)
kmeans.fit(scaled_data)

# Get cluster labels and centroids
labels_kmeans = kmeans.labels_
centroids_kmeans = kmeans.cluster_centers_

# Visualize the K-Means Clusters in 2D
plt.figure(figsize=(10, 6))
colors = ['red', 'green', 'blue']
for i in range(k):
    plt.scatter(reduced_data[labels_kmeans == i, 0], reduced_data[labels_kmeans == i, 1], 
                label=f'K-Means Cluster {i}', alpha=0.6, color=colors[i])

# Plot the centroids
centroids_kmeans_2d = pca.transform(centroids_kmeans)
plt.scatter(centroids_kmeans_2d[:, 0], centroids_kmeans_2d[:, 1], marker='X', s=200, 
            c='black', label='K-Means Centroids')

plt.title('K-Means Clustering on Iris Dataset (PCA-reduced)')
plt.xlabel('PCA 1')
plt.ylabel('PCA 2')
plt.legend()
plt.grid(True)
plt.savefig('kmeans_clusters.png')
plt.show()

# Print K-Means cluster assignments for the first 10 samples
print("\nK-Means cluster assignments for first 10 samples:")
for i in range(10):
    print(f"Sample {i+1}: Cluster {labels_kmeans[i]}")
