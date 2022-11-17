import { PrismaEnvironmentDelegate } from "@quramy/jest-prisma-core";
export default {
    name: "prisma",
    async setup(global) {
        const delegate = new PrismaEnvironmentDelegate({
            // @ts-ignore
            projectConfig: {
                testEnvironmentOptions: {},
            },
            // @ts-ignore
            globalConfig: {
                rootDir: "",
            },
        }, {
            testPath: "",
        });
        global.delegate = delegate;
        global.jestPrisma = await delegate.preSetup();
        return {
            async teardown() {
                await delegate.teardown();
            },
        };
    },
};
