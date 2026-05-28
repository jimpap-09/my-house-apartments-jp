require('../../config/env')

const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

console.log('Cloudinary config loaded:')
console.log('CLOUD NAME:', process.env.CLOUDINARY_CLOUD_NAME)
console.log('API KEY:', process.env.CLOUDINARY_API_KEY ? 'OK' : 'MISSING')
console.log('API SECRET:', process.env.CLOUDINARY_API_SECRET ? 'OK' : 'MISSING')

const rootDir = path.resolve(__dirname, '../../..')

const imagesRoot = path.join(
    rootDir,
    'frontend',
    'public',
    'images',
    'apartments'
)

const outputFile = path.join(__dirname, 'cloudinary-images.json')

const apartments = [
    {
        id: 1,
        folder: 'jp-1',
    },
    {
        id: 2,
        folder: 'jp-2',
    },
]

const isImage = (file) => {
    const ext = path.extname(file).toLowerCase()

    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
}

const isCoverImage = (file) => {
    return file.startsWith('cover-')
}

const sortImages = (a, b) => {
    if (isCoverImage(a)) return -1
    if (isCoverImage(b)) return 1

    return a.localeCompare(b, undefined, {
        numeric: true,
    })
}

async function uploadFolder(apartment) {
    const localFolder = path.join(imagesRoot, apartment.folder)

    console.log('')
    console.log(`Processing folder: ${localFolder}`)

    if (!fs.existsSync(localFolder)) {
        throw new Error(`Missing local folder: ${localFolder}`)
    }

    const files = fs
        .readdirSync(localFolder)
        .filter(isImage)
        .sort(sortImages)

    console.log('Files found:')
    console.log(files)

    if (files.length === 0) {
        throw new Error(`No images found in: ${localFolder}`)
    }

    const uploaded = []

    for (const [index, file] of files.entries()) {
        const filePath = path.join(localFolder, file)
        const fileName = path.parse(file).name

        console.log('')
        console.log(`Uploading: ${filePath}`)

        const result = await cloudinary.uploader.upload(filePath, {
            folder: `apartments/${apartment.folder}`,
            public_id: fileName,
            overwrite: true,
            resource_type: 'image',
        })

        console.log(`Uploaded successfully:`)
        console.log(result.secure_url)

        uploaded.push({
            apartmentId: apartment.id,
            url: result.secure_url,
            alt: `${apartment.folder} ${fileName}`,
            sortOrder: index + 1,
            isCover: isCoverImage(file),
        })
    }

    return uploaded
}

async function main() {
    const allImages = []

    for (const apartment of apartments) {
        const images = await uploadFolder(apartment)

        allImages.push(...images)
    }

    fs.writeFileSync(outputFile, JSON.stringify(allImages, null, 2))

    console.log('')
    console.log(`Saved image URLs to:`)
    console.log(outputFile)
}

main().catch((err) => {
    console.error('')
    console.error('Upload failed:')
    console.error(err.message)

    process.exit(1)
})
