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
    Contact.hasMany(models.Chat, {
      foreignKey: {
        name: 'contactId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
  }

  return Contact
}
