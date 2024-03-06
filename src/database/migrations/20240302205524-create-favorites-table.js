'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'courses', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Adicionar a restrição única composta
    await queryInterface.addConstraint('favorites', {
      type: 'unique',
      fields: ['user_id', 'course_id'],
      name: 'unique_user_course_pair'
    });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('favorites', 'unique_user_course_pair');
    await queryInterface.dropTable("favorites");
  }
};
