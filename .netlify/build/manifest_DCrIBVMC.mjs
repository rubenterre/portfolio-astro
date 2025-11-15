import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_D09295gS.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/","cacheDir":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/node_modules/.astro/","outDir":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/dist/","srcDir":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/src/","publicDir":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/public/","buildClientDir":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/dist/","buildServerDir":"file:///Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DCrIBVMC.mjs","/Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/src/components/Portfolio.svelte":"_astro/Portfolio.DJX0fdCd.js","/Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/src/components/Youtube.svelte":"_astro/Youtube.CE9wkivK.js","@astrojs/svelte/client.js":"_astro/client.svelte.2ZHKnZtS.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.SezT8vvq.css","/Ruben_Arturo_Terre_Lameiro_CV2025.pdf","/Ruben_Terre_Logo_blanco.svg","/favicon.png","/rubenterre__OGraph.jpeg","/_astro/Portfolio.DJX0fdCd.js","/_astro/Youtube.CE9wkivK.js","/_astro/attributes.BLIi40X7.js","/_astro/client.svelte.2ZHKnZtS.js","/_astro/index.BIsjwR1S.css","/_astro/render.CJZM2fhM.js","/_astro/template.B2Ue2pjr.js","/favicon/favicon_152x152@1x.png","/favicon/favicon_167x167@1x.png","/favicon/favicon_16x16@1x.png","/favicon/favicon_180x180@1x.png","/favicon/favicon_192x192@1x.png","/favicon/favicon_32x32@1x.png","/favicon/favicon_48x48@1x.png","/favicon/favicon_512x512@1x.png","/favicon/favicon_96x96@1x.png","/images/ADM_Comunicaciones_web.avif","/images/ADM_Comunicaciones_web.png","/images/GaliciaWeather_app.avif","/images/GaliciaWeather_app.png","/images/Libro_destino_viquingo.avif","/images/Libro_destino_viquingo.webp","/images/MuseoPoboGalego_Concept.avif","/images/MuseoPoboGalego_Concept.webp","/images/RubenTerre.avif","/images/RubenTerre.jpeg","/images/RubenTerre.webp","/images/SoloHistoria.avif","/images/SoloHistoria.webp","/images/destino_viquingo_web.avif","/images/destino_viquingo_web.png","/fonts/Poppins-Bold.ttf","/fonts/Poppins-Medium.ttf","/fonts/Poppins-Regular.ttf","/fonts/Sora-VariableFont_wght.ttf","/icons/badge.svg","/icons/badge_icon.svg","/icons/brand-github.svg","/icons/download.svg","/icons/email_icon.svg","/icons/github_icon_white.svg","/icons/link-icon.svg","/icons/link_symbol-1.png","/icons/link_symbol.svg","/icons/location.avif","/icons/location_icon.svg","/icons/profile.avif","/icons/box_icons/behance_box.svg","/icons/box_icons/github_box.svg","/icons/box_icons/instagram_box.svg","/icons/box_icons/linkedin_box.svg","/icons/box_icons/youtube_box.png","/icons/box_icons/youtube_box.svg","/icons/sections/about_icon.svg","/icons/sections/contact_icon.svg","/icons/sections/education-experience_icon.svg","/icons/sections/portfolio_icon.svg","/icons/sections/skills_icon.svg","/icons/sections/website_icon.svg","/icons/sections/youtube_icon.svg","/icons/logos/ADM-500x133_blanco.svg","/icons/logos/INVBIT_LOGOTIPO.svg","/icons/logos/RT_logo.svg","/icons/logos/USC-Logo2.svg","/icons/logos/YouTube_light_logo_(2017).svg","/icons/logos/afundacion.svg","/icons/logos/ap-logo-blanco-medium-1.svg","/icons/logos/captioma_logo.svg","/icons/logos/cec.svg","/icons/logos/forga_white.svg","/icons/logos/gri_logo.svg","/icons/skills/after-effects_icon.svg","/icons/skills/astro_icon.svg","/icons/skills/bootstrap_icon.svg","/icons/skills/classroom_icon.svg","/icons/skills/css_icon.svg","/icons/skills/figma_icon.svg","/icons/skills/firebase_icon.svg","/icons/skills/github_icon.svg","/icons/skills/html5_icon.svg","/icons/skills/illustrator_icon.svg","/icons/skills/indesign_icon.svg","/icons/skills/javascript_icon.svg","/icons/skills/moodle_icon.svg","/icons/skills/photoshop_icon.svg","/icons/skills/prezi_icon.svg","/icons/skills/quizizz_icon.svg","/icons/skills/sass_icon.svg","/icons/skills/sketch_dark_icon.svg","/icons/skills/svelte_icon.svg","/icons/skills/vite_icon.svg","/icons/skills/wordpress_icon.svg","/icons/technologies/after-effects_icon_white.svg","/icons/technologies/bootstrap_icon_white.svg","/icons/technologies/css_icon_white.svg","/icons/technologies/figma_icon_white.svg","/icons/technologies/html5_icon_white.svg","/icons/technologies/illustrator_icon_white.svg","/icons/technologies/indesign_icon_white.svg","/icons/technologies/javascript_icon_white.svg","/icons/technologies/photoshop_icon_white.svg","/icons/technologies/sketch_icon_white.svg","/icons/technologies/svelte_icon_white.svg","/icons/technologies/wordpress_icon_white.svg","/icons/social/behance.avif","/icons/social/behance.png","/icons/social/behance.svg","/icons/social/github.avif","/icons/social/github.png","/icons/social/github.svg","/icons/social/linkedin.avif","/icons/social/linkedin.png","/icons/social/linkedin.svg","/icons/social/youtube.avif","/icons/social/youtube.png","/icons/social/youtube.svg","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"yJTwB64HT7PfZ1METClxFjetprmg58JpdlJNnOu1HgU=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/rubenarturoterrelameiro/Documents/GitHub/portfolio-astro/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
