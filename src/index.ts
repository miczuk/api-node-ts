import { serverFactory } from "./server";

import { mongodbConnectionFactory } from "./infrastructure/mongodb";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await mongodbConnectionFactory();
    const app = serverFactory();

    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
