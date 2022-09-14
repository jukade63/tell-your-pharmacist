module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      latitude: DataTypes.FLOAT(10, 6),
      longitude: DataTypes.FLOAT(10, 6),
    },
    {
      underscored: true,
    }
  )

  Address.associate = (models) => {
    Address.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
  }

  return Address
}
