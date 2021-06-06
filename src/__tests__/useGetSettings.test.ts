import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import "jest";
import { useGetSettings } from "../hooks/api/useGetSettings";
const response = { ip: false, proxy: false };
jest.mock("axios");

test("if response null no changes", () => {
  (axios.get as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({ data: null })
  );
  const { result } = renderHook(() => useGetSettings("ipRestrictions"));

  expect(axios.get).toHaveBeenCalledWith("/admin/setting/ipRestrictions/");
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(result.current).toEqual(null);
});

test("change of renderId shoud refetch", () => {
  let renderId = "";

  (axios.get as jest.Mock).mockImplementation(() =>
    Promise.resolve({ data: null })
  );

  const { result, rerender } = renderHook(() =>
    useGetSettings("ipRestrictions", renderId)
  );
  expect(result.current).toBe(null);
  expect(axios.get).toHaveBeenCalledTimes(1);
  renderId = "changed";

  rerender();
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test("if response valid change hook result", (done) => {
  console.error = jest.fn();
  const res = { data: { settings: JSON.stringify(response) } };
  (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(res));

  const { result } = renderHook(() => useGetSettings("ipRestrictions"));
  expect(result.current).toBe(null);

  expect(axios.get).toHaveBeenCalledTimes(1);

  setTimeout(() => {
    expect(result.current).toMatchObject(response);
    done();
  }, 0);
});

test("If axis rejects value shoul null no error throws", () => {
  (axios.get as jest.Mock).mockImplementationOnce(() => Promise.reject());

  const { result } = renderHook(() => useGetSettings("ipRestrictions"));
  expect(result.current).toBe(null);

  expect(axios.get).toHaveBeenCalledTimes(1);
});
