import { ResourceWithOptions } from "adminjs";
import { categoryModel } from "../../models";
import { categoryResourceOptions } from "./category";

export const adminJsResouces: Array<ResourceWithOptions> = [
  {
    resource: categoryModel,
    options: categoryResourceOptions
  }
];