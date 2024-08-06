const faker = require('faker');

function generateSyntheticData() {
  let syntheticData = [];
  for (let i = 0; i < 10; i++) {  // Generate 10 synthetic records
    let profile = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      positions: [
        faker.name.jobTitle(),
        faker.name.jobTitle(),
        faker.name.jobTitle(),
        faker.name.jobTitle()
      ].join('; '),
      companies: [
        faker.company.companyName(),
        faker.company.companyName(),
        faker.company.companyName(),
        faker.company.companyName()
      ].join('; '),
      currentPosition: faker.name.jobTitle(),
      currentCompany: faker.company.companyName(),
      degree: faker.name.jobTitle(),
      graduationYear: faker.date.past().getFullYear(),
      // Add more fields as necessary...
    };
    syntheticData.push(profile);
  }
  return syntheticData;
}

console.log(generateSyntheticData());
