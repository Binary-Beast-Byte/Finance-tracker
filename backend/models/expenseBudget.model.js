module.exports = (sequelize, DataTypes) => {
    const ExpenseBudget = sequelize.define("expense_budget", {
        amount: {
            type: DataTypes.INTEGER,
        allownNull: false,
        defaultValue: 0
        },
    });
  
    return ExpenseBudget;
  };
  