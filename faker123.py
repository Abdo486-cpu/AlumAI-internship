from faker import Faker
import csv
import random

fake = Faker()

# with open('alumnidata.csv', 'w', newline='') as csvfile:
#     fieldnames = ['first_name', 'last_name', 'dob', 'email', 'workplace1', "workplace2", "state"]
#     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

#     writer.writeheader()
#     for _ in range(20000):
#         writer.writerow({
#             'first_name': fake.first_name(),
#             'last_name': fake.last_name(),
#             'dob': fake.date_of_birth(minimum_age=25,maximum_age=30),
#             'email': fake.email(),
#             'workplace1': fake.company(),
#             'workplace2': fake.company(),
#             'state': fake.city(),
#         })



def generate_positions():
    positions = []
    for _ in range(random.randint(1, 5)):
        positions.append(fake.job())
    return "; ".join(positions)

def generate_companies():
    companies = []
    for _ in range(random.randint(1, 5)):
        companies.append(fake.company())
    return "; ".join(companies)

def generate_graduation_years():
    years = []
    for _ in range(random.randint(1, 4)):
        years.append(f"({random.randint(1970, 2023)})")
    return ", ".join(years)

with open('alumnidata2.csv', 'w', newline='') as csvfile:
    fieldnames = ['profileURL','firstName', 'lastName', 'dob', 'email','location', 'companies', "positions", "currentRole", "degree", "graduationYears", "fullName"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for _ in range(20):
        first_name = fake.first_name()
        last_name = fake.last_name()
        middle_initial = random.choice([f" {fake.random_uppercase_letter()}.", ""])
        name = f"{first_name}{middle_initial} {last_name}"
        writer.writerow({
            "profileURL": f"https://www.linkedin.com/in/{fake.user_name()}",
            "firstName": first_name,
            "lastName": last_name,
            'dob': fake.date_of_birth(minimum_age=25,maximum_age=30),
            'email': fake.email(),
            "location": fake.state(),
            "companies": generate_companies(),
            "positions": generate_positions(),
            "currentRole": fake.job(),
            "degree": fake.catch_phrase(),
            "graduationYears": generate_graduation_years(),
            "fullName": name
        })
