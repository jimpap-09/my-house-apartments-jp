require('../../config/env')

const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const oldPublicId = process.argv[2]
const newName = process.argv[3]

if (!oldPublicId || !newName) {
    console.log('Usage:')
    console.log('npm run rename:image -- <oldPublicId> <newName>')
    console.log('')
    console.log('Example:')
    console.log('npm run rename:image -- apartments/jp-1/cover-living-room living-room-main')
    process.exit(1)
}

const jsonPath = path.join(__dirname, 'cloudinary-images.json')

async function main() {
    const folder = path.dirname(oldPublicId).replace(/\\/g, '/')
    const newPublicId = `${folder}/${newName}`

    console.log('Old publicId:', oldPublicId)
    console.log('New publicId:', newPublicId)

    const result = await cloudinary.uploader.rename(oldPublicId, newPublicId, {
        overwrite: true,
    })

    console.log('')
    console.log('Renamed successfully:')
    console.log(result.secure_url)

    if (!fs.existsSync(jsonPath)) {
        console.log('')
        console.log('cloudinary-images.json not found, skipping JSON update.')
        return
    }

    const images = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

    const updatedImages = images.map((image) => {
        if (image.publicId === oldPublicId || image.url.includes(oldPublicId)) {
            return {
                ...image,
                publicId: newPublicId,
                url: result.secure_url,
                alt: `${newName}`,
            }
        }

        return image
    })

    fs.writeFileSync(jsonPath, JSON.stringify(updatedImages, null, 2))

    console.log('')
    console.log('cloudinary-images.json updated.')
}

main().catch((err) => {
    console.error('')
    console.error('Rename failed:')
    console.error(err.message)
    process.exit(1)
})