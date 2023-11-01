const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const key = require("../service.json");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: key.client_email,
    private_key: key.private_key.replace(/\n/gm, "\n"),
  },
});

async function fetchAndCombineGoogleAnalyticsData(
  propertyId,
  startDate,
  endDate,
  website
) {
  try {
    const [response2] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'landingPage' }],
      metrics: [
        { name: "activeUsers" },
        { name: "totalUsers" },
        { name: "newUsers" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "landingPage",
          stringFilter: {
            value: `/agent-profile/${website}`,
          },
        },
      },
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'eventName' }],
      metrics: [
        { name: "eventCount" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: {
            value: website,
          },
        },
      },
    });

    // Initialize the combined response with default values
    const combinedResponse = {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      eventCount: 0,
    };

    // If response2 contains data, update the combined response
    if (
      response2 &&
      response2.rows &&
      response2.rows.length > 0 &&
      response2.rows[0].metricValues
    ) {
      combinedResponse.activeUsers = parseInt(response2.rows[0].metricValues[0].value);
      combinedResponse.totalUsers = parseInt(response2.rows[0].metricValues[1].value);
      combinedResponse.newUsers = parseInt(response2.rows[0].metricValues[2].value);
    }

    // If response contains data, update the combined response
    if (response && response.rows && response.rows.length > 0 && response.rows[0].metricValues) {
      combinedResponse.eventCount = parseInt(response.rows[0].metricValues[0].value);
    }

    return combinedResponse;
  } catch (err) {
    console.log(err);
  }}

  module.exports = fetchAndCombineGoogleAnalyticsData