"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Users", [
            {
                name: "Maulana Yusuf",
                email: "yusuf@gmail.com",
                username: "yusuf",
                password: "123",
            },
            {
                name: "Jamal Rianto",
                email: "jamal@gmail.com",
                username: "jamal",
                password: "123",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
