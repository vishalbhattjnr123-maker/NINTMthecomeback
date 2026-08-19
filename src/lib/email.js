import nodemailer from 'nodemailer';

function getAndValidateSmtpConfig() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM;
    const adminEmail = process.env.ADMIN_EMAIL;

    const missing = [];
    if (!smtpHost) missing.push('SMTP_HOST');
    if (!smtpPort) missing.push('SMTP_PORT');
    if (!smtpUser) missing.push('SMTP_USER');
    if (!smtpPass) missing.push('SMTP_PASS');
    if (!smtpFrom) missing.push('SMTP_FROM');
    if (!adminEmail) missing.push('ADMIN_EMAIL');

    if (missing.length > 0) {
        console.error(`[SMTP configuration missing] Missing required SMTP environment variables: ${missing.join(', ')}`);
        return null;
    }

    return {
        host: smtpHost,
        port: parseInt(smtpPort),
        user: smtpUser,
        pass: smtpPass,
        from: smtpFrom,
        admin: adminEmail
    };
}

async function createSmtpTransporter(config) {
    try {
        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.port === 465,
            auth: {
                user: config.user,
                pass: config.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        await transporter.verify();
        console.log(`[SMTP connection/authentication success] SMTP handshake verified with ${config.host}:${config.port}`);
        return transporter;
    } catch (err) {
        console.error(`[SMTP connection/authentication failure] Failed to verify connection to ${config.host}:${config.port}:`, err.message);
        return null;
    }
}

export async function sendConfirmationEmail(candidate) {
    const config = getAndValidateSmtpConfig();

    const formattedDate = new Date(candidate.paymentDate || new Date().toISOString()).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const emailSubject = `NINTM – THE COMEBACK 2026: Registration Successful (${candidate.registrationId})`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; background-color: #081C3A; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">NINTM</h1>
                <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">THE COMEBACK 2026</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; text-transform: uppercase; margin-top: 0;">Registration Successful</h2>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Hello ${candidate.name},
                </p>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Your registration for <strong>NINTM &ndash; THE COMEBACK 2026</strong> has been successfully completed and confirmed.
                </p>
            </div>

            <div style="background-color: #0B2347; border: 1px solid #D4AF37; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #D4AF37; text-transform: uppercase; font-size: 12px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 8px;">Dossier Credentials</h3>
                <table style="width: 100%; font-size: 13px; color: #D9E1EC; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold; width: 40%;">Registration ID:</td>
                        <td style="padding: 6px 0; color: #D4AF37; font-family: monospace; font-weight: bold;">${candidate.registrationId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Name:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${candidate.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Registration Fee:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">₹${candidate.paymentAmount}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Gateway Payment ID:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${candidate.razorpayPaymentId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Date:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${formattedDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Status:</td>
                        <td style="padding: 6px 0; color: #22c55e; font-weight: bold;">PAID</td>
                    </tr>
                </table>
            </div>

            <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 20px; text-align: center;">
                <p style="color: #D4AF37; font-size: 13px; font-weight: bold; margin-bottom: 8px;">
                    Please keep your Registration ID for future communication.
                </p>
                <p style="color: #D9E1EC; font-size: 11px; line-height: 1.6; margin: 0;">
                    Our modeling review board will begin evaluating your profile submissions. Selected candidates will be notified for physical auditions.
                </p>
            </div>
        </div>
    `;

    const textBody = `
NINTM – THE COMEBACK 2026

Registration Successful!

Registration ID: ${candidate.registrationId}
Name: ${candidate.name}
Amount Paid: ₹${candidate.paymentAmount}
Payment ID: ${candidate.razorpayPaymentId}
Payment Date: ${formattedDate}
Payment Status: PAID

Please keep your Registration ID for future communication.
    `;

    if (!config) {
        return false;
    }

    const transporter = await createSmtpTransporter(config);
    if (!transporter) {
        return false;
    }

    try {
        await transporter.sendMail({
            from: config.from,
            to: candidate.email,
            subject: emailSubject,
            text: textBody,
            html: htmlBody
        });

        console.log(`[SMTP email send success] Confirmation email sent successfully to ${candidate.email}`);
        return true;
    } catch (error) {
        console.error(`[SMTP email send failure] Error sending confirmation email to ${candidate.email}:`, error.message);
        return false;
    }
}

export async function sendAdminNotificationEmail(data, baseUrl = '') {
    const config = getAndValidateSmtpConfig();
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!config) {
        return false;
    }

    const fullLengthPhotoUrl = (baseUrl && data.fullLengthPhoto)
        ? `${baseUrl}/api/photo?url=${encodeURIComponent(data.fullLengthPhoto)}`
        : (data.fullLengthPhoto || '');

    const closeUpPhotoUrl = (baseUrl && data.closeUpPhoto)
        ? `${baseUrl}/api/photo?url=${encodeURIComponent(data.closeUpPhoto)}`
        : (data.closeUpPhoto || '');

    const attachments = [];
    let hasFullLengthCid = false;
    let hasCloseUpCid = false;

    // Fetch and attach Full Length Photo internally as a CID attachment
    if (data.fullLengthPhoto && data.fullLengthPhoto.startsWith('https://') && token) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(data.fullLengthPhoto, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                const buffer = Buffer.from(await res.arrayBuffer());
                const contentType = res.headers.get('content-type') || 'image/jpeg';
                const ext = contentType.split('/')[1] || 'jpg';
                attachments.push({
                    filename: `fullLengthPhoto.${ext}`,
                    content: buffer,
                    cid: 'fullLengthPhoto',
                    contentType: contentType
                });
                hasFullLengthCid = true;
            } else {
                console.error(`Failed to fetch full length photo for cid attachment: ${res.statusText}`);
            }
        } catch (err) {
            console.error('Error fetching full length photo for email attachment:', err);
        }
    }

    // Fetch and attach Close-Up Photo internally as a CID attachment
    if (data.closeUpPhoto && data.closeUpPhoto.startsWith('https://') && token) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(data.closeUpPhoto, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                const buffer = Buffer.from(await res.arrayBuffer());
                const contentType = res.headers.get('content-type') || 'image/jpeg';
                const ext = contentType.split('/')[1] || 'jpg';
                attachments.push({
                    filename: `closeUpPhoto.${ext}`,
                    content: buffer,
                    cid: 'closeUpPhoto',
                    contentType: contentType
                });
                hasCloseUpCid = true;
            } else {
                console.error(`Failed to fetch close up photo for cid attachment: ${res.statusText}`);
            }
        } catch (err) {
            console.error('Error fetching close up photo for email attachment:', err);
        }
    }

    const formattedDate = new Date(data.createdAt || new Date().toISOString()).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const isRegistration = data.type !== 'inquiry';
    const subjectTitle = isRegistration ? 'New Registration Received' : 'New Inquiry Received';
    const emailSubject = `${subjectTitle} - ${data.name || 'Anonymous'}`;

    const textBody = `
NEW REGISTRATION / INQUIRY RECEIVED

Type: ${isRegistration ? 'Registration' : 'Inquiry'}
Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phone || 'N/A'}
WhatsApp: ${data.whatsapp || 'N/A'}
Date of Birth: ${data.dateOfBirth || data.dob || 'N/A'}
Instagram Username: ${data.instagramUsername || 'N/A'}
Height: ${data.height ? `${data.height} CM` : 'N/A'}
State: ${data.state || 'N/A'}
City: ${data.city || 'N/A'}
Pincode: ${data.pincode || 'N/A'}

Course: ${data.course || 'N/A'}
Service: ${data.service || 'N/A'}
Address: ${data.address || 'N/A'}
Message: ${data.message || 'N/A'}

Registration ID: ${data.registrationId || data.id || 'N/A'}
Payment Status: ${data.paymentStatus || 'PENDING'}
Payment Amount: ₹${data.paymentAmount || 0}
Razorpay Order ID: ${data.razorpayOrderId || 'N/A'}
Razorpay Payment ID: ${data.razorpayPaymentId || 'N/A'}

Submitted At: ${formattedDate}
    `;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; background-color: #081C3A; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">NINTM</h1>
                <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">THE COMEBACK 2026</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; text-transform: uppercase; margin-top: 0;">${subjectTitle}</h2>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Hello Admin,
                </p>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    A new ${isRegistration ? 'model registration' : 'inquiry submission'} has been successfully processed on the website. Here are the submission details:
                </p>
            </div>

            <div style="background-color: #0B2347; border: 1px solid #D4AF37; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #D4AF37; text-transform: uppercase; font-size: 12px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 8px;">Dossier Parameters</h3>
                <table style="width: 100%; font-size: 13px; color: #D9E1EC; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold; width: 40%;">Submission Type:</td>
                        <td style="padding: 6px 0; color: #D4AF37; font-weight: bold; text-transform: uppercase;">${isRegistration ? 'Registration' : 'Inquiry'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Full Name:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.name || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Email Address:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.email || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Phone Number:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${data.phone || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">WhatsApp Number:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${data.whatsapp || 'N/A'}</td>
                    </tr>
                    ${isRegistration ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Instagram Handle:</td>
                        <td style="padding: 6px 0; color: #ffffff;">@${data.instagramUsername || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Date of Birth:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.dateOfBirth || data.dob || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Height Index:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.height ? `${data.height} CM` : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">State:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.state || 'N/A'}</td>
                    </tr>
                    ` : ''}
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">City:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.city || 'N/A'}</td>
                    </tr>
                    ${isRegistration ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Pincode:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.pincode || 'N/A'}</td>
                    </tr>
                    ` : ''}
                    
                    ${data.course ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Course:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.course}</td>
                    </tr>
                    ` : ''}
                    ${data.service ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Service:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.service}</td>
                    </tr>
                    ` : ''}
                    ${data.address ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Address:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${data.address}</td>
                    </tr>
                    ` : ''}
                    ${data.message ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: top; vertical-align: top;">Message / Inquiry:</td>
                        <td style="padding: 6px 0; color: #ffffff; white-space: pre-wrap;">${data.message}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div style="background-color: #0B2347; border: 1px solid #D4AF37; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #D4AF37; text-transform: uppercase; font-size: 12px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 8px;">Registry & Payment Info</h3>
                <table style="width: 100%; font-size: 13px; color: #D9E1EC; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold; width: 40%;">Registration ID:</td>
                        <td style="padding: 6px 0; color: #D4AF37; font-family: monospace; font-weight: bold;">${data.registrationId || data.id || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Status:</td>
                        <td style="padding: 6px 0; color: ${data.paymentStatus === 'PAID' ? '#22c55e' : '#eab308'}; font-weight: bold;">${data.paymentStatus || 'PENDING'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Amount:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">₹${data.paymentAmount || 0}</td>
                    </tr>
                    ${data.razorpayOrderId ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Razorpay Order ID:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${data.razorpayOrderId}</td>
                    </tr>
                    ` : ''}
                    ${data.razorpayPaymentId ? `
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Razorpay Payment ID:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${data.razorpayPaymentId}</td>
                    </tr>
                    ` : ''}
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Submitted At:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${formattedDate}</td>
                    </tr>
                </table>
            </div>

            ${isRegistration && data.fullLengthPhoto && data.closeUpPhoto ? `
            <div style="background-color: #0B2347; border: 1px solid #D4AF37; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #D4AF37; text-transform: uppercase; font-size: 12px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 8px;">Uploaded Photos</h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="width: 50%; padding: 0 10px; text-align: center; vertical-align: top;">
                            <p style="color: #D4AF37; font-size: 11px; font-weight: bold; margin-top: 0; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Full Length</p>
                            <a href="${fullLengthPhotoUrl}" target="_blank" style="text-decoration: none; display: block;">
                                <img src="${hasFullLengthCid ? 'cid:fullLengthPhoto' : fullLengthPhotoUrl}" alt="Full Length Photo" style="width: 100%; max-width: 180px; height: auto; border: 2px solid #D4AF37; display: inline-block;" />
                            </a>
                        </td>
                        <td style="width: 50%; padding: 0 10px; text-align: center; vertical-align: top;">
                            <p style="color: #D4AF37; font-size: 11px; font-weight: bold; margin-top: 0; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Close-Up</p>
                            <a href="${closeUpPhotoUrl}" target="_blank" style="text-decoration: none; display: block;">
                                <img src="${hasCloseUpCid ? 'cid:closeUpPhoto' : closeUpPhotoUrl}" alt="Close-Up Photo" style="width: 100%; max-width: 180px; height: auto; border: 2px solid #D4AF37; display: inline-block;" />
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            ` : ''}

            <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 20px; text-align: center;">
                <p style="color: #D9E1EC; font-size: 11px; margin: 0;">
                    This is an automated security broadcast notification originating from the NINTM Server portal.
                </p>
            </div>
        </div>
    `;

    const transporter = await createSmtpTransporter(config);
    if (!transporter) {
        return false;
    }

    try {
        await transporter.sendMail({
            from: config.from,
            to: config.admin,
            subject: emailSubject,
            text: textBody,
            html: htmlBody,
            attachments: attachments
        });

        console.log(`[SMTP email send success] Admin notification email sent successfully to ${config.admin}`);
        return true;
    } catch (error) {
        console.error(`[SMTP email send failure] Error sending admin notification email to ${config.admin}:`, error.message);
        return false;
    }
}

export async function sendCandidateRegistrationEmail(candidate, baseUrl = '') {
    const config = getAndValidateSmtpConfig();

    if (!config) {
        return false;
    }

    const formattedDate = new Date(candidate.createdAt || new Date().toISOString()).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const emailSubject = `NINTM – THE COMEBACK 2026: Registration Received (${candidate.registrationId})`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; background-color: #081C3A; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">NINTM</h1>
                <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">THE COMEBACK 2026</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; text-transform: uppercase; margin-top: 0;">Registration Received</h2>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Hello ${candidate.name},
                </p>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Your registration details for <strong>NINTM &ndash; THE COMEBACK 2026</strong> have been received. Please complete your fee payment to finalize your audition slot.
                </p>
            </div>

            <div style="background-color: #0B2347; border: 1px solid #D4AF37; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #D4AF37; text-transform: uppercase; font-size: 12px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 8px;">Dossier Summary</h3>
                <table style="width: 100%; font-size: 13px; color: #D9E1EC; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold; width: 40%;">Registration ID:</td>
                        <td style="padding: 6px 0; color: #D4AF37; font-family: monospace; font-weight: bold;">${candidate.registrationId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Name:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${candidate.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Instagram Handle:</td>
                        <td style="padding: 6px 0; color: #ffffff;">@${candidate.instagramUsername || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Registration Fee:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">₹699</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Status:</td>
                        <td style="padding: 6px 0; color: #eab308; font-weight: bold;">PENDING</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Registration Date:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${formattedDate}</td>
                    </tr>
                </table>
            </div>

            <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 20px; text-align: center;">
                <p style="color: #D4AF37; font-size: 13px; font-weight: bold; margin-bottom: 8px;">
                    Please keep your Registration ID for future communication.
                </p>
                <p style="color: #D9E1EC; font-size: 11px; line-height: 1.6; margin: 0;">
                    Complete your payment checkout if you haven't already. Selected candidates will be contacted for physical auditions once evaluation of all profiles is complete.
                </p>
            </div>
        </div>
    `;

    const textBody = `
NINTM – THE COMEBACK 2026

Registration details received!

Registration ID: ${candidate.registrationId}
Name: ${candidate.name}
Instagram Handle: @${candidate.instagramUsername || 'N/A'}
Fee: ₹699
Payment Status: PENDING
Registration Date: ${formattedDate}

Please keep your Registration ID for future communication.
    `;

    const transporter = await createSmtpTransporter(config);
    if (!transporter) {
        return false;
    }

    try {
        await transporter.sendMail({
            from: config.from,
            to: candidate.email,
            subject: emailSubject,
            text: textBody,
            html: htmlBody
        });

        console.log(`[SMTP email send success] Candidate registration confirmation email sent successfully to ${candidate.email}`);
        return true;
    } catch (error) {
        console.error(`[SMTP email send failure] Error sending candidate registration email to ${candidate.email}:`, error.message);
        return false;
    }
}

