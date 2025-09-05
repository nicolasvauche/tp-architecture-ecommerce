import { OrderId } from "../../../../../src/core/orders/value-objects/OrderId.js";

describe("VO — OrderId", () => {
  const uuidV4 =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  test("par défaut, génère un UUID v4 valide", () => {
    const id = new OrderId();
    expect(typeof id.value).toBe("string");
    expect(id.value).toMatch(uuidV4);
  });

  test("accepte une valeur fournie (string)", () => {
    const custom = "abc";
    const id = new OrderId(custom);
    expect(id.value).toBe("abc");
  });
});
