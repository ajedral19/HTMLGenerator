import { GetSignedConnection, ListObjects } from "../models/model.bucket.js";
import { response_handler } from "../utils.js";

export const BucketGetSignedConnection = async (req, res) => {
    const { path, filename } = req.query;
    console.log(path, filename);

    const url = await GetSignedConnection(path, filename);

    res.status(200).send(url);
};

export const GetResources = async(req, res) => {
    const obj = await ListObjects()
    return response_handler(200, null, [])
}