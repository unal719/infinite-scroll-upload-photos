import { getCookies, resetCookieByName } from "../shared/Helper";

describe("helpers", () => {
  describe("getCookies", () => {
    beforeEach(() => {
      resetCookieByName("test");
    });

    it("gets the provided cookie's value from cookies", () => {
      document.cookie = "test=1231;";
      const actual = getCookies("test");
      const expected = "1231";
      expect(actual).toBe(expected);
    });

    it("returns null when there is no value for the provided cookie doesn't exist", () => {
      const actual = getCookies("test");
      const expected = null;
      expect(actual).toBe(expected);
    });
  });

  describe("resetCookieByName", () => {
    it("expirs the provided cookie", () => {
      document.cookie = "test=1231;";

      expect(getCookies("test")).toBe("1231");

      resetCookieByName("test");

      expect(getCookies("test")).toBeFalsy();
    });
  });
});
