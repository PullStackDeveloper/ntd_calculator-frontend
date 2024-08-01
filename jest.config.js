module.exports = {
    testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|sass|scss)$": "<rootDir>/styleMock.js", // Adicionando mapeamento de estilo
    },
};
