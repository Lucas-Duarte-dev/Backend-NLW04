import { createConnection } from 'typeorm'

createConnection().then(() => console.log('DB is Running'));