export const EC2Service = jest.fn().mockReturnValue({
  create_key_pair: jest.fn().mockResolvedValue({}),
});
