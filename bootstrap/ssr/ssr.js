import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link as Link$1, usePage, useForm, createInertiaApp } from "@inertiajs/react";
import classNames from "classnames";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
const Button = ({
  children,
  variant = "primary",
  size = "normal",
  disabled = false,
  type = "button",
  onClick,
  className,
  ...props
}) => {
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
};
const Link = ({
  children,
  href,
  variant = "default",
  method = "get",
  as = "a",
  onBefore,
  className,
  ...props
}) => {
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
};
const Input = ({
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
}) => {
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
};
const TextArea = ({
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
}) => {
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
};
const Alert = ({ children, type = "success", className }) => {
  const alertClasses = classNames(
    "alert",
    `alert-${type}`,
    className
  );
  return /* @__PURE__ */ jsx("div", { className: alertClasses, children });
};
const Card = ({
  children,
  variant = "default",
  padding = "normal",
  className,
  ...props
}) => {
  const cardClasses = classNames(
    "post-card",
    {
      "post-card--featured": variant === "featured",
      "post-card--compact": padding === "small",
      "post-card--spacious": padding === "large"
    },
    className
  );
  return /* @__PURE__ */ jsx("div", { className: cardClasses, ...props, children });
};
const DefaultLayout = ({ children }) => {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs("div", { className: "app-layout", children: [
    /* @__PURE__ */ jsx("div", { className: "topbar", children: /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between align-items-center pl-5 pr-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-0 mt-0 text-white", children: "Blog" }),
      auth.user ? /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center gap-3", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
          "Привет, ",
          auth.user.name,
          "!"
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/logout", method: "post", variant: "button", children: "Выйти" })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "d-flex gap-2", children: [
        /* @__PURE__ */ jsx(Link, { href: "/login", variant: "button", children: "Войти" }),
        /* @__PURE__ */ jsx(Link, { href: "/register", variant: "button", children: "Регистрация" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "app-content", children: [
      /* @__PURE__ */ jsx("div", { className: "sidebar", children: /* @__PURE__ */ jsxs("nav", { className: "sidebar-nav", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "sidebar-link", children: "Все посты" }),
        auth.user && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { href: "/my-posts", className: "sidebar-link", children: "Мои посты" }),
          /* @__PURE__ */ jsx(Link, { href: "/posts/create", className: "sidebar-link", children: "Создать пост" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "main-content", children })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "footer", children: /* @__PURE__ */ jsx("div", { className: "container text-center", children: /* @__PURE__ */ jsx("p", { className: "mb-0 text-muted", children: "© 2025 Blog" }) }) })
  ] });
};
function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/login");
  };
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-center mb-4", children: "Вход" }),
    errors.email && /* @__PURE__ */ jsx(Alert, { variant: "danger", type: "danger", children: errors.email }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "email",
          placeholder: "Email",
          value: data.email,
          onChange: (e) => setData("email", e.target.value),
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "password",
          placeholder: "Пароль",
          value: data.password,
          onChange: (e) => setData("password", e.target.value),
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, className: "w-100", children: processing ? "Вход..." : "Войти" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-3", children: /* @__PURE__ */ jsxs("p", { children: [
      "Нет аккаунта? ",
      /* @__PURE__ */ jsx("a", { href: "/register", children: "Зарегистрируйтесь" })
    ] }) })
  ] }) }) }) }) }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/register");
  };
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-center mb-4", children: "Регистрация" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Имя",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        errors.name && /* @__PURE__ */ jsx("div", { className: "text-danger small mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "email",
            placeholder: "Email",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("div", { className: "text-danger small mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "password",
            placeholder: "Пароль",
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        errors.password && /* @__PURE__ */ jsx("div", { className: "text-danger small mt-1", children: errors.password })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "password",
          placeholder: "Подтверждение пароля",
          value: data.password_confirmation,
          onChange: (e) => setData("password_confirmation", e.target.value),
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, className: "w-100", children: processing ? "Регистрация..." : "Зарегистрироваться" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-3", children: /* @__PURE__ */ jsxs("p", { children: [
      "Уже есть аккаунт? ",
      /* @__PURE__ */ jsx("a", { href: "/login", children: "Войдите" })
    ] }) })
  ] }) }) }) }) }) });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function Forbidden() {
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsx("div", { className: "container text-center", children: /* @__PURE__ */ jsxs("div", { className: "py-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "display-1", children: "403" }),
    /* @__PURE__ */ jsx("h2", { className: "mb-4", children: "Доступ запрещен" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted mb-4", children: "У вас нет прав для доступа к этой странице." }),
    /* @__PURE__ */ jsx(Link, { href: "/", variant: "button", children: "Вернуться на главную" })
  ] }) }) }) });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Forbidden
}, Symbol.toStringTag, { value: "Module" }));
function NotFound() {
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsx("div", { className: "container text-center", children: /* @__PURE__ */ jsxs("div", { className: "py-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "display-1", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mb-4", children: "Страница не найдена" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted mb-4", children: "К сожалению, запрашиваемая страница не существует." }),
    /* @__PURE__ */ jsx(Link, { href: "/", variant: "button", children: "Вернуться на главную" })
  ] }) }) }) });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
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
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Назад к постам" }) }),
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
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
const Edit = ({ post }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title,
    content: post.content
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/posts/${post.url}`);
  };
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "content container-small", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Назад к постам" }) }),
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
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
const Index = ({ posts }) => {
  const { flash, auth } = usePage().props;
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
      auth.user && auth.user.id === post.user_id && /* @__PURE__ */ jsxs("div", { className: "post-actions", children: [
        /* @__PURE__ */ jsx(Link, { href: `/posts/${post.url}/edit`, children: /* @__PURE__ */ jsx(Button, { variant: "success", size: "small", children: "Изменить" }) }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: `/posts/${post.url}`,
            method: "delete",
            as: "button",
            onBefore: () => confirm("Вы уверены, что хотите удалить этот пост?"),
            className: "btn-danger btn-small",
            children: "Удалить"
          }
        )
      ] })
    ] }) }, post.id)) })
  ] }) });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const MyPosts = ({ posts }) => {
  const { delete: destroy } = useForm();
  const handleDelete = (post) => {
    if (confirm("Вы уверены, что хотите удалить этот пост?")) {
      destroy(`/posts/${post.url}`);
    }
  };
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between align-items-center mb-4", children: [
      /* @__PURE__ */ jsx("h1", { children: "Мои посты" }),
      /* @__PURE__ */ jsx(Link, { href: "/posts/create", variant: "button", children: "Создать новый пост" })
    ] }),
    posts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-5", children: [
      /* @__PURE__ */ jsx("h3", { children: "У вас пока нет постов" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted", children: "Создайте свой первый пост!" }),
      /* @__PURE__ */ jsx(Link, { href: "/posts/create", variant: "button", children: "Создать пост" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "row", children: posts.map((post) => /* @__PURE__ */ jsx("div", { className: "col-md-6 col-lg-4 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "card h-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h5", { className: "card-title", children: post.title }),
        /* @__PURE__ */ jsxs("p", { className: "card-text", children: [
          post.content.substring(0, 100),
          post.content.length > 100 && "..."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "small text-muted mb-3", children: new Date(post.created_at).toLocaleDateString("ru-RU") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "card-footer", children: /* @__PURE__ */ jsxs("div", { className: "d-flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: `/posts/${post.url}`,
            variant: "button",
            children: "Читать"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: `/posts/${post.url}/edit`,
            variant: "button",
            children: "Редактировать"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "danger",
            size: "md",
            onClick: () => handleDelete(post),
            children: "Удалить"
          }
        )
      ] }) })
    ] }) }, post.id)) })
  ] }) }) });
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MyPosts
}, Symbol.toStringTag, { value: "Module" }));
const Show = ({ post }) => {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "content container-small", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Назад к постам" }) }),
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
      auth.user && auth.user.id === post.user_id && /* @__PURE__ */ jsxs("div", { className: "article-actions", children: [
        /* @__PURE__ */ jsx(Link, { href: `/posts/${post.url}/edit`, children: /* @__PURE__ */ jsx(Button, { variant: "success", size: "small", children: "Редактировать" }) }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: `/posts/${post.url}`,
            method: "delete",
            as: "button",
            onBefore: () => confirm("Вы уверены, что хотите удалить этот пост?"),
            className: "btn-danger btn-small",
            children: "Удалить"
          }
        )
      ] })
    ] })
  ] }) });
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/Login.tsx": __vite_glob_0_0, "./Pages/Auth/Register.tsx": __vite_glob_0_1, "./Pages/Errors/Forbidden.tsx": __vite_glob_0_2, "./Pages/Errors/NotFound.tsx": __vite_glob_0_3, "./Pages/Posts/Create.tsx": __vite_glob_0_4, "./Pages/Posts/Edit.tsx": __vite_glob_0_5, "./Pages/Posts/Index.tsx": __vite_glob_0_6, "./Pages/Posts/MyPosts.tsx": __vite_glob_0_7, "./Pages/Posts/Show.tsx": __vite_glob_0_8 });
      return pages[`./Pages/${name}.tsx`];
    },
    setup({ App, props }) {
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
