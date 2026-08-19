import { NextResponse } from 'next/server';
import { addRegistration, getRegistrations } from '@/lib/db';
import { put } from '@vercel/blob';
import path from 'path';
import { sendAdminNotificationEmail, sendCandidateRegistrationEmail } from '@/lib/email';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(request) {
    return handleOptions(request);
}

export async function POST(request) {
    const corsHeaders = getCorsHeaders(request);
    try {
        const formData = await request.formData();
        const type = formData.get('type') || 'registration';

        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');

        // Log "Registration received"
        console.log(`${type === 'inquiry' ? 'Inquiry' : 'Registration'} received`);

        if (type === 'inquiry') {
            const message = formData.get('message');
            if (!name || !email || !phone || !message) {
                return NextResponse.json({ error: 'Missing required text fields for inquiry.' }, { status: 400, headers: corsHeaders });
            }

            const randomNum = Math.floor(100000 + Math.random() * 900000);
            const registrationId = `INQ-${randomNum}`;

            const inquiryData = {
                registrationId,
                id: registrationId,
                name,
                fullName: name,
                email,
                phone,
                whatsapp: formData.get('whatsapp') || phone,
                city: formData.get('city') || '',
                state: formData.get('state') || '',
                message,
                course: formData.get('course') || '',
                service: formData.get('service') || '',
                address: formData.get('address') || '',
                type: 'inquiry',
                paymentStatus: 'INQUIRY',
                paymentAmount: 0
            };

            const registration = await addRegistration(inquiryData);

            // Log "Registration processed successfully"
            console.log('Registration processed successfully');

            try {
                const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000';
                const protocol = request.headers.get('x-forwarded-proto') || 'https';
                const baseUrl = `${protocol}://${host}`;
                const emailResult = await sendAdminNotificationEmail(registration, baseUrl);
                if (!emailResult) {
                    throw new Error('Fallback simulation / SMTP failure detected for admin notification');
                }
                console.log('Email sent successfully');
            } catch (emailErr) {
                console.error('Email sending failed securely:', emailErr);
                return NextResponse.json({ error: 'Failed to send inquiry email notification.' }, { status: 500, headers: corsHeaders });
            }

            return NextResponse.json({ success: true, registration }, { status: 201, headers: corsHeaders });
        }

        // Original registration flow
        const instagramUsername = formData.get('instagramUsername');
        const dateOfBirth = formData.get('dateOfBirth');
        const whatsapp = formData.get('whatsapp');
        const height = formData.get('height');
        const state = formData.get('state');
        const city = formData.get('city');
        const pincode = formData.get('pincode');

        const fullLengthPhoto = formData.get('fullLengthPhoto');
        const closeUpPhoto = formData.get('closeUpPhoto');

        if (!name || !instagramUsername || !dateOfBirth || !email || !phone || !whatsapp || !height || !state || !city || !pincode) {
            return NextResponse.json({ error: 'Missing required text fields. Please complete all fields.' }, { status: 400, headers: corsHeaders });
        }

        const registrations = await getRegistrations();
        const duplicate = registrations.find(r =>
            (r.email?.toLowerCase() === email.toLowerCase() || r.phone === phone) &&
            r.paymentStatus === 'PAID'
        );
        if (duplicate) {
            return NextResponse.json({ error: 'This email address or phone number is already registered and database status is PAID.' }, { status: 400, headers: corsHeaders });
        }

        if (!fullLengthPhoto || !closeUpPhoto || typeof fullLengthPhoto === 'string' || typeof closeUpPhoto === 'string') {
            return NextResponse.json({ error: 'Both photos (Full Length and Close-up) are required.' }, { status: 400, headers: corsHeaders });
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        const validatePhoto = (file, label) => {
            if (!allowedTypes.includes(file.type)) {
                const ext = path.extname(file.name).toLowerCase();
                if (!allowedExtensions.includes(ext)) {
                    throw new Error(`${label}: Invalid file type. Allowed formats: JPG, JPEG, PNG, WEBP.`);
                }
            }
            if (file.size > 5 * 1024 * 1024) {
                throw new Error(`${label}: File size exceeds 5 MB limit.`);
            }
        };

        try {
            validatePhoto(fullLengthPhoto, 'Full Length Photo');
            validatePhoto(closeUpPhoto, 'Close-Up Photo');
        } catch (validationErr) {
            return NextResponse.json({ error: validationErr.message }, { status: 400, headers: corsHeaders });
        }

        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const registrationId = `NINTM-${randomNum}`;

        // Upload Full Length Photo to Vercel Blob
        const fullLengthExt = path.extname(fullLengthPhoto.name).toLowerCase() || '.jpg';
        const fullLengthFileName = `${registrationId}-fullLength${fullLengthExt}`;
        const fullLengthBlob = await put(fullLengthFileName, fullLengthPhoto, {
            access: 'private',
        });

        // Upload Close-Up Photo to Vercel Blob
        const closeUpExt = path.extname(closeUpPhoto.name).toLowerCase() || '.jpg';
        const closeUpFileName = `${registrationId}-closeUp${closeUpExt}`;
        const closeUpBlob = await put(closeUpFileName, closeUpPhoto, {
            access: 'private',
        });

        const registrationData = {
            registrationId,
            id: registrationId,
            name,
            fullName: name,
            instagramUsername,
            dateOfBirth,
            dob: dateOfBirth,
            email,
            phone,
            whatsapp,
            height,
            state,
            city,
            pincode,
            fullLengthPhoto: fullLengthBlob.url,
            closeUpPhoto: closeUpBlob.url,
            paymentStatus: 'PENDING',
            paymentAmount: 0
        };

        const registration = await addRegistration(registrationData);

        // Log "Registration processed successfully"
        console.log('Registration processed successfully');

        try {
            const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000';
            const protocol = request.headers.get('x-forwarded-proto') || 'https';
            const baseUrl = `${protocol}://${host}`;

            const adminSuccess = await sendAdminNotificationEmail(registration, baseUrl);
            if (!adminSuccess) {
                throw new Error('SMTP admin notification mail failure');
            }

            const candidateSuccess = await sendCandidateRegistrationEmail(registration, baseUrl);
            if (!candidateSuccess) {
                throw new Error('SMTP candidate registration mail failure');
            }

            console.log('Emails sent successfully');
        } catch (emailErr) {
            console.error('Secure email sending failed:', emailErr);
            return NextResponse.json({
                error: 'Registration details stored, but email notifications failed to send. Please check configurations or try again.'
            }, {
                status: 500,
                headers: corsHeaders
            });
        }

        return NextResponse.json({ success: true, registration }, { status: 201, headers: corsHeaders });
    } catch (error) {
        console.error('API Register error:', error);
        return NextResponse.json({ error: 'An error occurred during registration creation.' }, { status: 500, headers: corsHeaders });
    }
}