module.exports = {
  lowIncomeAlert: () => ({
    subject: 'Income Alert - Your Income is Low',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ff4d4d; padding: 10px; margin: 20px 0; text-align: center;">
          <p style="font-size: 16px; line-height: 1.5; color: white;">
            Income Alert!
          </p>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #555555;">
          Dear valued customer,
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #555555;">
          We wanted to notify you that your income is really low. It seems like your recent income is insufficient to meet your financial needs.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #555555;">
          We recommend taking immediate action to review your financial situation and explore opportunities to increase your income or reduce your expenses.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #555555;">
          If you need any assistance or guidance in managing your finances, please don't hesitate to contact us. We're here to help you.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #555555;">
          Best regards,
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #555555;">
          Ravi Neupane
        </p>
        <div style="background-color: #ff4d4d; padding: 10px; margin: 20px 0; text-align: center;">
          <h3 style="font-size: 18px; line-height: 1.5; color: #fff; margin-bottom: 10px;">Finance Tracker</h3>
        </div>
      </div>
    `
  }),
};
