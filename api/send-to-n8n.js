// Webhook endpoint to send booking data to n8n
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bookingData = req.body;

    // Your n8n webhook URL - replace with your actual n8n webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "https://your-n8n-instance.com/webhook/booking-created";

    // Send data to n8n
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Structured payload for n8n
        event_type: "booking_created",
        booking_id: bookingData.booking_id,
        booking_uid: bookingData.booking_uid,
        meeting_url: bookingData.meeting_url,
        start_time: bookingData.start_time,
        end_time: bookingData.end_time,
        duration_minutes: bookingData.duration_minutes,
        attendee_name: bookingData.attendee_name,
        attendee_email: bookingData.attendee_email,
        host_name: bookingData.host_name,
        host_email: bookingData.host_email,
        event_type_name: bookingData.event_type_name,
        retell_call_id: bookingData.retell_call_id,
        created_at: bookingData.created_at,
        
        // Additional metadata
        source: "retell_voice_agent",
        timestamp: new Date().toISOString()
      })
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed: ${n8nResponse.status}`);
    }

    return res.json({
      success: true,
      message: "Data sent to n8n successfully",
      n8n_status: n8nResponse.status
    });

  } catch (error) {
    console.error('Error sending to n8n:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
