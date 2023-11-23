/* eslint-disable no-empty */
const fetchGoogleAnalyticsData = require("../utils/googleanalytics")
module.exports = {
  // eslint-disable-next-line no-unused-vars
  google : async(req,res)=>{
    try {
      const propertyId = 361280757; //your property ID
      const {website } = req.body

const date1= Date.now()
const date = new Date(date1);

// Extract year, month, and day
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(date.getDate()).padStart(2, '0');

// Form the "yyyy-mm-dd" date format
const formattedDate = `${year}-${month}-${day}`;
  const startDate = "2023-10-24";
  const endDate = formattedDate;

  // const website = "ahmadimran34"
const data =await fetchGoogleAnalyticsData(
  propertyId,
  startDate,
  endDate,
  website
);
return res.status(200).json( data );

    } catch (error) {
      console.log(error)
    }
  }
}

// const date1= Date.now()
// const date = new Date(date1);

// // Extract year, month, and day
// const year = date.getFullYear();
// const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
// const day = String(date.getDate()).padStart(2, '0');

// // Form the "yyyy-mm-dd" date format
// const formattedDate = `${year}-${month}-${day}`;
//   const startDate = "2023-10-19";
//   const endDate = formattedDate;

  const website = "hmadimran34"
  module.exports = {
//     googleAnalytics: async (req, res) => {
//       try {
//         const [response] = await analyticsDataClient.runReport({
//           property: `properties/${propertyId}`,
//           dateRanges: [{ startDate: startDate, endDate: endDate }],
//           dimensions: [], // Your dimensions
//           metrics: [
//             { name: "activeUsers" },
//             { name: "totalUsers" },
//             { name: "newUsers" },
//           ],
//         });
  
//         if (response && response.rows && response.rows.length > 0) {
//           const metricValues = response.rows[0].metricValues;
  
//           // Extract metric values from the metricValues array
//           const activeUsers = metricValues[0].value;
//           const totalUsers = metricValues[1].value;
//           const newUsers = metricValues[2].value;
  
//           const metricValuesObject = {
//             activeUsers,
//             totalUsers,
//             newUsers,
//           };
  
//           const [response2] = await analyticsDataClient.runReport({
//             property: `properties/${propertyId}`,
//             dateRanges: [{ startDate: startDate, endDate: endDate }],
//             dimensions: [{ name: "eventName" }],
//             metrics: [
//               { name: "activeUsers" },
//               { name: "totalUsers" },
//               { name: "newUsers" },
//               { name: "eventCount" },
//             ],
//             dimensionFilter: {
//               filter: {
//                 fieldName: "eventName",
//                 stringFilter: {
//                   value: website,
//                 },
//               },
//             },
//           });
  
//           if (response2 && response2.rows && response2.rows.length > 0) {
//             const metricValues2 = response2.rows[0].metricValues;
  
//             // Extract metric values from the metricValues array for response2
//             const activeUsers2 = metricValues2[0].value;
//             const totalUsers2 = metricValues2[1].value;
//             const newUsers2 = metricValues2[2].value;
//             const eventCount2 = metricValues2[3].value;
  
//             const metricValuesObject2 = {
//               activeUsers: activeUsers2,
//               totalUsers: totalUsers2,
//               newUsers: newUsers2,
//               eventCount: eventCount2,
//             };
  
//             return res.status(200).json({
//               response: metricValuesObject,
//               response2: metricValuesObject2,
//             });
//           } else {
//             return res.status(404).json({ error: "No data found for response2." });
//           }
//         } else {
//           return res.status(404).json({ error: "No data found for response." });
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         return res.status(500).json({ error: "An error occurred while fetching data." });
//       }
//     },
//   };
  
