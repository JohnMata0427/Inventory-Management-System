import { app } from './server.js';

const PORT = app.get('port')

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));