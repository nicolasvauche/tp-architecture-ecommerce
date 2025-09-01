import app from "./presentation/http/index.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HTTP up on :${PORT}`));
