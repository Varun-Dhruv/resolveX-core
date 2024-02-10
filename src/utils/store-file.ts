import * as fs from 'fs';
export const storeFile = (file: any) => {
  const path = `./static/${file.originalname}`;
  fs.writeFileSync(path, file.buffer);
  return file.originalname;
};
