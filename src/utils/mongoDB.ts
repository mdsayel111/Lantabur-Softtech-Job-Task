const mongoose = require('mongoose');

export const connectDB = async () => {

    // @ts-ignore
    if (!global.isConnectDB) {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DB_URL}`);
        // @ts-ignore
        // set isconnectDb true if once connection successful with DB
        global.isConnectDB = true

        const db = mongoose.connection

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log('Connected to MongoDB');
        });
        return
    }
    return
}
