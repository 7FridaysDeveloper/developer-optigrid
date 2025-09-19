import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildGravityFormsEndpoint, createWordPressAuthHeader } from '@/lib/wordpress-utils';

// Newsletter form validation schema
const newsletterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    recaptchaToken: z.string().nullable().optional(),
});

interface GravityFormsNewsletterSubmission {
    input_1: string; // Email field
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate the incoming data
        const validatedData = newsletterSchema.parse(data);

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
                secret: process.env.GOOGLE_RECAPTCHA_SECRET || '',
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
        if (recaptchaResult.score < 0.4) {
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'Security verification failed. Please try again.',
                    message: 'Your submission appears to be suspicious.'
                },
                { status: 400 }
            );
        }

        // Convert to Gravity Forms format
        const gravityFormsData: GravityFormsNewsletterSubmission = {
            input_1: validatedData.email,
        };

        // Get Gravity Forms credentials
        const gravityFormsUsername = process.env.GRAVITY_FORMS_USERNAME;
        const gravityFormsPassword = process.env.GRAVITY_FORMS_PASSWORD;

        if (!gravityFormsUsername || !gravityFormsPassword) {
            throw new Error('Gravity Forms credentials are missing');
        }

        // Build endpoint and auth header for newsletter form (ID=1)
        const gravityFormsEndpoint = buildGravityFormsEndpoint(1);
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
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'Newsletter subscription failed. Please try again.',
                    message: gravityResponseData.message || 'Unknown error occurred.'
                },
                { status: gravityResponse.status }
            );
        }

        // Success response
        return NextResponse.json({
            status: 'success',
            success: true,
            message: "Thanks for subscribing to OptiGrid's newsletter!",
            id: gravityResponseData.id || null,
        });

    } catch (error) {
        // Validation error
        if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
            return NextResponse.json(
                {
                    status: 'error',
                    error: 'Invalid email address. Please check your input.',
                    message: 'Please enter a valid email address.'
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
