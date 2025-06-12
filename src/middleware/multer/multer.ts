import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage(); // Almacena la imagen en memoria (no en disco)

const upload = multer({ storage });

export default upload;