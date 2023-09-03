import { categoryModel } from "./Category";
import { courseModel } from "./Course";
import { episodeModel } from "./Episode";
import { userModel } from "./User";

categoryModel.hasMany(courseModel, {as: 'courses'}); // Uma categoria tem muitos cursos (por padrão a relação se chama "Courses", renomeamos para "courses")
courseModel.belongsTo(categoryModel); // Pertence à uma categoria

courseModel.hasMany(episodeModel); // Um curso possui muitos episódios
episodeModel.belongsTo(courseModel); // Um episódio pertence à um curso

export {
  categoryModel,
  courseModel,
  episodeModel,
  userModel
};