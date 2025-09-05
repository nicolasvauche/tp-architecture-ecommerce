describe("VO — OrderNumber", () => {
  test("generate() produit ORD-<year>-0001, puis -0002 (avec date figée)", async () => {
    jest.resetModules();
    const { OrderNumber } = await import(
      "../../../../../src/core/orders/value-objects/OrderNumber.js"
    );

    const now = new Date("2025-09-05T12:00:00Z");
    const n1 = OrderNumber.generate(now);
    const n2 = OrderNumber.generate(now);

    expect(n1.value).toBe("ORD-2025-0001");
    expect(n2.value).toBe("ORD-2025-0002");
  });

  test("accepte un numéro explicite via le constructeur", async () => {
    jest.resetModules();
    const { OrderNumber } = await import(
      "../../../../../src/core/orders/value-objects/OrderNumber.js"
    );

    const num = new OrderNumber("ORD-2024-0042");
    expect(num.value).toBe("ORD-2024-0042");
  });

  test("le compteur repart à 0001 quand le module est réimporté", async () => {
    jest.resetModules();
    const { OrderNumber: ON1 } = await import(
      "../../../../../src/core/orders/value-objects/OrderNumber.js"
    );
    const now = new Date("2030-01-02T00:00:00Z");
    const a = ON1.generate(now);
    expect(a.value).toBe("ORD-2030-0001");

    jest.resetModules();
    const { OrderNumber: ON2 } = await import(
      "../../../../../src/core/orders/value-objects/OrderNumber.js"
    );
    const b = ON2.generate(now);
    expect(b.value).toBe("ORD-2030-0001");
  });
});
