export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";
export  async function GET(request:NextRequest){
    const {searchParams}=new URL(request.url);
    const sessionId = searchParams.get("sessionId")
    
    console.log("next api route",sessionId)

try{
    const aws_get_url = process.env.AWS_GET_URL ;
    if (!aws_get_url) {
      return NextResponse.json(
        { error: "AWS_API_URL is missing in env" },
        { status: 500 }
      );
    
    }
    // if(!sessionId){
    //   return NextResponse.json({
    //     message:"sessionId is empty",
    //     sessionId:sessionId,
    //   }

    //   )
    // }
    const awsResponse = await fetch(`${aws_get_url}?sessionId=${sessionId}`,
        {method:"GET",headers:{"Content-Type":"application/json"}})
        const data = await awsResponse.json();
      
      return NextResponse.json({
        state:"sucess",
        message:"forwarded to aws",
        data: data
    },)
}catch(error:any){
    console.error(error);
    return NextResponse.json(
{
        error: "Failed to process request",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
}
}
