module.exports = function(sequelize, Sequelize) {
  const Post = sequelize.define("Post", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },

    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });
  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return Post;
};
