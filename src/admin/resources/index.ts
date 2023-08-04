import { ResourceWithOptions } from "adminjs";
import { categoryModel, courseModel, episodeModel, userModel } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceFeatures, courseResourceOption } from "./course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResouces: Array<ResourceWithOptions> = [
  {
    resource: categoryModel,
    options: categoryResourceOptions
  },
  {
    resource: courseModel,
    options: courseResourceOption,
    features: courseResourceFeatures
  },
  {
    resource: episodeModel,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  },
  {
    resource: userModel,
    options: userResourceOptions
  }
];