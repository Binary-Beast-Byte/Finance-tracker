module.exports = (sequelize, DataTypes) => {
    const Investment = sequelize.define("Investment", {
        amount: {
            type: DataTypes.INTEGER,
        allownNull: false,
        defaultValue: 0
        },
        description: {
            type: DataTypes.STRING,
            allownNull: false,
        },

    });
  
    return Investment;
  };
  