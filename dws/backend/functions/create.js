import * as uuid from "uuid";
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

// const dynamoDatabase = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      dwId: uuid.v1(), // A unique uuid
      cloudApps: data.cloudApps, // Parsed from request body
      onPremApps: data.onPremApps, // Parsed from request body
      recordsPerMonth: data.recordsPerMonth, // Parsed from request body
      hoursPerMonth: data.hoursPerMonth, // Parsed from request body
      hourlyRate: data.hourlyRate, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});