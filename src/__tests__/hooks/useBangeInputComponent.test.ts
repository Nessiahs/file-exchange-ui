import { renderHook } from "@testing-library/react-hooks";
import "jest";
import { useBadgeInputComponent } from "../../adminComponents/BadgeInput/useBadgeInputComponent";

test("Basic hook return", () => {
  const setValue = jest.fn();
  const { result } = renderHook(() =>
    useBadgeInputComponent({
      value: [],
      setValue,
    })
  );

  expect(result.current.classNames).toBe("");
  expect(result.current.error).toBe("");
  expect(typeof result.current.deleteValue).toBe("function");
  expect(typeof result.current.onKeyDown).toBe("function");
});

test("className", () => {
  const setValue = jest.fn();
  const className = " text-bold text-right ";
  const { result } = renderHook(() =>
    useBadgeInputComponent({
      value: [],
      setValue,
      className,
    })
  );
  expect(result.current.classNames).toBe(className.trim());
});
