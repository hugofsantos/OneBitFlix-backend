import { categoryModel } from "./Category";
import { courseModel } from "./Course";
import { episodeModel } from "./Episode";
import { favoriteModel } from "./Favorite";
import { userModel } from "./User";

categoryModel.hasMany(courseModel, {as: 'courses'}); // Uma categoria tem muitos cursos (por padrão a relação se chama "Courses", renomeamos para "courses")
courseModel.belongsTo(categoryModel); // Pertence à uma categoria

courseModel.hasMany(episodeModel, {as: 'episodes'}); // Um curso possui muitos episódios
episodeModel.belongsTo(courseModel); // Um episódio pertence à um curso

courseModel.hasMany(favoriteModel, {as: 'FavoritesUsers', foreignKey: 'course_id'});
favoriteModel.belongsTo(courseModel);
favoriteModel.belongsTo(userModel);
courseModel.belongsToMany(userModel, {through: favoriteModel}); // Um curso pode ser favorito de muitos usuários
userModel.belongsToMany(courseModel, {through: favoriteModel}); // Um usuário tem muitos cursos favoritos
userModel.hasMany(favoriteModel, {as: 'FavoritesCourses', foreignKey: 'user_id'});


export {
  categoryModel,
  courseModel,
  episodeModel,
  userModel
};