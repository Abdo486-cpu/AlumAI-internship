from faker import Faker
import csv

# fake = Faker()

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



from faker import Faker
import random

fake = Faker()

def generate_positions():
    positions = []
    for _ in range(random.randint(1, 5)):
        positions.append(fake.job_title())
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

def generate_synthetic_profile():
    first_name = fake.first_name()
    last_name = fake.last_name()
    middle_initial = random.choice([f" {fake.random_uppercase_letter()}.", ""])
    name = f"{first_name}{middle_initial} {last_name}"
    profile = {
        "profileURL": f"https://www.linkedin.com/in/{fake.user_name()}",
        "firstName": first_name,
        "lastName": last_name,
        "location": fake.state(),
        "companies": generate_companies(),
        "positions": generate_positions(),
        "currentRole": fake.job_title(),
        "degree": fake.catch_phrase(),
        "graduationYears": generate_graduation_years(),
        "fullName": name
    }
    return profile

def format_profile(profile):
    return (
        f"{profile['profileURL']},{profile['firstName']},{profile['lastName']},{profile['location']},"
        f"{profile['companies']},{profile['positions']},,{profile['currentRole']},{profile['degree']},"
        f"{profile['graduationYears']},{profile['fullName']},,,,,,,,,,,,,,,,,,,,"
    )

num_profiles = 10
synthetic_profiles = [format_profile(generate_synthetic_profile()) for _ in range(num_profiles)]

for profile in synthetic_profiles:
    print(profile)


