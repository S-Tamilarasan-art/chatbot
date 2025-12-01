export const dynamic = 'force-dynamic';
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request :NextRequest) {
 
  try {
    
    const data = await request.json();
    console.log(" Received from frontend:", data);
    var aws_post_url =process.env.AWS_POST_URL
      if (!aws_post_url) {
      return NextResponse.json(
        { error: "AWS_API_URL is missing in env" },
        { status: 500 }
      );
    }
    const response = await fetch( `${aws_post_url}`,{method:"POST",
      headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

   const awsResponse = await response.text();
    console.log(" AWS replied:", awsResponse);
   
   return NextResponse.json(
      {
        status: "success",
        sentData: data,
        awsResponse,
      },
      { status: 200 }
    );
  } catch (error: any) {
  console.log("ERROR:", error);

  return NextResponse.json(
      {
        error: "Failed to process request",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
