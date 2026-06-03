const fs = require('fs')
const path = require('path')

const dbSchema = require('./db-schema.json')

const SCRIPT_DIR = __dirname
const BACKEND_DIR = path.resolve(SCRIPT_DIR, '../..')

const outputDir = path.join(BACKEND_DIR, 'docs')

fs.mkdirSync(outputDir, { recursive: true })

const normalizeType = (type) => {
  switch (type) {
    case 'integer':
      return 'int'
    case 'float':
      return 'float'
    case 'boolean':
      return 'boolean'
    case 'date':
      return 'date'
    case 'text':
      return 'text'
    default:
      return 'string'
  }
}

const formatModel = (model) => {
  const lines = []

  lines.push(`    ${model.name.toUpperCase()} {`)

  Object.entries(model.attributes).forEach(([name, attribute]) => {
    const flags = []

    if (attribute.primaryKey) flags.push('PK')
    if (attribute.unique) flags.push('UK')
    if (attribute.references) flags.push('FK')

    const suffix = flags.length
      ? ` ${flags.join(',')}`
      : ''

    lines.push(
      `        ${normalizeType(attribute.type)} ${name}${suffix}`
    )
  })

  lines.push('    }')

  return lines.join('\n')
}

const relationLines = dbSchema.relations
  .filter((relation) => relation.type === 'hasMany')
  .map((relation) => {
    return `    ${relation.source.toUpperCase()} ||--o{ ${relation.target.toUpperCase()} : "${relation.foreignKey}"`
  })

const modelsBlock = dbSchema.models
  .map(formatModel)
  .join('\n\n')

const mermaid = `erDiagram
${modelsBlock}

${relationLines.join('\n')}
`

const markdown = `# Database Schema Diagram (ERD)

Generated: ${new Date().toISOString()}

\`\`\`mermaid
${mermaid}
\`\`\`
`

fs.writeFileSync(
  path.join(outputDir, 'database-erd.md'),
  markdown
)

console.log('✅ ERD generated successfully.')
console.log(`📄 ${path.join(outputDir, 'database-erd.md')}`)