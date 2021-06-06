import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import "jest";
import { useAnimatedHeight } from "../../hooks/effects/useAnimatedHeight";

const contentHeight = 300;
const getRefCurrent = () => {
  const wrapper = document.createElement("div");
  const content = document.createElement("div");

  content.style.height = `${contentHeight}px`;
  wrapper.appendChild(content);
  wrapper.style.overflow = "hidden";
  wrapper.classList.add("hidden");
  return wrapper;
};

afterEach(cleanup);

test("Is not open wrapper height equal 0", () => {
  const ref = {
    current: getRefCurrent(),
  };
  renderHook(() => useAnimatedHeight(ref, false));

  if (!ref || !ref.current) {
    throw new Error("No ref given");
  }
  expect(ref.current.style.height).toBe("0px");
  expect(ref.current.classList.contains("hidden")).toBe(true);
});

test("Is open wrapper height equal scrollHeight", () => {
  const ref = {
    current: getRefCurrent(),
  };

  jest.spyOn(ref.current.classList, "remove");
  renderHook(() => useAnimatedHeight(ref, true));

  expect(ref.current.classList.remove).toHaveBeenCalledWith("hidden");
});

test("ref.current === null should not throw", () => {
  const ref = {
    current: null,
  };

  expect(() => renderHook(() => useAnimatedHeight(ref, true))).not.toThrow();
});
