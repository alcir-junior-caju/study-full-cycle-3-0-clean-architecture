import { ProductFactory } from "../../../domain/product";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

const product = ProductFactory.create(
  'a',
  'Product Name',
  100,
);

const input = {
  id: product.id,
  name: 'Product Name 2',
  price: 200,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
};

describe('Unit test update product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);
    const output = await usecase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it('should throw error when name is empty', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await expect(usecase.execute({
      ...input,
      name: '',
    })).rejects.toThrowError('Product name is required');
  });

  it('should throw error when price is zero', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await expect(usecase.execute({
      ...input,
      price: 0,
    })).rejects.toThrowError('Product price must be greater than zero');
  });
});
