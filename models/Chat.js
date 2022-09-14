module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      message: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  Chat.associate = (models) => {
    Chat.belongsTo(models.Contact, {
      foreignKey: {
        name: 'contactId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
  }

  return Chat
}
