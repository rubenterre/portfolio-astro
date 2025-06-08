import 'clsx';

const HYDRATION_START = '[';
const HYDRATION_END = ']';

const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;

class HeadPayload {
	/** @type {Set<{ hash: string; code: string }>} */
	css = new Set();
	out = '';
	uid = () => '';
	title = '';

	constructor(css = new Set(), out = '', title = '', uid = () => '') {
		this.css = css;
		this.out = out;
		this.title = title;
		this.uid = uid;
	}
}

class Payload {
	/** @type {Set<{ hash: string; code: string }>} */
	css = new Set();
	out = '';
	uid = () => '';
	select_value = undefined;

	head = new HeadPayload();

	constructor(id_prefix = '') {
		this.uid = props_id_generator(id_prefix);
		this.head.uid = this.uid;
	}
}

/**
 * Creates an ID generator
 * @param {string} prefix
 * @returns {() => string}
 */
function props_id_generator(prefix) {
	let uid = 1;
	return () => `${prefix}s${uid++}`;
}

/** @import { ComponentType, SvelteComponent } from 'svelte' */
/** @import { Component, RenderOutput } from '#server' */
/** @import { Store } from '#shared' */

/**
 * Array of `onDestroy` callbacks that should be called at the end of the server render function
 * @type {Function[]}
 */
let on_destroy = [];

/**
 * Only available on the server and when compiling with the `server` option.
 * Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
 * @template {Record<string, any>} Props
 * @param {import('svelte').Component<Props> | ComponentType<SvelteComponent<Props>>} component
 * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} [options]
 * @returns {RenderOutput}
 */
function render(component, options = {}) {
	const payload = new Payload(options.idPrefix ? options.idPrefix + '-' : '');

	const prev_on_destroy = on_destroy;
	on_destroy = [];
	payload.out += BLOCK_OPEN;

	if (options.context) {
		push();
		/** @type {Component} */ (current_component).c = options.context;
	}

	// @ts-expect-error
	component(payload, options.props ?? {}, {}, {});

	if (options.context) {
		pop();
	}

	payload.out += BLOCK_CLOSE;
	for (const cleanup of on_destroy) cleanup();
	on_destroy = prev_on_destroy;

	let head = payload.head.out + payload.head.title;

	for (const { hash, code } of payload.css) {
		head += `<style id="${hash}">${code}</style>`;
	}

	return {
		head,
		html: payload.out,
		body: payload.out
	};
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function stringify(value) {
	return typeof value === 'string' ? value : value == null ? '' : value + '';
}

/** @param {any} array_like_or_iterator */
function ensure_array_like(array_like_or_iterator) {
	if (array_like_or_iterator) {
		return array_like_or_iterator.length !== undefined
			? array_like_or_iterator
			: Array.from(array_like_or_iterator);
	}
	return [];
}

/** @import { Component } from '#server' */

/** @type {Component | null} */
var current_component = null;

/**
 * @param {Function} [fn]
 */
function push(fn) {
	current_component = { p: current_component, c: null, d: null };
}

function pop() {
	var component = /** @type {Component} */ (current_component);

	var ondestroy = component.d;

	if (ondestroy) {
		on_destroy.push(...ondestroy);
	}

	current_component = component.p;
}

/** @import { Snippet } from 'svelte' */
/** @import { Payload } from '../payload' */
/** @import { Getters } from '#shared' */

/**
 * Create a snippet programmatically
 * @template {unknown[]} Params
 * @param {(...params: Getters<Params>) => {
 *   render: () => string
 *   setup?: (element: Element) => void | (() => void)
 * }} fn
 * @returns {Snippet<Params>}
 */
function createRawSnippet(fn) {
	// @ts-expect-error the types are a lie
	return (/** @type {Payload} */ payload, /** @type {Params} */ ...args) => {
		var getters = /** @type {Getters<Params>} */ (args.map((value) => () => value));
		payload.out += fn(...getters)
			.render()
			.trim();
	};
}

const contexts = /* @__PURE__ */ new WeakMap();
const ID_PREFIX = "s";
function getContext(rendererContextResult) {
  if (contexts.has(rendererContextResult)) {
    return contexts.get(rendererContextResult);
  }
  const ctx = {
    currentIndex: 0,
    get id() {
      return ID_PREFIX + this.currentIndex.toString();
    }
  };
  contexts.set(rendererContextResult, ctx);
  return ctx;
}
function incrementId(rendererContextResult) {
  const ctx = getContext(rendererContextResult);
  const id = ctx.id;
  ctx.currentIndex++;
  return id;
}

function check(Component) {
  if (typeof Component !== "function") return false;
  return Component.toString().includes("$$payload");
}
function needsHydration(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, slotted, metadata) {
  const tagName = needsHydration(metadata) ? "astro-slot" : "astro-static-slot";
  let children = void 0;
  let $$slots = void 0;
  let idPrefix;
  if (this && this.result) {
    idPrefix = incrementId(this.result);
  }
  const renderProps = {};
  for (const [key, value] of Object.entries(slotted)) {
    $$slots ??= {};
    if (key === "default") {
      $$slots.default = true;
      children = createRawSnippet(() => ({
        render: () => `<${tagName}>${value}</${tagName}>`
      }));
    } else {
      $$slots[key] = createRawSnippet(() => ({
        render: () => `<${tagName} name="${key}">${value}</${tagName}>`
      }));
    }
    const slotName = key === "default" ? "children" : key;
    renderProps[slotName] = createRawSnippet(() => ({
      render: () => `<${tagName}${key !== "default" ? ` name="${key}"` : ""}>${value}</${tagName}>`
    }));
  }
  const result = render(Component, {
    props: {
      ...props,
      children,
      $$slots,
      ...renderProps
    },
    idPrefix
  });
  return { html: result.body };
}
const renderer = {
  name: "@astrojs/svelte",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/svelte","clientEntrypoint":"@astrojs/svelte/client.js","serverEntrypoint":"@astrojs/svelte/server.js"}, { ssr: server_default }),];

export { pop as a, ensure_array_like as e, push as p, renderers as r, stringify as s };
