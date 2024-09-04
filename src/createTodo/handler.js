
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { getUsername, generateResponse } from "./../utils"

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const createTodo = async (event) => {
  const body = JSON.parse(event.body)
  const name = body.name
  const username = getUsername(event.requestContext.authorizer)
  const id = uuidv4()
  const command = new PutCommand({
    TableName: process.env.TODO_TABLE,
    Item: {
      id,
      name,
      username,
      createdAt: new Date().getTime(),
      done: false
    },
  });
  const response = await docClient.send(command);
  
  return generateResponse(201, {id})
}

