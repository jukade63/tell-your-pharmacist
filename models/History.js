module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    'History',
    {},
    {
      underscored: true,
    }
  )

  History.associate = (models) => {
    History.belongsTo(models.Pharmacy, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
    History.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    History.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
    })
  }

  return History
}
