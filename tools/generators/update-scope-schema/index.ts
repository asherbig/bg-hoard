import { formatFiles, installPackagesTask, readJson, Tree, updateJson } from '@nrwl/devkit';

export default async function (tree: Tree, schema: any) {
  const scopes = getScopes(readJson(tree, 'nx.json'));
  await updateJson(tree, 'tools/generators/util-lib/schema.json', (json) => {
    const items = scopes.map((scope) => ({value: scope, label: scope}));
    json.properties.directory['x-prompt'].items = items;
    return json;
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

function getScopes(nxJson: any) {
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes: string[] = projects
    .map((project) =>
      project.tags
        // take only those that point to scope
        .filter((tag: string) => tag.startsWith('scope:'))
    )
    // flatten the array
    .reduce((acc, tags) => [...acc, ...tags], [])
    // remove prefix `scope:`
    .map((scope: string) => scope.slice(6));
  // remove duplicates
  return Array.from(new Set(allScopes));
}
