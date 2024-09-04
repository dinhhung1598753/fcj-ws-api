import { getUsername, generateResponse } from "./../utils"
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"
const client = new DynamoDBClient({})

export const getTodos = async (event) => {
    const username = getUsername(event.requestContext.authorizer)

    const input = {
      "ExpressionAttributeValues": {
        ":a": {
          "S": username
        }
      },
      "FilterExpression": "username = :a",
      "TableName": process.env.TODO_TABLE
    };
    const command = new ScanCommand(input);
    const response = await client.send(command);
    const items = response.Items.map(unmarshall)
    return generateResponse(200, {
        items,
        count: response.Count
      });
}

