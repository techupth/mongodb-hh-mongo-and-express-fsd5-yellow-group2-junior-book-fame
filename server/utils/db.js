// Set up db connection here
import { MongoClient } from "mongodb";

// MongoDB จะมี Url ให้เราทำการเชื่อมต่อ
// โดยปกติแล้ว Url จะอยู๋ในรูปแบบ `mongodb://url:port`
const connectionString = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(connectionString);

export const db = client.db("practice-mongo");
