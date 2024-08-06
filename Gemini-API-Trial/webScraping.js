// const axios = require('axios');

// const searchProfiles = async (accessToken, query) => {
//   const url = `https://api.linkedin.com/v2/search?q=people&keywords=${query}`;
//   const headers = {
//     'Authorization': `Bearer ${accessToken}`
//   };

//   try {
//     const response = await axios.get(url, { headers });
//     return response.data;
//   } catch (error) {
//     console.error('Error searching profiles:', error);
//   }
// };

// const getProfileDetails = async (accessToken, profileId) => {
//     const url = `https://api.linkedin.com/v2/people/(id:${profileId})`;
//     const headers = {
//       'Authorization': `Bearer ${accessToken}`
//     };
  
//     try {
//       const response = await axios.get(url, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error retrieving profile details:', error);
//     }
//   };

//   const query = 'German University in Cairo';
// const accessToken = 'your-access-token';  // Replace with your actual access token

// const main = async () => {
//   // Step 1: Search for profiles
//   const searchResults = await searchProfiles(accessToken, query);
//   if (searchResults && searchResults.elements) {
//     for (const element of searchResults.elements) {
//       const profileId = element.id; // or however you get the profile ID
//       // Step 2: Retrieve profile details
//       const profileDetails = await getProfileDetails(accessToken, profileId);
//       console.log(profileDetails);
//       // Extract and process the required details from profileDetails
//     }
//   }
// };
