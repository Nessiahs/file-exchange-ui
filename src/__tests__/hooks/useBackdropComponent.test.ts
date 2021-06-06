import { renderHook } from "@testing-library/react-hooks";
import "jest";
import { useBackdropComponent } from "../../adminComponents/Backdrop/useBackdropComponent";

test("no root given document.body is root", () => {
  const { result } = renderHook(() => useBackdropComponent());

  expect(result.current.portalRoot?.tagName).toBe("BODY");
  expect(result.current.el?.classList).toContain("portal");
  expect(result.current.el?.tagName).toBe("DIV");
  expect(result.current.el?.parentElement?.tagName).toBe("BODY");
});

test("root given", () => {
  const root = document.createElement("div");
  const { result } = renderHook(() => useBackdropComponent(root));
  expect(result.current.portalRoot).toBe(root);
  expect(result.current.el?.parentElement).toBe(root);
});
