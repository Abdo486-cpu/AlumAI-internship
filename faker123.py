from faker import Faker
import csv

fake = Faker()

with open('alumnidata.csv', 'w', newline='') as csvfile:
    fieldnames = ['first_name', 'last_name', 'dob', 'email', 'workplace1', "workplace2", "state"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for _ in range(20000):
        writer.writerow({
            'first_name': fake.first_name(),
            'last_name': fake.last_name(),
            'dob': fake.date_of_birth(minimum_age=25,maximum_age=30),
            'email': fake.email(),
            'workplace1': fake.company(),
            'workplace2': fake.company(),
            'state': fake.city(),
        })