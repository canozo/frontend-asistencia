const globals = {
  server: 'http://localhost:5000',
  regex: {
    username: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    accountNum: /[1-9]([0-9]{7,9})/,
  },
};

export default globals;
