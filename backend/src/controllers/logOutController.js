const logOutController = {};

logOutController.logOut = async (req, res) => {
  res.clearCookie("authToken");

  return res.status(200).json({ message: "Log Out Successfully!" });
};

export default logOutController;