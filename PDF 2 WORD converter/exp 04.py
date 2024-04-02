def knapsack_greedy(values, weights, capacity):
    n = len(values)
    # Calculate value-to-weight ratios for all items
    value_per_weight = [(i + 1, values[i], weights[i], values[i] / weights[i]) for i in range(n)]
    # Sort items by value-to-weight ratio in descending order
    value_per_weight.sort(key=lambda x: x[3], reverse=True)

    total_value = 0
    remaining_capacity = capacity
    selected_items = []

    # Loop through items
    for item_id, value, weight, ratio in value_per_weight:
        if weight <= remaining_capacity:
            total_value += value
            remaining_capacity -= weight
            selected_items.append((item_id, value, weight))
        else:
            selected_value = ratio * remaining_capacity
            total_value += selected_value
            selected_items.append((item_id, selected_value, remaining_capacity))
            break

    return total_value, selected_items


# Input values, weights, and capacity from the user
values = list(map(int, input("Enter the values of items separated by space: ").split()))
weights = list(map(int, input("Enter the weights of items separated by space: ").split()))
capacity = int(input("Enter the capacity of the knapsack: "))

# Calculate optimal selection
total_profit, selected_items = knapsack_greedy(values, weights, capacity)

# Display the table for item details
print("\nItem Details:")
print("ID\tProfit\tWeight\tRatio")
for item_id, value, weight, ratio in zip(range(1, len(values) + 1), values, weights,
                                         [v / w for v, w in zip(values, weights)]):
    print(f"{item_id}\t{value}\t{weight}\t{ratio:.2f}")

# Display table for optimal selection
print("\nOptimal Selection:")
print("ID\tProfit\tWeight")
for item_id, value, weight in selected_items:
    print(f"{item_id}\t{value}\t{weight}")

# Display total profit
print("\nTotal Profit:", total_profit)
