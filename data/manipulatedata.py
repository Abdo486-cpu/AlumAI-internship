import csv

row_number = 1 

result = []


with open('alumnidata3.csv', 'r',encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)

    for row_index, row in enumerate(reader):

        if row_index >= 1:
            if row_index == 20002:
                break
            try:
                row_value = "Linkedin Profile:"+"("+row[0]+"),"+"fullname:"+"("+row[1]+" "+row[2]+"),"+"DOB: "+"("+row[3]+"),"+"email:"+"("+row[4]+"),"+"location:"+"("+row[5]+"),"+"companies:"+"("+row[6]+"),"+"positions:"+"("+row[7]+"),"+"current role:"+"("+row[8]+"),"+"degree:"+"("+row[9]+"),"+"graduation year:"+"("+row[10]+")"
                result.append(row_value)

            except IndexError:
                print("Error: Invalid column index. Check your CSV structure.")

# with open('alumnidata.csv', 'r', encoding='utf-8') as csvfile:
#     reader = csv.reader(csvfile)

#     # Skip the header row
#     next(reader)

#     for row in reader:
#         try:
#             row_value = (
#                 f"Fullname: ({row[0]} {row[1]}), "
#                 f"DOB: ({row[2]}), "
#                 f"Email: ({row[3]}), "
#                 f"Workplace1: ({row[4]}), "
#                 f"Workplace2: ({row[5]}), "
#                 f"State: ({row[6]})"
#             )
#             result.append(row_value)
#         except IndexError:
#             print("Error: Invalid column index. Check your CSV structure.")


with open("output.txt", "w",encoding='utf-8') as text_file:
    for line in result:
        text_file.write(line + "\n")

print("Data manipulation completed successfully.")