import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_dummy_test_key";

    // Verify cryptographic signature
    if (signature) {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: "Invalid cryptographic signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Event handling
    if (payload.event === "payment.captured") {
      // Confirm order payment and reserve stock in PostgreSQL
      return NextResponse.json({ status: "success", event: "payment.captured" });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
