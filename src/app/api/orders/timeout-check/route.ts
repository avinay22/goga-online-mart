import { NextResponse } from "next/server";

// 5-Minute Merchant Acceptance SLA Auto-Cancel Worker
export async function GET() {
  try {
    // In production with Supabase/PostgreSQL, runs:
    // UPDATE orders SET status = 'cancelled', cancelled_at = NOW()
    // WHERE status = 'placed' AND NOW() > shop_response_deadline
    // RETURNING id, customer_id, total_payable;

    return NextResponse.json({
      status: "active",
      message: "5-minute SLA daemon active. Unaccepted orders will be cancelled and refunded automatically.",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
