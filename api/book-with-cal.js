// Vercel Serverless Function for Retell + Cal.com booking
// This function will be available at: https://your-domain.vercel.app/api/book-with-cal

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, call, args } = req.body;

    // 1) Extract parameters LLM supplied
    const {
      // You design these in your Retell function schema:
      eventTypeId,                 // number (or use eventTypeSlug + username/teamSlug)
      eventTypeSlug,
      username,
      teamSlug,
      organizationSlug,
      attendee,                    // { name, email, timeZone, phoneNumber? }
      startIsoUtc,                 // ensure this is *UTC* ISO (e.g., "2025-10-12T18:00:00Z")
      lengthInMinutes,             // optional
      metadata                     // optional; you can inject call_id here for later correlation
    } = args;

    // 2) Prepare Cal.com payload
    const payload = {
      start: startIsoUtc,                 // must be UTC ISO
      attendee,
      lengthInMinutes,
      eventTypeId,
      eventTypeSlug,
      username,
      teamSlug,
      organizationSlug,
      metadata: { 
        ...(metadata || {}), 
        retell_call_id: call?.call_id     // handy for n8n/Cal webhook correlation
      }
      // Optionally: guests, routing, location, bookingFieldsResponses...
    };

    // Remove undefined keys (tidy body)
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);

    // 3) Call Cal.com
    // Debug: Check if API key is available
    const apiKey = process.env.CAL_COM_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ 
        ok: false, 
        error: "CAL_COM_API_KEY environment variable is not set",
        debug: "Environment variables: " + JSON.stringify(Object.keys(process.env).filter(k => k.includes('CAL')))
      });
    }
    
    const resp = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13"
      },
      body: JSON.stringify(payload)
    });

    const text = await resp.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }

    // 4) Handle errors and extract fields
    if (!resp.ok) {
      // Cal.com returns message in JSON on errors; surface it for debugging
      return res.status(200).json({
        ok: false,
        status: resp.status,
        error: json?.message || json?.error || "Booking failed",
      });
    }

    const data = json?.data || json; // Cal.com wraps under {status, data}
    const result = {
      ok: true,
      status: resp.status,             // 201 on success
      bookingUid: data?.uid,
      bookingId: data?.id,
      start: data?.start,              // ISO string (UTC)
      end: data?.end,                  // ISO string (UTC)
      duration: data?.duration,
      meetingUrl: data?.meetingUrl || data?.location,
      attendee: data?.attendees?.[0],
      raw: data
    };

    // 5) Return compact JSON (Retell will stuff this into the LLM context & call_analyzed)
    return res.json(result);

  } catch (err) {
    return res.status(200).json({ ok: false, error: String(err) });
  }
}

