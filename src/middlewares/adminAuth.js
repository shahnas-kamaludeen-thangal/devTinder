const adminAuthentication = (req, res, next) => {
  console.log("Auth checking...");
  const token = "ABCD";
  if (token === "ABC") {
    console.log("Auth check success");
    next();
  } else {
    res.status(401).send("UnAuthorized!");
  }
};

module.exports = { adminAuthentication };
