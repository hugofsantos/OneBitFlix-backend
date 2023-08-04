import { ResourceWithOptions } from "adminjs";
import { categoryModel, courseModel, episodeModel } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceFeatures, courseResourceOption } from "./course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";

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
  }  
];