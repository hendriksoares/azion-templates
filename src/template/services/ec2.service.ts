import {
  CreateKeyPairCommand,
  CreateKeyPairCommandInput,
  CreateKeyPairCommandOutput,
  DeleteKeyPairCommand,
  DeleteKeyPairCommandInput,
  DeleteKeyPairCommandOutput,
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

  async delete_key_pair(
    key_pair_id: string,
  ): Promise<DeleteKeyPairCommandOutput> {
    const params: DeleteKeyPairCommandInput = { KeyPairId: key_pair_id };

    const command = new DeleteKeyPairCommand(params);
    return await this.client.send(command);
  }
}
