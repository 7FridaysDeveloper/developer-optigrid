import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas';
import { buildGravityFormsEndpoint, createWordPressAuthHeader } from '@/lib/wordpress-utils';

interface GravityFormsSubmission {
    input_14: string; // Your name
    input_7: string;  // Work email
    input_5?: string; // Preferred meeting date
    input_9?: string; // Phone number
    input_6: string;  // Tell us more
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate the incoming data
        const validatedData = contactFormSchema.parse(data);

        // Verify reCAPTCHA v3 token
        if (!validatedData.recaptchaToken || validatedData.recaptchaToken === null) {
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'reCAPTCHA verification failed',
                    message: 'Security verification is required. Please try again.'
                },
                { status: 400 }
            );
        }

        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET || '',
                response: validatedData.recaptchaToken,
            }),
        });

        const recaptchaResult = await recaptchaResponse.json();

        // Check reCAPTCHA verification
        if (!recaptchaResult.success) {
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'reCAPTCHA verification failed. Please try again.',
                    message: 'Security verification failed.'
                },
                { status: 400 }
            );
        }

        // Check reCAPTCHA score (v3 specific - higher is better, 0.0-1.0)
        // 0.5 is a reasonable threshold - lower scores indicate suspicious activity
        if (recaptchaResult.score < 0.5) {
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'Security verification failed. Please try again.',
                    message: 'Your submission appears to be suspicious.'
                },
                { status: 400 }
            );
        }

        // Convert Next.js form data to Gravity Forms format
        const gravityFormsData: GravityFormsSubmission = {
            input_14: validatedData.first_name,
            input_7: validatedData.email,
            input_6: validatedData.message,
        };


        // Add optional fields if provided
        if (validatedData.meetingDate) {
            gravityFormsData.input_5 = validatedData.meetingDate;
        }

        if (validatedData.phone) {
            gravityFormsData.input_9 = validatedData.phone;
        }

        // Get Gravity Forms endpoint and credentials
        const gravityFormsUsername = process.env.GRAVITY_FORMS_USERNAME;
        const gravityFormsPassword = process.env.GRAVITY_FORMS_PASSWORD;

        if (!gravityFormsUsername || !gravityFormsPassword) {
            throw new Error('Gravity Forms credentials are missing');
        }

        // Build endpoint and auth header using utility functions
        const gravityFormsEndpoint = buildGravityFormsEndpoint(2);
        const credentials = createWordPressAuthHeader(gravityFormsUsername, gravityFormsPassword);

        // Submit to Gravity Forms
        const gravityResponse = await fetch(gravityFormsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
            body: JSON.stringify(gravityFormsData),
        });

        const gravityResponseData = await gravityResponse.json();

        if (!gravityResponse.ok) {

            // Check if it's a reCAPTCHA error
            if (gravityResponseData.message && gravityResponseData.message.includes('recaptcha')) {
                return NextResponse.json(
                    {
                        status: 'error',
                        error: 'reCAPTCHA verification failed. Please try again.',
                        message: 'Please complete the reCAPTCHA verification.'
                    },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                {
                    status: 'error',
                    error: 'Form submission failed. Please try again.',
                    message: gravityResponseData.message || 'Unknown error occurred.'
                },
                { status: gravityResponse.status }
            );
        }

        // Success response
        return NextResponse.json({
            status: 'success',
            message: 'Thank you for your message! We will get back to you soon.',
            id: gravityResponseData.id || null,
        });

    } catch (error) {
        // Validation error
        if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'Invalid form data. Please check your inputs.',
                    message: 'Please fill in all required fields correctly.',
                    details: error
                },
                { status: 400 }
            );
        }

        // Generic error
        return NextResponse.json(
            {
                status: 'error',
                error: 'Internal server error. Please try again later.',
                message: 'Something went wrong. Please try again.'
            },
            { status: 500 }
        );
    }
}
