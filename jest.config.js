/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|tsx)?$': [
			'ts-jest',
			{
				diagnostics: {
					ignoreCodes: ['TS151001'],
				},
			},
		],
	},
	coverageThreshold: {
		global: {
			lines: 100,
		},
	},
};
