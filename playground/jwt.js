import jwt from "jsonwebtoken";
const jwtsign = (sig) => {
  const token = jwt.sign({ _id: "1244tushar" }, sig,{expiresIn:'7 days'});
  console.log(token);

  const data = jwt.verify(token,sig)

  console.log(data)

};

jwtsign("secret");
