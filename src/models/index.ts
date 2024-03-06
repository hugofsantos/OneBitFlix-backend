import { categoryModel } from "./Category";
import { courseModel } from "./Course";
import { episodeModel } from "./Episode";
import { favoriteModel } from "./Favorite";
import { LikeModel } from "./Like";
import { userModel } from "./User";

categoryModel.hasMany(courseModel, {as: 'courses'}); // Uma categoria tem muitos cursos (por padrão a relação se chama "Courses", renomeamos para "courses")
courseModel.belongsTo(categoryModel); // Pertence à uma categoria

courseModel.hasMany(episodeModel, {as: 'episodes'}); // Um curso possui muitos episódios
episodeModel.belongsTo(courseModel); // Um episódio pertence à um curso

// Configurando as relações entre curso e usuário através da tabela favoritos manualmente
courseModel.hasMany(favoriteModel, {as: 'FavoritesUsers', foreignKey: 'course_id'});
userModel.hasMany(favoriteModel, { as: 'FavoritesCourses', foreignKey: 'user_id' });
favoriteModel.belongsTo(courseModel);
favoriteModel.belongsTo(userModel);

// Configurando as relações de favorito entre curso e usuário diretamente (Através de favoritos mas não manualmente)
courseModel.belongsToMany(userModel, {through: favoriteModel}); // Um curso pode ser favorito de muitos usuários
userModel.belongsToMany(courseModel, {through: favoriteModel}); // Um usuário tem muitos cursos favoritos

// Configurando as relações de like entre usuário e curso
courseModel.belongsToMany(userModel, {through: LikeModel});
userModel.belongsToMany(courseModel, {through: LikeModel});

export {
  categoryModel,
  courseModel,
  episodeModel,
  userModel
};