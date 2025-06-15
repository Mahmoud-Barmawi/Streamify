import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req,res) {
    try {
        const token=generateStreamToken(req.user.id);
        res.status(200).json({token});
    } catch (error) {
        console.log("Error in getStreamToken Controller",error.message);
        res.status(501).json({message:"Internal server error"});
    }
}