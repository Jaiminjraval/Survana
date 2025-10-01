import User from "../models/user.model.js";

export const upgradeToPremium = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.subscription = "premium";
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error in upgradeToPremium controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelPremium = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.subscription = "free";
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error in cancelPremium controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
