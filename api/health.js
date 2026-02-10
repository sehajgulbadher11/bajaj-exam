module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL || "default@example.com"
    });
  } else {
    res.status(405).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL || "default@example.com",
      error: "Method Not Allowed"
    });
  }
};
