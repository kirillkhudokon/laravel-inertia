import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link, createInertiaApp } from "@inertiajs/react";
import { useState } from "react";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
function DefaultLayout({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      "header",
      /* @__PURE__ */ jsx("hr", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }),
      " |",
      /* @__PURE__ */ jsx(Link, { href: "/other", children: "Other" }),
      /* @__PURE__ */ jsx("hr", {})
    ] }),
    /* @__PURE__ */ jsx("div", { children }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("hr", {}),
      "footer"
    ] })
  ] });
}
function HomePage({ a }) {
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsx("div", { children: a }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
function OtherPage() {
  const [name, setName] = useState("");
  return /* @__PURE__ */ jsxs(DefaultLayout, { children: [
    /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value.trim()) }),
    name.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      "Hello, ",
      name
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OtherPage
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Home.jsx": __vite_glob_0_0, "./Pages/Other.jsx": __vite_glob_0_1 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup({ App, props }) {
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
