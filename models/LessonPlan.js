const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
  class: { type: Number, required: true }, // sinfni ko'rsatish
  arry: [
    {
      fan: { type: String, required: true },
      topic: [
        {
          id: { type: Number, required: true },
          mavzu: { type: String, required: true },
          uyga_vazifa: { type: String, required: true },
        }
      ]
    }
  ],
});

module.exports = mongoose.model('LessonPlan', lessonPlanSchema);
