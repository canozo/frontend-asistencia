const globals = {
  // TODO
  // server: 'http://localhost:5000',
  server: 'http://ec2-3-86-140-112.compute-1.amazonaws.com',
  regex: {
    username: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    accountNum: /[1-9]([0-9]{7,9})/,
  },
};

export default globals;
