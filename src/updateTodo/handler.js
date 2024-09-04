
import { getUsername, generateResponse } from "../utils"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const updateTodo = async (event) => {
    const id =  event.pathParameters.id
    const username = getUsername(event.requestContext.authorizer)
    const body = JSON.parse(event.body) 
    const done = !!body.done

    const getCommand = new GetCommand({
      TableName: process.env.TODO_TABLE,
      Key: {
        id,
        username
      },
    });
  
    const getResponse = await docClient.send(getCommand);
    if(!getResponse.Item) {
      return generateResponse(404)
    }

    if(getResponse.Item.username !== username) {
      return generateResponse(403)
    }

    const command = new UpdateCommand({
      TableName: process.env.TODO_TABLE,
      Key: {
        id,
        username
      },
      UpdateExpression: "set done = :done",
      ExpressionAttributeValues: {
        ":done": done,
      },
      ReturnValues: "ALL_NEW",
    });
   
    const response = await docClient.send(command);
    return generateResponse(200, {...response.Attributes});
}

