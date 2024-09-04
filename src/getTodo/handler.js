
import { getUsername, generateResponse } from "./../utils"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getTodo = async (event) => {
    const id =  event.pathParameters.todoId
    const username = getUsername(event.requestContext.authorizer)

    const command = new GetCommand({
      TableName: process.env.TODO_TABLE,
      Key: {
        id,
        username
      },
    });
  
    const response = await docClient.send(command);
    if(!response.Item) {
      return generateResponse(404)
    }
    
    return generateResponse(200, response.Item);
}

