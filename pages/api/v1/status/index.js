function status(request, response) {
  response.status(200).json({ message: "status is returning" });
}

export default status;
