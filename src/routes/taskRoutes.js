const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const upload = require('../middleware/upload');

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);
router.patch('/:id', taskController.update);
router.delete('/:id', taskController.delete);
// router.post('/:id/attachments', upload.array('Files', 3), taskController.uploadAttachments);
// Зміни 'File' на 'files'
router.post('/:id/attachments', upload.array('files', 3), taskController.uploadAttachments);

module.exports = router;
