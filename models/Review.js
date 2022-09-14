module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      text: DataTypes.STRING,
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  )

  Review.associate = (models) => {
    Review.belongsTo(models.Pharmacy, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
    Review.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
  }

  return Review
}
