import {
  CloudFormationClient,
  CreateStackCommand,
  CreateStackCommandInput,
  CreateStackCommandOutput,
  DescribeStacksCommand,
  DescribeStacksCommandInput,
} from '@aws-sdk/client-cloudformation';

import { readFile } from 'fs/promises';

export class CloudformationService {
  client: CloudFormationClient;

  constructor() {
    this.client = new CloudFormationClient({ region: 'us-east-1' });
  }

  /**
   * A method to create a cloudformation stack with a EC2 and Wordpress
   * @param key_name key pair name to EC2
   * @param db_password user password to database
   * @param db_user username to access database
   * @param db_root_password root password to databse
   * @returns Promise<CreateStackCommandOutput>
   */
  async create_stack_wordpress(
    stack_name: string,
    key_name: string,
    db_password: string,
    db_user: string,
    db_root_password: string,
  ): Promise<CreateStackCommandOutput> {
    const fs = await readFile('cloudformation.json', 'utf-8');

    const params: CreateStackCommandInput = {
      StackName: stack_name,
      // TemplateURL: process.env.AZION_WP_TEMPLATE_URL,
      TemplateBody: fs,
      Parameters: [
        {
          ParameterKey: 'KeyName',
          ParameterValue: key_name,
          UsePreviousValue: false,
        },
        {
          ParameterKey: 'DBPassword',
          ParameterValue: db_password,
          UsePreviousValue: false,
        },
        {
          ParameterKey: 'DBUser',
          ParameterValue: db_user,
          UsePreviousValue: false,
        },
        {
          ParameterKey: 'DBRootPassword',
          ParameterValue: db_root_password,
          UsePreviousValue: false,
        },
      ],
    };
    const command = new CreateStackCommand(params);

    return await this.client.send(command);
  }

  async describe_stacks(stack_name: string) {
    const params: DescribeStacksCommandInput = {
      StackName: stack_name,
    };

    const command = new DescribeStacksCommand(params);
    return await this.client.send(command);
  }
}
