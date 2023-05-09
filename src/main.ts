import * as dotenv from 'dotenv';
import { AWSWordpressService } from './template/services/aws-wordpress.service';

const main = async () => {
  /** configure to use environment variables */
  dotenv.config();

  /** execute program */
  const program = new AWSWordpressService();
  await program.run();
};

main();
