exports.run = (E) => {
  E.on("new", (data) => {
    console.log('new', data)
    E.emit("data", {1:1, 2:2})
  })
} 