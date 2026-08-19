import fs from 'fs';
import path from 'path';
import { list, put } from '@vercel/blob';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Check if running on Vercel/production and we have Vercel Blob credentials
const isServerless = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
const useRemoteBlob = isServerless && hasBlobToken;

// Ensure database directory and file exist locally (development fallback)
function initializeLocalDB() {
    if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ registrations: [] }, null, 2), 'utf-8');
    }
}

export async function getRegistrations() {
    if (useRemoteBlob) {
        try {
            const { blobs } = await list({ prefix: 'db.json' });
            const dbBlob = blobs.find(b => b.pathname === 'db.json');
            if (!dbBlob) {
                // If db.json does not exist on Vercel Blob, return empty dataset
                return [];
            }
            const res = await fetch(dbBlob.url, {
                headers: {
                    Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
                }
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch database file: ${res.statusText}`);
            }
            const data = await res.json();
            return data.registrations || [];
        } catch (error) {
            console.error('Error reading registration DB from Vercel Blob:', error);
            // Fallback to local fs in case of transient remote error
            try {
                initializeLocalDB();
                const data = fs.readFileSync(DB_FILE, 'utf-8');
                return JSON.parse(data).registrations || [];
            } catch (fsErr) {
                return [];
            }
        }
    } else {
        try {
            initializeLocalDB();
            const data = fs.readFileSync(DB_FILE, 'utf-8');
            return JSON.parse(data).registrations || [];
        } catch (error) {
            console.error('Error reading registration DB locally:', error);
            return [];
        }
    }
}

export async function saveRegistrations(registrations) {
    if (useRemoteBlob) {
        try {
            await put('db.json', JSON.stringify({ registrations }, null, 2), {
                access: 'private',
                addRandomSuffix: false
            });
            return true;
        } catch (error) {
            console.error('Error writing registration DB to Vercel Blob:', error);
            // Fallback to local fs in case of remote write error
            try {
                initializeLocalDB();
                fs.writeFileSync(DB_FILE, JSON.stringify({ registrations }, null, 2), 'utf-8');
                return true;
            } catch (fsErr) {
                return false;
            }
        }
    } else {
        try {
            initializeLocalDB();
            fs.writeFileSync(DB_FILE, JSON.stringify({ registrations }, null, 2), 'utf-8');
            return true;
        } catch (error) {
            console.error('Error writing to registration DB locally:', error);
            return false;
        }
    }
}

export async function addRegistration(data) {
    const registrations = await getRegistrations();

    // Generate unique Registration ID if not provided
    const registrationId = data.registrationId || data.id || `NINTM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRegistration = {
        registrationId,
        id: registrationId, // Alias for backward compatibility
        name: data.name || data.fullName || '',
        fullName: data.name || data.fullName || '', // Alias for backward compatibility
        instagramUsername: data.instagramUsername || '',
        dateOfBirth: data.dateOfBirth || data.dob || '',
        dob: data.dateOfBirth || data.dob || '', // Alias for backward compatibility
        email: data.email || '',
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        height: data.height || '',
        state: data.state || '',
        city: data.city || '',
        pincode: data.pincode || '',
        fullLengthPhoto: data.fullLengthPhoto || '',
        closeUpPhoto: data.closeUpPhoto || '',
        paymentStatus: data.paymentStatus || 'PENDING', // PENDING, PAID, FAILED
        paymentAmount: data.paymentAmount || 0,
        razorpayOrderId: data.razorpayOrderId || '',
        razorpayPaymentId: data.razorpayPaymentId || '',
        razorpaySignature: data.razorpaySignature || '',
        paymentDate: data.paymentDate || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        applicationStatus: data.applicationStatus || 'Payment Pending', // Admin review status alias
    };

    registrations.push(newRegistration);
    await saveRegistrations(registrations);
    return newRegistration;
}

export async function updateRegistration(id, updates) {
    const registrations = await getRegistrations();
    const index = registrations.findIndex(r => r.id === id || r.registrationId === id);
    if (index !== -1) {
        registrations[index] = {
            ...registrations[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        // Keep ID aliases synchronized
        if (updates.registrationId) registrations[index].id = updates.registrationId;
        if (updates.name) registrations[index].fullName = updates.name;
        if (updates.dateOfBirth) registrations[index].dob = updates.dateOfBirth;

        await saveRegistrations(registrations);
        return registrations[index];
    }
    return null;
}

export async function updateRegistrationStatus(id, paymentStatus, applicationStatus, paymentDetails = null) {
    const updates = {};
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (applicationStatus) updates.applicationStatus = applicationStatus;
    if (paymentDetails) {
        updates.razorpayPaymentId = paymentDetails.paymentId || '';
        updates.razorpayOrderId = paymentDetails.orderId || '';
        updates.razorpaySignature = paymentDetails.signature || '';
        updates.paymentDate = paymentDetails.date || new Date().toISOString();
        if (paymentDetails.amount) updates.paymentAmount = paymentDetails.amount;
    }
    return await updateRegistration(id, updates);
}

