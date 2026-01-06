const app = require("./app");

// Load PORT from .env or use 5000 as default
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
