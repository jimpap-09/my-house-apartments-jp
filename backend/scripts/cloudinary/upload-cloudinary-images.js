require('../../config/env')

const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const rootDir = path.resolve(__dirname, '../../..')
const imagesRoot = path.join(rootDir, 'frontend', 'public', 'images', 'apartments')
const outputFile = path.join(__dirname, 'cloudinary-images.json')

const apartments = [
    { id: 1, folder: 'jp-1' },
    { id: 2, folder: 'jp-2' },
]

const isImage = (file) =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())

const normalizeCategory = (category) =>
    category === 'livingroom' ? 'living-room' : category

const isCoverImage = (category, index) =>
    normalizeCategory(category) === 'living-room' && index === 0

async function uploadApartment(apartment) {
    const apartmentFolder = path.join(imagesRoot, apartment.folder)

    if (!fs.existsSync(apartmentFolder)) {
        throw new Error(`Missing folder: ${apartmentFolder}`)
    }

    const categories = fs
        .readdirSync(apartmentFolder, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()

    const uploaded = []
    let globalSortOrder = 1

    for (const category of categories) {
        const categoryFolder = path.join(apartmentFolder, category)
        const normalizedCategory = normalizeCategory(category)

        const files = fs
            .readdirSync(categoryFolder)
            .filter(isImage)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

        for (const [index, file] of files.entries()) {
            const filePath = path.join(categoryFolder, file)
            const ext = path.extname(file)
            const publicName = `${normalizedCategory}-${index + 1}`

            const result = await cloudinary.uploader.upload(filePath, {
                folder: `apartments/${apartment.folder}`,
                public_id: publicName,
                overwrite: true,
                resource_type: 'image',
            })

            uploaded.push({
                apartmentId: apartment.id,
                category: normalizedCategory,
                publicId: result.public_id,
                url: result.secure_url,
                alt: publicName,
                sortOrder: globalSortOrder,
                isCover: isCoverImage(category, index),
            })

            globalSortOrder++

            console.log(`Uploaded: ${filePath}`)
            console.log(`→ ${result.public_id}`)
        }
    }

    return uploaded
}

async function main() {
    const allImages = []

    for (const apartment of apartments) {
        const images = await uploadApartment(apartment)
        allImages.push(...images)
    }

    fs.writeFileSync(outputFile, JSON.stringify(allImages, null, 2))

    console.log('')
    console.log(`Saved JSON to: ${outputFile}`)
}

main().catch((err) => {

    console.error('Upload failed:')
    console.error(err.message)

    process.exit(1)
})
