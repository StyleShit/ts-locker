const defaultKey = Symbol('default-key');

type UnlockCallback<T = any> = (unlockKey: symbol) => T;

export function createLocker(key: symbol) {
	const unlockCallbacks = new WeakSet<UnlockCallback>();

	function lock<T>(data: T) {
		const unlockCallback = (unlockKey: symbol): T => {
			if (unlockKey !== key) {
				throw 'Invalid key!';
			}

			return data;
		};

		unlockCallbacks.add(unlockCallback);

		return unlockCallback;
	}

	function isUnlockCallback<T>(data: T): data is T & UnlockCallback {
		return unlockCallbacks.has(data as UnlockCallback);
	}

	function unlock<T>(data: T): T extends UnlockCallback ? ReturnType<T> : T {
		if (isUnlockCallback(data)) {
			return data(key);
		}

		// TODO: Find a better way to handle this.
		return data as T extends UnlockCallback ? ReturnType<T> : T;
	}

	return {
		lock,
		unlock,
	};
}

export const { lock, unlock } = createLocker(defaultKey);
