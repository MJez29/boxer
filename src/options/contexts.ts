import { getContext } from "svelte";

export const TOAST_KEY = Symbol("Toast context");
export const getToastContext = () => getContext(TOAST_KEY);

export const MODAL_KEY = Symbol("Modal context");
export const getModalContext = () => getContext(MODAL_KEY);
