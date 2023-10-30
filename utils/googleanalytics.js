const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const key = require("../service.json");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: key.client_email,
    private_key: key.private_key.replace(/\n/gm, "\n"),
  },
});

async function fetchGoogleAnalyticsData(propertyId, startDate, endDate, website) {
  try {

    const [response2] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "eventName" }],
      metrics: [
        { name: "activeUsers" },
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "eventCount" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: {
            value: website,
          },
        },
      }});

    if (response2 && response2.rows && response2.rows.length > 0) {
      const metricValues2 = response2.rows[0].metricValues;

      const activeUsers2 = metricValues2[0].value;
      const totalUsers2 = metricValues2[1].value;
      const newUsers2 = metricValues2[2].value;
      const eventCount2 = metricValues2[3].value;

      const metricValuesObject2 = {
        activeUsers: activeUsers2,
        totalUsers: totalUsers2,
        newUsers: newUsers2,
        eventCount: eventCount2,
      };
      
      return {
        response2: metricValuesObject2,
      };
    } else {
      const metricValuesObject2 = {
        activeUsers: "0",
        totalUsers: "0",
        newUsers: "0",
        eventCount: "0",
      };
      return {
        response2: metricValuesObject2,
      };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while fetching data." };
  }
}

module.exports = fetchGoogleAnalyticsData;
