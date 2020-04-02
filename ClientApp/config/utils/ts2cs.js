const fs = require('fs');
const { join } = require('path');
const parser = require('@babel/parser');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { upperFirst } = require('lodash');

const inFile = join(__dirname, '../..', 'web/src/components/Questionnaire/questionnaire.d.ts');
const filename = 'Questionnaire';
const suffix = '.cs';
const outFile = join(__dirname, '../../..', '/ServerApp/Models', `${filename}${suffix}`);

const TypeMap = new Proxy({
  'Date': 'DateTime',
  'string': 'string',
  'string[]': 'ICollection<string>',
  'boolean': 'bool',
  'boolean[]': 'ICollection<bool>',
  'number': 'double',
  'number[]': 'ICollection<double>',
}, {
  get(target, p, receiver) {
    const value = Reflect.get(target, p, receiver);
    if (undefined === value) {
      if (typeof p === 'string' && p.endsWith('[]')) {
        return 'object';
      }
      return 'object';
    }
    return value;
  }
});

const ast = parser.parse(
  fs.readFileSync(inFile, { encoding: 'utf8' }),
  {
    sourceType: 'module',
    plugins: ['typescript'],
  },
);

traverse(ast, {
  Program(path) {
    traverse(path.node, {
      ImportDeclaration(path) {
        path.remove();
      },
      ExportNamedDeclaration(path) {
        let shouldSkip = false;
        let interfaceId = null;
        let typeParameters = null;
        let superClass = null;
        const body = [];
        traverse(path.node, {
          TSTypeAliasDeclaration() {
            shouldSkip = true;
          },
          TSInterfaceDeclaration(path) {
            interfaceId = path.node.id;
            typeParameters = path.node.typeParameters;
            typeParameters && (
              typeParameters.params.forEach((param) => {
                delete param.default;
              })
            );
            traverse(path.node, {
              TSExpressionWithTypeArguments(path) {
                superClass = path.node.expression;
              },
              TSPropertySignature(path) {
                const prop = t.classProperty(
                  t.identifier(path.node.key.name),
                  null,
                  path.node.typeAnnotation
                );
                prop.accessibility = 'public';
                prop.optional = path.node.optional;
                body.push(prop);
              },
            }, path.scope);
          },
        }, path.scope);

        if (shouldSkip || !interfaceId) {
          return;
        }

        const classDec = t.classDeclaration(
          interfaceId,
          superClass,
          t.classBody(body),
          null
        );

        classDec.typeParameters = typeParameters;

        path.replaceWith(classDec);
      },
      TSTypeAliasDeclaration(path) {
        path.remove();
      },
      TSInterfaceDeclaration(path) {
        path.remove();
      }
    }, path.scope);

    const body = [...path.node.body];

    path.node.body.length = 0;

    path.node.body.push(
      t.tsModuleDeclaration(
        t.identifier('vote.Models'),
        t.tsModuleBlock(body),
      )
    );

  }
});

const { code } = generate(ast, {}, '');

function wrap(code) {
  return '/* Auto generated */\n' +
    `using System;
  using System.Collections.Generic;
  using System.Collections.ObjectModel;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;
  using System.Linq;
  using System.Threading.Tasks;\n`.
      split(/;\s+/).join(';\n') + '\n' + code;
}

fs.writeFileSync(outFile,
  wrap(
    code.
      replace(/public ([a-zA-Z]+?)(\?)?:(?:\s+)?(.+?);$/gm, (match, name, optional, type) => {
        if (type.includes('"')) {
          if (type.includes('|')) {
            return `public string ${upperFirst(name)} { get; set; }`;
          }
          return `public readonly string ${upperFirst(name)} = ${type};`;
        } else {
          if (type.includes('string')) {
            optional = null;
          }
          return `public ${TypeMap[type]}${optional ? optional : ''} ${upperFirst(name)} { get; set; }`;
        }
      }).
      replace(/class/g, 'public class').
      replace(/extends/g, ':').
      replace(/\/\/.+/g, '').
      replace(/^\s+$/gm, '').
      replace(/^(.+?)\s+double\s+?(.*Id)/gim, '\t[Required]\n$1 long $2').
      replace(/^(.+?)\s+bool\?\s(IsPublic.+)$/gim, '$1 bool? $2 = true;')
  ),
  { encoding: 'utf8' }
);
