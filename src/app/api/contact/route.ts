import { APIResponse } from "@/app/types";
import { appConfig } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let response: APIResponse;
  
  try {
    // Check if body is JSON and parse it
    const body = await request.json();
    const apiResult = await fetch(`${appConfig.API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await apiResult.json();
    console.log("apiResult", data);
    response = data as APIResponse;
  } catch (e) {
    console.error("Error submitting answer:", e);
    response = {
      success: false,
      message: "Failed to submit answer",
      errorCode : "submit_answer_error",
      data : null,
      tokenExpired : false,
      status : 500
    };
  }

  // Return the response
  return NextResponse.json(response, { status: response.status });
}
