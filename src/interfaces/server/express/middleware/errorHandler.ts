import { AxiosError } from "axios";

const errorHandler = (error, _, response, __) => {
  if (error instanceof AxiosError) {
    return response.status(error.response.status).json({
      message: error.response.data.message,
    });
  }

  if (error.isJoi) {
    const errors = error.details.map((detail) => detail.message);
    const message = errors.join(", ");

    return response.status(error.status || 500).json({
      message,
    });
  }

  return response.status(error.status || 500).json({
    message: error.message || "Unexpected error.",
  });
};

export { errorHandler };
