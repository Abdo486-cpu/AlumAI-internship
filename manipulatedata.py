import csv

row_number = 1 

result = []


# with open('data.csv', 'r',encoding='utf-8') as csvfile:
#     reader = csv.reader(csvfile)

#     for row_index, row in enumerate(reader):

#         if row_index >= 1:
#             if row_index == 20001:
#                 break
#             try:
#                 row_value = "Fullname: ("+row[1]+" "+row[2]+"), State: ("+row[3]+"), Employers: ("+row[4]+"), Experience: ("+row[5]+"), job title: ("+row[6]+")"
#                 result.append(row_value)

#             except IndexError:
#                 print("Error: Invalid column index. Check your CSV structure.")

with open('alumnidata.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)

    # Skip the header row
    next(reader)

    for row in reader:
        try:
            row_value = (
                f"Fullname: ({row[0]} {row[1]}), "
                f"DOB: ({row[2]}), "
                f"Email: ({row[3]}), "
                f"Workplace1: ({row[4]}), "
                f"Workplace2: ({row[5]}), "
                f"State: ({row[6]})"
            )
            result.append(row_value)
        except IndexError:
            print("Error: Invalid column index. Check your CSV structure.")


with open("output.txt", "w",encoding='utf-8') as text_file:
    for line in result:
        res = '"' + line + '",'
        text_file.write(res)

print("Data manipulation completed successfully.")