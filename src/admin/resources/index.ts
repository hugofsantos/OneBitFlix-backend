import { ResourceWithOptions } from "adminjs";
import { categoryModel, courseModel } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceOption } from "./course";

export const adminJsResouces: Array<ResourceWithOptions> = [
  {
    resource: categoryModel,
    options: categoryResourceOptions
  },
  {
    resource: courseModel,
    options: courseResourceOption
  }
];