import { hello } from '../index';

describe('API', () => {
	it('should return hello world', () => {
		expect(hello()).toBe('hello world');
	});
});
