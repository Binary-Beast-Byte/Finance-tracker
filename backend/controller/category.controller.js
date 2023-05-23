const {
  Income,
  expense_budget,
  saving_budget,
  Investment,
  Users,
} = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const templates = require("../email/email.templates");
const sendEmail = require("../email/email.send");

const createCategory = async (req, res) => {
  const { category, amount } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    let createdData;

    switch (category) {
      case "income":
        const latestIncome = await Income.findOne({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });
        let previousIncome = 0;
        if (latestIncome) {
          previousIncome = latestIncome.amount;
        }
        const totalIncome = previousIncome + parseInt(amount);
        createdData = await Income.create({
          amount: totalIncome,
          userId,
          description: "income added",
        });
        break;

      case "expenseBudget":
        const latestIncomeForExpense = await Income.findOne({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });
        let previousIncomeForExpense = 0;
        if (latestIncomeForExpense) {
          previousIncomeForExpense = latestIncomeForExpense.amount;
        }
        const updatedIncomeForExpense =
          previousIncomeForExpense - parseInt(amount);
        if (updatedIncomeForExpense < 0) {
          return res
            .status(400)
            .json({ error: "Expense budget exceeds available income" });
        }
        createdData = await Income.create({
          amount: updatedIncomeForExpense,
          userId,
          description: "Expense deducted",
        });

        // Create a new expense record
        await expense_budget.create({ amount: parseInt(amount), userId });
        break;

      case "savings":
        const latestIncomeForSavings = await Income.findOne({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });
        let previousIncomeForSavings = 0;
        if (latestIncomeForSavings) {
          previousIncomeForSavings = latestIncomeForSavings.amount;
        }
        const updatedIncomeForSavings =
          previousIncomeForSavings + parseInt(amount);
        createdData = await Income.create({
          amount: updatedIncomeForSavings,
          userId,
          description: "Savings added",
        });

        // Create a new savings record
        await saving_budget.create({ amount: parseInt(amount), userId });
        break;

      case "investment":
        const latestIncomeForInvestment = await Income.findOne({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });
        let previousIncomeForInvestment = 0;
        if (latestIncomeForInvestment) {
          previousIncomeForInvestment = latestIncomeForInvestment.amount;
        }
        const updatedIncomeForInvestment =
          previousIncomeForInvestment + parseInt(amount);
        createdData = await Income.create({
          amount: updatedIncomeForInvestment,
          userId,
          description: "investment added",
        });

        // Create a new investment record
        await Investment.create({ amount: parseInt(amount), userId });
        break;

      default:
        return res.status(400).json({ error: "Invalid category provided" });
    }

    return res
      .status(201)
      .json({ message: `${category} Rs${amount} created Successfully`, data: createdData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating data" });
  }
};

const calculateIncomeFlow = async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    // Get the current date and time
    const currentDate = new Date();
    const twentyFourHoursAgo = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000
    );

    // Calculate the inflow within the last 24 hours
    const totalIncomeRecent = await Income.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    const outflow = await expense_budget.sum("amount", {
      where: {
        userId,
        createdAt: {
          [Op.between]: [twentyFourHoursAgo, currentDate],
        },
      },
    });

    const inflow = totalIncomeRecent.amount - outflow;
    const total = inflow - outflow;

    // Calculate the outflow within the last 24 hours
    // const latestIncome = await Income.findOne({
    //   where: { userId },
    //   order: [['createdAt', 'DESC']],
    // });
    // const outflow = latestIncome ? latestIncome.amount - inflow : 0;

    return res.status(200).json({ inflow, outflow, total });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while calculating income flow" });
  }
};


const getTableData = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: expense_budget,
          attributes: ["id", "amount"],
          as: "expenseBudgets",
        },
        {
          model: saving_budget,
          attributes: ["id", "amount"],
          as: "savings",
        },
        {
          model: Income,
          attributes: ["id", "amount"],
          as: "incomes",
        },
        {
          model: Investment,
          attributes: ["id", "amount"],
          as: "investments",
        },
      ],
    });

    const sampleData = [];

    users.forEach((user) => {
      const email = user.email;

      user.expenseBudgets.forEach((budget) => {
        sampleData.push({
          id: uuidv4(),
          email,
          category: "expense_budgets",
          amount: budget.amount,
          date: new Date(),
        });
      });

      user.savings.forEach((saving) => {
        sampleData.push({
          id: uuidv4(),
          email,
          category: "saving_budget",
          amount: saving.amount,
          date: new Date(),
        });
      });

      user.incomes.forEach((income) => {
        sampleData.push({
          id: uuidv4(),
          email,
          category: "income",
          amount: income.amount,
          date: new Date(),
        });
      });

      user.investments.forEach((investment) => {
        sampleData.push({
          id: uuidv4(),
          email,
          category: "investments",
          amount: investment.amount,
          date: new Date(),
        });
      });
    });

    res.json(sampleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

}


const getData = async (req, res) => {
  const { id: userId, email } = req.user
  console.log("🚀 ~ file: category.controller.js:250 ~ getData ~ email:", email)
  console.log("🚀 ~ file: category.controller.js:250 ~ getData ~ email:", userId)

  try {
    const recentIncome = await Income.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    const totalInvestment = await Investment.sum('amount', { where: { userId } });

    const totalExpense = await expense_budget.sum('amount', { where: { userId } });

    const totalSavings = await saving_budget.sum('amount', { where: { userId } });

    const data = [recentIncome?.amount, totalInvestment, totalExpense, totalSavings];

       // Check if recent income is less than 100
       if (recentIncome?.amount < 100) {
        sendEmail(email, templates.lowIncomeAlert())
 
      }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};


module.exports = {
  createCategory,
  calculateIncomeFlow,
  getTableData,
  getData
};
