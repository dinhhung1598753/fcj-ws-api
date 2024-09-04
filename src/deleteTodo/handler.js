
import { getUsername, generateResponse } from "./../utils"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const deleteTodo = async (event) => {
    const id =  event.pathParameters.id
    const username = getUsername(event.requestContext.authorizer)

    const command = new DeleteCommand({
      TableName: process.env.TODO_TABLE,
      Key: {
        id,
        username
      },
    });
    const response = await docClient.send(command);
    return generateResponse(200);
}
