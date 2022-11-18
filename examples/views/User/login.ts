export const loginSchema = [
  {
    label: "Username",
    prop: "username",
    rules: [
      {
        required: true,
        message: "please input username",
        trigger: "blur",
      },
    ],
  },
  {
    label: "Password",
    prop: "password",
    componentProps: {
      type: "password",
    },
    rules: [
      {
        required: true,
        message: "please input password",
        trigger: "blur",
      },
    ],
  },
];
