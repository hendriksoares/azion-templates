import { main } from '../src/main';
import axios from 'axios';

/** mock @aws-sdk/client-ec2 */
jest.mock('@aws-sdk/client-ec2', () => ({
  EC2Client: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
  })),
  CreateKeyPairCommand: jest.fn().mockImplementation(() => ({})),
}));

/** mock @aws-sdk/client-ec2 */
jest.mock('@aws-sdk/client-cloudformation', () => ({
  CloudFormationClient: jest.fn().mockImplementation(() => ({
    send: jest
      .fn()
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({
        Stacks: [
          {
            Outputs: [
              {
                OutputValue: 'http://ec2-127-0-0-1.compute-1.amazonaws.com',
              },
            ],
          },
        ],
      }),
  })),
  CreateStackCommand: jest.fn().mockImplementation(() => ({})),
  DescribeStacksCommand: jest.fn().mockImplementation(() => ({})),
}));

/** mock axios */
/** TODO - add all mock response to post and get in order */
jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

axiosMock.post.mockResolvedValue({ data: { results: { id: '1' } } });

describe('AWS Wordpress - Main (e2e)', () => {
  let result: any;
  beforeEach(async () => {
    result = await main();
  });

  it('Run', () => {
    console.log(result);
  });
});
