import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:/Users/Edrees.Hajashab/training.db',
});

const connectDatabase = async () => {
  sequelize.sync();

  await sequelize.authenticate();
  console.log('Connected to Database');
};

export { connectDatabase, sequelize };

