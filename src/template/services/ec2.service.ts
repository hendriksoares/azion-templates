import {
  CreateKeyPairCommand,
  CreateKeyPairCommandInput,
  CreateKeyPairCommandOutput,
  EC2Client,
} from '@aws-sdk/client-ec2';

export class EC2Service {
  client: EC2Client;

  constructor() {
    this.client = new EC2Client({ region: 'us-east-1' });
  }

  async create_key_pair(key_name: string): Promise<CreateKeyPairCommandOutput> {
    const params: CreateKeyPairCommandInput = {
      KeyName: key_name,
    };

    const command = new CreateKeyPairCommand(params);
    return await this.client.send(command);
  }
}
