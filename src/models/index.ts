import { categoryModel } from "./Category";
import { courseModel } from "./Courses";

categoryModel.hasMany(courseModel); // Uma categoria tem muitos cursos
courseModel.belongsTo(categoryModel); // Pertence à uma categoria

export {
  categoryModel,
  courseModel
};