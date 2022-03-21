import app from './app';
import { connectDB } from './db'
import { SERVICE_PORT } from './config';

async function main() {
    try {
        await connectDB();
        app.listen(SERVICE_PORT);
        console.log(`Server listening on port ${SERVICE_PORT}`);
    } catch (error) {
       console.error(error) 
    }
}

main();
