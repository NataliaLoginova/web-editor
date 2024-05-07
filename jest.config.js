module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleDirectories: ['node_modules', 'src'],
    modulePathIgnorePatterns: [],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(ts|js|jsx)$': 'babel-jest',
        '^.+\\.tsx?$': ['ts-jest', {
            babelConfig: true,
            tsconfig: 'tsconfig.json',
        }]
    },
    transformIgnorePatterns: [
        'node_modules/(?!d3|d3-array|d3-scale|d3-interpolate|d3-color|d3-format|internmap|delaunator|robust-predicates)',
    ],
    clearMocks: true,
    fakeTimers: {
        enableGlobally: false
    },
    coverageDirectory: 'coverage',
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
