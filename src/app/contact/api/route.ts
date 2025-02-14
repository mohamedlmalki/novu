import { NextResponse } from 'next/server';
import { Novu } from "@novu/node";
import { nanoid } from 'nanoid';

type ResponseData = {
  success: boolean;
  msg: string
  subscriberId?: string
}

type NewContactBody = {
  name: string
  email: string;
  message: string;
}

export async function GET(): Promise<NextResponse<ResponseData>> {
  return NextResponse.json({ success: true, msg: 'Service running' })
}

const NOVU_WORKFLOW_ID = 'welcome-onboarding-email';
export async function POST(req: Request): Promise<NextResponse<ResponseData>> {
  const payload = await req.json() as NewContactBody;

  const novu = new Novu(process.env.NOVU_API_KEY || '');
  const res = await novu.subscribers.identify(nanoid(), {
    email: payload.email,
  });

  const subscriber = res?.data?.data || {};

  novu.trigger(NOVU_WORKFLOW_ID, {
    to: {
      subscriberId: subscriber.subscriberId,
      email: payload.email
    },
    payload: {
      firstname: payload.name,
      database: 'some-value'
    }
  });

  return NextResponse.json({
    success: true,
    msg: 'Contact created',
    subscriberId: subscriber.subscriberId
  })
}