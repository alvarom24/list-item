import { Item } from './item';

describe('Item', () => {
  it('should create an instance', () => {
    expect(new Item()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new Item({
      title: 'camera',
      image: '/'
    });
    expect(todo.title).toEqual('camera');
    expect(todo.image).toEqual('/');
  });
});
