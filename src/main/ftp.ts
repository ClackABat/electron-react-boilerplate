import { Client } from 'basic-ftp';
import { IpcMainInvokeEvent } from 'electron';
import fs from 'fs';

export const handleFtpUpload = async (
  event: IpcMainInvokeEvent,
  filePaths: string[],
) => {
  // const client = new Client();
  // client.ftp.verbose = true;
  // try {
  //   await client.access({
  //     host: 'ftps.channeladvisor.com',
  //     user: 'FRMPFT:jefferson@orsicreative.com',
  //     password: 'Bright#5ide!',
  //     secure: true,
  //   });
  //   console.log(await client.list());
  // } catch (err) {
  //   console.log(err);
  // }
  // client.close();
  filePaths.forEach((filePath) => {
    const file = fs.readFileSync(filePath);
    console.log(file);
  });
};

export default handleFtpUpload;
