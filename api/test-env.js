// Test endpoint to check environment variables
export default async function handler(req, res) {
  // Allow both GET and POST for testing
  const allEnvVars = Object.keys(process.env);
  const calVars = allEnvVars.filter(key => key.includes('CAL') || key.includes('cal'));
  
  return res.json({
    message: "Environment variables test",
    totalEnvVars: allEnvVars.length,
    calRelatedVars: calVars,
    calApiKeyExists: !!process.env.CAL_COM_API_KEY,
    calApiKeyLength: process.env.CAL_COM_API_KEY ? process.env.CAL_COM_API_KEY.length : 0,
    calApiKeyPrefix: process.env.CAL_COM_API_KEY ? process.env.CAL_COM_API_KEY.substring(0, 10) + "..." : "not found",
    allEnvVars: allEnvVars.sort()
  });
}
