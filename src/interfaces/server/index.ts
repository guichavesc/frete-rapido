import createApp from "./express";

const app = createApp();

const PORT = 3000;

function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    //process.exit(1);
  }
}

export { app, start };
