import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link as Link$1, useForm, usePage, createInertiaApp } from "@inertiajs/react";
import classNames from "classnames";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
function Button({
  children,
  variant = "primary",
  size = "normal",
  disabled = false,
  type = "button",
  onClick,
  className,
  ...props
}) {
  const classes = classNames(
    "btn",
    `btn-${variant}`,
    {
      [`btn-${size}`]: size !== "normal"
    },
    className
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: classes,
      disabled,
      onClick,
      ...props,
      children
    }
  );
}
function Link({
  children,
  href,
  variant = "default",
  as = "a",
  method = "get",
  onBefore,
  className,
  ...props
}) {
  const classes = classNames(
    {
      "link": variant === "default",
      "link-button": variant === "button"
    },
    className
  );
  if (method !== "get" || as === "button") {
    return /* @__PURE__ */ jsx(
      Link$1,
      {
        href,
        method,
        as,
        className: classes,
        onBefore,
        ...props,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Link$1,
    {
      href,
      className: classes,
      ...props,
      children
    }
  );
}
function Input({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
  className,
  ...props
}) {
  const inputClasses = classNames(
    "input",
    {
      "error": error
    },
    className
  );
  return /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
    label && /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "form-label", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#dc3545" }, children: "*" })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        id,
        value,
        onChange,
        placeholder,
        className: inputClasses,
        ...props
      }
    ),
    error && /* @__PURE__ */ jsx("div", { className: "error-message", children: error })
  ] });
}
function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  error,
  required = false,
  className,
  ...props
}) {
  const textareaClasses = classNames(
    "textarea",
    {
      "error": error
    },
    className
  );
  return /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
    label && /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "form-label", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#dc3545" }, children: "*" })
    ] }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        id,
        value,
        onChange,
        placeholder,
        rows,
        className: textareaClasses,
        ...props
      }
    ),
    error && /* @__PURE__ */ jsx("div", { className: "error-message", children: error })
  ] });
}
function Alert({ children, type = "success", className }) {
  const alertClasses = classNames(
    "alert",
    `alert-${type}`,
    className
  );
  return /* @__PURE__ */ jsx("div", { className: alertClasses, children });
}
function Card({
  children,
  variant = "default",
  padding = "normal",
  className,
  ...props
}) {
  const cardClasses = classNames(
    "post-card",
    // базовый класс
    {
      // условные классы
      "post-card--featured": variant === "featured",
      "post-card--compact": padding === "small",
      "post-card--spacious": padding === "large"
    },
    className
    // дополнительные классы извне
  );
  return /* @__PURE__ */ jsx("div", { className: cardClasses, ...props, children });
}
function DefaultLayout({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "section-header", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("h2", { className: "mb-0", children: "Laravel Inertia Blog" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "section-nav", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", variant: "button", children: "Главная" }),
      /* @__PURE__ */ jsx(Link, { href: "/posts/create", variant: "button", children: "Создать пост" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "min-height-screen", children }),
    /* @__PURE__ */ jsx("div", { className: "section-footer", children: /* @__PURE__ */ jsx("div", { className: "container text-center", children: /* @__PURE__ */ jsx("p", { className: "mb-0 text-muted", children: "© 2025 Laravel Inertia Blog" }) }) })
  ] });
}
function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    content: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/posts");
  };
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "content container-small", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "← Назад к постам" }) }),
    /* @__PURE__ */ jsx("h1", { children: "Создать новый пост" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "title",
          label: "Заголовок",
          value: data.title,
          onChange: (e) => setData("title", e.target.value),
          placeholder: "Введите заголовок поста",
          error: errors.title,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        TextArea,
        {
          id: "content",
          label: "Содержание",
          value: data.content,
          onChange: (e) => setData("content", e.target.value),
          rows: 10,
          placeholder: "Введите содержание поста",
          error: errors.content,
          required: true
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "primary",
            disabled: processing,
            children: processing ? "Создание..." : "Создать пост"
          }
        ),
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Отмена" }) })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ post }) {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title,
    content: post.content
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/posts/${post.url}`);
  };
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "content container-small", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "← Назад к постам" }) }),
    /* @__PURE__ */ jsx("h1", { children: "Редактировать пост" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "title",
          label: "Заголовок",
          value: data.title,
          onChange: (e) => setData("title", e.target.value),
          placeholder: "Введите заголовок поста",
          error: errors.title,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        TextArea,
        {
          id: "content",
          label: "Содержание",
          value: data.content,
          onChange: (e) => setData("content", e.target.value),
          rows: 10,
          placeholder: "Введите содержание поста",
          error: errors.content,
          required: true
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "success",
            disabled: processing,
            children: processing ? "Сохранение..." : "Сохранить изменения"
          }
        ),
        /* @__PURE__ */ jsx(Link, { href: `/posts/${post.url}`, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Отмена" }) })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Index({ posts }) {
  const { flash } = usePage().props;
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "content container", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-between mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-0", children: "Все посты" }),
      /* @__PURE__ */ jsx(Link, { href: "/posts/create", children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Создать пост" }) })
    ] }),
    flash?.success && /* @__PURE__ */ jsx(Alert, { type: "success", children: flash.success }),
    posts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "empty-state", children: /* @__PURE__ */ jsxs("p", { children: [
      "Пока нет постов. ",
      /* @__PURE__ */ jsx(Link, { href: "/posts/create", children: "Создайте первый пост!" })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "posts-grid", children: posts.map((post) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs("div", { className: "flex-between", children: [
      /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2", children: /* @__PURE__ */ jsx(Link, { href: `/posts/${post.url}`, children: post.title }) }),
        /* @__PURE__ */ jsx("p", { className: "post-content-preview", children: post.content }),
        /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
          "Автор: ",
          post.user?.name || "Неизвестно",
          " | Создано: ",
          new Date(post.created_at).toLocaleDateString("ru-RU")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "post-actions", children: [
        /* @__PURE__ */ jsx(Link, { href: `/posts/${post.url}/edit`, children: /* @__PURE__ */ jsx(Button, { variant: "success", size: "small", children: "Изменить" }) }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: `/posts/${post.url}`,
            method: "delete",
            as: "button",
            onBefore: () => confirm("Вы уверены, что хотите удалить этот пост?"),
            children: /* @__PURE__ */ jsx(Button, { variant: "danger", size: "small", children: "Удалить" })
          }
        )
      ] })
    ] }) }, post.id)) })
  ] }) });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function Show({ post }) {
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "content container-small", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "← Назад к постам" }) }),
    /* @__PURE__ */ jsxs("article", { className: "article", children: [
      /* @__PURE__ */ jsxs("header", { className: "article-header", children: [
        /* @__PURE__ */ jsx("h1", { className: "article-title", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "article-meta", children: [
          "Автор: ",
          post.user?.name || "Неизвестно",
          " | Создано: ",
          new Date(post.created_at).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          post.updated_at !== post.created_at && /* @__PURE__ */ jsxs("span", { children: [
            " | Обновлено: ",
            new Date(post.updated_at).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "article-content", children: post.content.split("\n").map((paragraph, index) => /* @__PURE__ */ jsx("p", { children: paragraph }, index)) }),
      /* @__PURE__ */ jsxs("div", { className: "article-actions", children: [
        /* @__PURE__ */ jsx(Link, { href: `/posts/${post.url}/edit`, children: /* @__PURE__ */ jsx(Button, { variant: "success", children: "Редактировать" }) }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: `/posts/${post.url}`,
            method: "delete",
            as: "button",
            onBefore: () => confirm("Вы уверены, что хотите удалить этот пост?"),
            children: /* @__PURE__ */ jsx(Button, { variant: "danger", children: "Удалить" })
          }
        )
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Posts/Create.jsx": __vite_glob_0_0, "./Pages/Posts/Edit.jsx": __vite_glob_0_1, "./Pages/Posts/Index.jsx": __vite_glob_0_2, "./Pages/Posts/Show.jsx": __vite_glob_0_3 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup({ App, props }) {
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
