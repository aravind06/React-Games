import json
import pandas as pd
from openpyxl import load_workbook

# Load the Excel file
file_path = 'your_input_file.xlsx'
df = pd.read_excel(file_path)
df.head(5)
# Calculate the total for each row
#df['total'] = df.sum(axis=1)
df.describe()
# Filter rows that meet the split category conditions
filtered_rows = []
for index, row in df.iterrows():
    # Calculate the maximum percentage for each row
    
    percentages = [row[col] / row['total'] * 100 for col in df.columns[1:-1]]
    print(max(percentages))
    print(row['text'])
    if max(percentages) <= 95:
        filtered_rows.append(row)

# Initialize a dictionary to store the output
output = {}

# Iterate through the filtered rows
for row in filtered_rows:
    category = row[0]
    # Create a list to store elements for the category
    category_output = []

    # Iterate through the columns for the current category
    for i in range(1, len(row) - 1):
        col_name = df.columns[i]
        col_value = row[i]

        if col_value > 0:
            percentage = (col_value / row['total']) * 100
            category_output.append(f"{col_name} - {percentage:.2f}%")

    # Add the category and its sub-list to the output
    if category_output:
        output[category] = category_output

# Save the filtered output as JSON to a file
output_filename = 'filtered_output.json'
with open(output_filename, 'w') as json_file:
    json.dump(output, json_file, indent=4)

print(f"Filtered output written to {output_filename}")
