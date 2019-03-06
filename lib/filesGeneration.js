const fs = require('fs');

module.exports = fileName => taskArr => {
  taskArr.forEach(task => {
    const taskNumber = task.match(/\d+/);
    fs.writeFileSync(fileName(taskNumber), task);
  });
};
