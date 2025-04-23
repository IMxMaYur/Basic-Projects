import pandas as pd from mlxtend.frequent_patterns import apriori, association_rules

Sample transaction data

transactions = [ ['milk', 'bread', 'butter'], ['bread', 'butter'], ['milk', 'bread'], ['milk', 'bread', 'butter', 'jam'], ['bread', 'jam'] ]

Convert transaction data into a one-hot encoded DataFrame

from mlxtend.preprocessing import TransactionEncoder te = TransactionEncoder() te_ary = te.fit(transactions).transform(transactions) df = pd.DataFrame(te_ary, columns=te.columns_)

Generate frequent itemsets using the Apriori algorithm

frequent_itemsets = apriori(df, min_support=0.4, use_colnames=True) print("Frequent Itemsets:") print(frequent_itemsets)

Generate association rules from the frequent itemsets

rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.6) print("\nAssociation Rules:") print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

Optional: Save the rules to a CSV file

rules.to_csv('apriori_association_rules.csv', index=False)

