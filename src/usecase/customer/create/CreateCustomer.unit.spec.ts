import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

const input = {
  name: 'John Doe',
  address: {
    street: 'Street 1',
    number: 100,
    city: 'City 1',
    state: 'State 1',
    zipCode: 'ZipCode 1',
  }
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe('Unit test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);
    const output = await usecase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      ...input,
    });
  });
});
