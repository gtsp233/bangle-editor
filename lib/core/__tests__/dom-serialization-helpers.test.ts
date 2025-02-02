/**
 * @jest-environment jsdom
 */
import { domSerializationHelpers } from '../src/dom-serialization-helpers';
import { criticalComponents } from '../src/index';
import { RawSpecs, SpecRegistry } from '../src/spec-registry';

const { paragraph, doc, text } = criticalComponents;

describe('domSerializationHelpers parseDOM', () => {
  test('does not get affected by other attributes', () => {
    const spec = {
      name: 'dummy',
      type: 'node',
      schema: {
        inline: true,
      },
    };
    const result = domSerializationHelpers(spec.name, { tag: 'span' });

    expect(result.parseDOM).toHaveLength(1);
    const parseDOM = result.parseDOM[0];
    expect(parseDOM?.tag).toMatchInlineSnapshot(
      `"span[data-bangle-name="dummy"]"`,
    );

    const dom = document.createElement('span');
    dom.setAttribute('data-bangle-attrs', JSON.stringify({ has: 'value' }));
    const attrs = parseDOM?.getAttrs(dom);
    expect(attrs).toMatchInlineSnapshot(`
      {
        "has": "value",
      }
    `);
  });

  test('excludes attrs', () => {
    const codeSpec: RawSpecs = {
      type: 'node',
      name: 'codeBlock',
      schema: {
        attrs: {
          timer: {
            default: 1,
          },
          language: { default: 'javascript' },
          magic: { default: '1' },
        },
      },
    };

    const specRegistry = new SpecRegistry([
      doc.spec(),
      text.spec(),
      paragraph.spec(),
      codeSpec,
    ]);

    const { toDOM } = domSerializationHelpers('codeSpec', {
      tag: 'code',
      ignoreAttrs: ['timer'],
    });

    const paraNode = specRegistry.schema.nodes['codeBlock']!.create({});

    expect(toDOM(paraNode)).toMatchInlineSnapshot(`
      [
        "code",
        {
          "data-bangle-attrs": "{"language":"javascript","magic":"1"}",
          "data-bangle-name": "codeSpec",
        },
      ]
    `);
  });
});
