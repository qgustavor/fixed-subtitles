import frontmatter from '@github-docs/frontmatter'
import { marked } from 'marked'
const schemas = {
  show: {
    properties: {
      title: {
        description: 'the title of the show',
        type: 'string',
        required: true
      },
      coverImage: {
        description: 'the url of the cover image',
        type: 'string',
        format: 'url',
        required: true
      }
    }
  },
  group: {
    properties: {
      language: {
        description: 'the language used by the group; ISO 639-1 + country (optional)',
        type: 'string',
        required: true
      }
    }
  }
}

export default function parseReadme (markdown, schema) {
  const { data, content, errors } = frontmatter(markdown, {
    schema: schemas[schema]
  })
  if (errors && errors.length !== 0) throw Error('Error while parsing readme: ' + errors)
  if (content) data.content = marked.parse(content)
  return data
}
