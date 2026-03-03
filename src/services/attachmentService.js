const { Attachment } = require('../models');

class AttachmentService {
  async bulkCreate(files, taskId) {
    // Важливо: переконайся, що назви полів співпадають з твоєю моделлю
    const attachmentsData = files.map(file => ({
      taskId: file.taskId,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size
    }));

    return await Attachment.bulkCreate(attachmentsData);
  }

  async getByTaskId(taskId) {
    return await Attachment.findAll({ where: { taskId } });
  }
}

module.exports = new AttachmentService();