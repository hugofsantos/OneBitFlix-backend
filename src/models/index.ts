import { categoryModel } from "./Category";
import { courseModel } from "./Courses";
import { episodeModel } from "./Episode";

categoryModel.hasMany(courseModel); // Uma categoria tem muitos cursos
courseModel.belongsTo(categoryModel); // Pertence à uma categoria

courseModel.hasMany(episodeModel); // Um curso possui muitos episódios
episodeModel.belongsTo(courseModel); // Um episódio pertence à um curso

export {
  categoryModel,
  courseModel,
  episodeModel
};