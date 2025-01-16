import { server } from "./server/Server.js";


server.listen(process.env.PORT || 3333, () => console.log('Server is Running!!'))
