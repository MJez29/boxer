import { getContext } from "svelte";

export const TOAST_KEY = Symbol("Toast context");
export const getToastContext = () => getContext(TOAST_KEY);
