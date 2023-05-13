module.exports = (sequelize, DataTypes) => {
  const HealthInfo = sequelize.define(
    'HealthInfo',
    {
      age: DataTypes.INTEGER,

      weight: DataTypes.INTEGER,

      height: DataTypes.INTEGER,

      allergy: DataTypes.STRING,

      diseases: DataTypes.STRING,

      medications: DataTypes.STRING,
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  HealthInfo.associate = (models) => {
    HealthInfo.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
  }

  return HealthInfo
}
