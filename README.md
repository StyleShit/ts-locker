# Locker

Control access to experimental or unstable methods in TypeScript applications with 100% type-safety.

## Purpose of this Package

When developing modules that include experimental or unstable methods, it's crucial to ensure that users of your module handle these methods with caution.
By locking certain pieces of data or methods, you can make sure that other developers accessing your module are explicitly aware of the risks and implications of using them.
Essentially, by requiring them to unlock the data, you're asking for their acknowledgment that they understand and accept the associated risks.

This package aims to:

-   Secure experimental or unstable methods and ensure they're not accessed unintentionally.
-   Promote safer coding practices by making developers explicitly unlock risky functionalities.

## Installation

```bash
npm install @styleshit/locker
# OR
yarn add @styleshit/locker
# OR
pnpm add @styleshit/locker
```

## Usage

### 1. Using the default Locker

For a module `data-module.ts` that wants to share data with another module:

```typescript
// data-module.ts
import { lock } from '@styleshit/locker';

const experimentalFunction = () => {
	console.log('This is an experimental function');
};

export const lockedFunction = lock(experimentalFunction);
```

Another module can then unlock this data, acknowledging the risks:

```typescript
// consumer-module.ts
import { unlock } from '@styleshit/locker';
import { lockedFunction } from './data-module';

const unlockedFunction = unlock(lockedFunction);
console.log(unlockedFunction()); // Outputs: 'This is an experimental function'
```

### 2. Creating a custom Locker

In a module `custom-locker.ts`, you can create a custom locker:

```typescript
// custom-locker.ts
import { createLocker } from '@styleshit/locker';

const uniqueKey = Symbol('myUniqueKey');
export const { lock, unlock } = createLocker(uniqueKey);
```

Then, in a module `data-module.ts`, you can lock data using this custom locker:

```typescript
// data-module.ts
import { lock } from './custom-locker';

const data = { message: 'Custom Locker' };
export const lockedData = lock(data);
```

Subsequently, in a consumer module, the data can be unlocked:

```typescript
// consumer-module.ts
import { unlock } from './custom-locker';
import { lockedData } from './data-module';

const unlockedData = customLocker.unlock(lockedData);
console.log(unlockedData); // Outputs: { message: 'Custom Locker' }
```

## API

### `createLocker( key: Symbol ): { lock, unlock }`

Creates a new locker based on the provided unique key. Returns an object containing `lock` and `unlock` methods specific to that key.

-   `key`: A unique Symbol that will act as the identifier for the locker.

### `lock(data: T): UnlockCallback<T>`

Locks the provided data, ensuring that it requires intentional unlocking by the user.

-   `data`: Any data you wish to lock.

### `unlock(data: UnlockCallback<T>): T`

Unlocks the provided locked data, signaling the user's acknowledgment of potential risks.

-   `data`: The locked data to be unlocked.
