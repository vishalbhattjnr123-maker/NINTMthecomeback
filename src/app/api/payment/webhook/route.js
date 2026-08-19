import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getRegistrations, updateRegistration } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/email';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(request) {
    return handleOptions(request);
}

export async function POST(request) {
    const corsHeaders = getCorsHeaders(request);
    try {
        const rawBody = await request.text();
        const signatureHeader = request.headers.get('x-razorpay-signature');

        if (!signatureHeader) {
            console.error('Webhook signature missing in headers.');
            return NextResponse.json({ error: 'Webhook signature header missing.' }, { status: 400, headers: corsHeaders });
        }

        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        // Perform signature verification against raw body contents
        if (!webhookSecret || webhookSecret === 'YOUR_WEBHOOK_SECRET') {
            console.warn('RAZORPAY_WEBHOOK_SECRET is not configured. Webhook verification is bypassed.');
        } else {
            const expectedSig = crypto
                .createHmac('sha256', webhookSecret)
                .update(rawBody)
                .digest('hex');

            let isSignatureValid = false;
            try {
                isSignatureValid = crypto.timingSafeEqual(
                    Buffer.from(expectedSig, 'utf-8'),
                    Buffer.from(signatureHeader, 'utf-8')
                );
            } catch (err) {
                isSignatureValid = false;
            }

            if (!isSignatureValid) {
                console.error('Webhook signature validation failed.');
                return NextResponse.json({ error: 'Signature validation failed.' }, { status: 400, headers: corsHeaders });
            }
        }

        // Parse Webhook payload
        const eventData = JSON.parse(rawBody);
        const event = eventData.event;
        const paymentEntity = eventData.payload?.payment?.entity;

        if (!paymentEntity) {
            return NextResponse.json({ success: true, message: 'Invalid payload entity, skipped.' }, { headers: corsHeaders });
        }

        const orderId = paymentEntity.order_id;
        const paymentId = paymentEntity.id;
        const amount = paymentEntity.amount ? paymentEntity.amount / 100 : 0;

        if (!orderId) {
            return NextResponse.json({ success: true, message: 'No Order ID linked in entity, skipped.' }, { headers: corsHeaders });
        }

        // Fetch candidate registration connected with the Order ID
        const registrations = await getRegistrations();
        const candidate = registrations.find(r => r.razorpayOrderId === orderId);

        if (!candidate) {
            console.warn(`Webhook received for order ID ${orderId} but no matching candidate registration found.`);
            return NextResponse.json({ success: true, message: 'No matching candidate registration found.' }, { headers: corsHeaders });
        }

        if (event === 'payment.captured') {
            // Only update if not already PAID to avoid duplicate emails/updates
            if (candidate.paymentStatus !== 'PAID') {
                const updatedCandidate = await updateRegistration(candidate.registrationId, {
                    paymentStatus: 'PAID',
                    razorpayPaymentId: paymentId,
                    paymentAmount: amount || candidate.paymentAmount,
                    paymentDate: new Date().toISOString(),
                    applicationStatus: 'Payment Successful'
                });

                console.log(`Webhook updated payment status to PAID for Registration : ${candidate.registrationId}`);
                await sendConfirmationEmail(updatedCandidate);
            }
        } else if (event === 'payment.failed') {
            if (candidate.paymentStatus !== 'PAID') {
                await updateRegistration(candidate.registrationId, {
                    paymentStatus: 'FAILED',
                    razorpayPaymentId: paymentId || candidate.razorpayPaymentId,
                    applicationStatus: 'Payment Failed'
                });
                console.log(`Webhook updated payment status to FAILED for Registration : ${candidate.registrationId}`);
            }
        }

        return NextResponse.json({ success: true, event }, { headers: corsHeaders });
    } catch (error) {
        console.error('Webhook API Route error:', error);
        return NextResponse.json({ error: 'An error occurred during webhook execution.' }, { status: 500, headers: corsHeaders });
    }
}
