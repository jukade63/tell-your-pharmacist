module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: DataTypes.ENUM(
        'PENDING',
        'PAID',
        'DELIVERING',
        'CANCELLED',
        'COMPLETED'
      ),
    },
    {
      underscored: true,
    }
  )

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
    Order.belongsTo(models.Pharmacy, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
    Order.hasMany(models.OrderDetail, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
  }

  return Order
}
