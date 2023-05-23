module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define("Income", {
      amount: {
        type: DataTypes.INTEGER,
    allownNull: false,
    defaultValue: 0
    },
    description: {
      type: DataTypes.STRING,
      allownNull: true
    }
    });
  
    return Income;
  };
  