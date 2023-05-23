module.exports = (sequelize, DataTypes) => {
    const SavingBudget = sequelize.define("saving_budget", {
      amount: {
        type: DataTypes.INTEGER,
    allownNull: false,
    defaultValue: 0
    },
       
    });
  
    return SavingBudget;
  };
  