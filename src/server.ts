import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// Database and MongoDB Connection
async function main() {
  try {
    await mongoose.connect(config.DB_URL as string);
    app.listen(config.PORT, () => {
      console.log(`Dr Tech API Listening on port 👉 ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
