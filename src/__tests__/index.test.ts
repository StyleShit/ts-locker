import { lock, unlock, createLocker } from '../index';

describe('Locker', () => {
	it('should lock and unlock data using the default locker', () => {
		// Arrange.
		const data = { a: 1 };

		// Act.
		const locked = lock(data);

		// Assert.
		expect(unlock(locked)).toBe(data);
	});

	it('should lock and unlock data using a custom locker', () => {
		// Arrange.
		const data = { a: 1 };
		const locker = createLocker(Symbol('custom-key'));

		// Act.
		const locked = locker.lock(data);

		// Assert.
		expect(locker.unlock(locked)).toBe(data);
	});

	it('should throw an error when unlocking with an invalid key', () => {
		// Arrange.
		const data = { a: 1 };
		const locker1 = createLocker(Symbol('key-1'));
		const locker2 = createLocker(Symbol('key-2'));

		// Act.
		const locked = locker1.lock(data);

		// Assert.
		expect(() => locker2.unlock(locked)).toThrow('Invalid key!');
	});

	it("should return the given data if it's not locked", () => {
		// Arrange.
		const data = { a: 1 };

		// Act.
		const unlocked = unlock(data);

		// Assert.
		expect(unlocked).toBe(data);
	});
});
