// import { supabase } from "@/utils/supabaseClient";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     const {data, error} = await supabase.from("posts").select("*")
//     console.log(data)
//     if(error){
//         return res.status(500).json({error: error.message})
//     }
//     return res.status(200).json(data)
// }
