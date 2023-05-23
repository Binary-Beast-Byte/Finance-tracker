module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    // User has many Incomes
    User.hasMany(models.Income, {
      foreignKey: 'userId',
      as: 'incomes',
    });

    // User has many ExpenseBudgets
    User.hasMany(models.expense_budget, {
      foreignKey: 'userId',
      as: 'expenseBudgets',
    });

    // User has many Savings
    User.hasMany(models.saving_budget, {
      foreignKey: 'userId',
      as: 'savings',
    });

    // User has many Investments
    User.hasMany(models.Investment, {
      foreignKey: 'userId',
      as: 'investments',
    });
  };

  return User;
};
