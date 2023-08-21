import { CreateShip } from './ships';

test('test correct creation of object', () => {
    const newShip = new CreateShip('cruiser', 4);
    expect(newShip.name).toBe('cruiser');
    expect(newShip.length).toBe(4);
})
