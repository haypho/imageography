import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setHelper('camelCase', (text: string): string => {
    const firstLetter = text[0].toLowerCase();
    const restOfText = text.slice(1);
    return firstLetter + restOfText;
  });

  plop.setGenerator('model', {
    description: 'Add an interface, type, class model',
    prompts: [
      {
        type: 'list',
        name: 'modelType',
        choices: [
          { name: 'Interface', value: 'interface', checked: true },
          { name: 'Type', value: 'type' },
          { name: 'Class', value: 'class' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name of the model:',
        validate: (input: string): boolean => input.trim() !== '',
        filter: (input: string): string => input.trim().replace(' ', ''),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/models/{{camelCase name}}.ts',
        templateFile: 'plop-templates/{{ modelType }}.hbs',
      },
      {
        type: 'append',
        path: 'src/models/index.ts',
        pattern: '[plop automation]',
        template: "export * from './{{ camelCase name }}';",
      },
    ],
  });
}
