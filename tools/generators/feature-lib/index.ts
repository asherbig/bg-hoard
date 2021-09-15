import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: UtilSchema) {
  await libraryGenerator(tree, {
    name: `feature-${schema.name}`,
    directory: schema.directory,
    tags: `type:feature, scope:${schema.directory}`
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

export interface UtilSchema {
  name: string;
  directory: string;
}
