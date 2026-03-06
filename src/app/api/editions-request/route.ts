import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_eVQUk824_4BNCo1CGtYjMh7bn2D9dYgLm');

// With free Resend tier, you can only send to your verified email
const TO_EMAIL = 'verdier.den@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { printId, printName, name, email, message } = body;

    // Validate required fields
    if (!printId || !printName || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const editionRequest = await db.editionRequest.create({
      data: {
        printId,
        printName,
        name,
        email,
        message: message || null,
      },
    });

    // Send email notification
    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Nouvelle demande d'édition limitée: ${printName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0a6ff8;">Nouvelle demande d'édition limitée</h2>
            
            <div style="background: #f6ead7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">${printName}</h3>
              <p style="margin: 0; color: #666;">Format: 30x40cm · 50€</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nom:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 8px 0;">${message}</td>
              </tr>
              ` : ''}
            </table>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              Demande envoyée le ${new Date().toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API error:', error);
      } else {
        console.log('Email sent successfully:', data);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      id: editionRequest.id 
    });
  } catch (error) {
    console.error('Edition request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const requests = await db.editionRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Fetch edition requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
