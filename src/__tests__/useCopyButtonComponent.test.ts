import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { cleanup } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import "jest";
import { useCopyButtonComponent } from "../adminComponents/CopyButton/useCopyButtonComponent";

const copyValue = "I am a test copy";
const copyTimeout = 3100;
afterEach(cleanup);

const getHook = () => {
  const { result } = renderHook(() => useCopyButtonComponent(copyValue));
  return result.current;
};

test("return object with key icon and onClick", () => {
  const hook = getHook();

  expect(hook.hasOwnProperty("icon")).toBe(true);
  expect(typeof hook).toBe("object");
  expect(hook.hasOwnProperty("onClick")).toBe(true);
  expect(typeof hook.onClick).toBe("function");
});

test("default icon and color", () => {
  const { result } = renderHook(() => useCopyButtonComponent(copyValue));
  const icon = result.current.icon;
  expect(icon.color).toBe("");
  expect(icon.icon).toBe(faCopy);
});

test("click copy", async () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: async () => {},
    },
  });
  const { result, waitForNextUpdate } = renderHook(() =>
    useCopyButtonComponent(copyValue)
  );
  jest.spyOn(navigator.clipboard, "writeText");
  act(() => {
    result.current.onClick();
  });

  await waitForNextUpdate();
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyValue);
  expect(result.current.icon.color).toBe(" text-green-600");
  expect(result.current.icon.icon).toBe(faCheck);
  await waitForNextUpdate({ timeout: copyTimeout });
  expect(result.current.icon.color).toBe("");
  expect(result.current.icon.icon).toBe(faCopy);
});

test("clipborad write text throws error", async () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: async () => {
        throw new Error("");
      },
    },
  });
  const { result, waitForNextUpdate } = renderHook(() =>
    useCopyButtonComponent(copyValue)
  );
  jest.spyOn(navigator.clipboard, "writeText");
  act(() => {
    result.current.onClick();
  });

  await waitForNextUpdate();
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyValue);
  expect(result.current.icon.color).toBe(" text-red-800");
  expect(result.current.icon.icon).toBe(faExclamationTriangle);
  await waitForNextUpdate({ timeout: copyTimeout });
  expect(result.current.icon.color).toBe("");
  expect(result.current.icon.icon).toBe(faCopy);
});
