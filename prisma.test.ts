describe("User", () => {
  const prisma = jestPrisma.client;

  test("Add user", async () => {
    const createdUser = await prisma.user.create({
      data: {
        nickname: "user1",
        email: "user1@example.com",
      },
    });

    expect(
      await prisma.user.findFirst({
        where: {
          nickname: "user1",
        },
      })
    ).toStrictEqual(createdUser);
  });

  test("Count user", async () => {
    expect(await prisma.user.count()).toBe(0);
  });
});
