module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {},
    {
      underscored: true,
    }
  )

  Contact.associate = (models) => {
    Contact.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    Contact.belongsTo(models.Pharmacy, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
  }

  return Contact
}
