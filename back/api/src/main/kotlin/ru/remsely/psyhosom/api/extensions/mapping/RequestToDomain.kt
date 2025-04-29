package ru.remsely.psyhosom.api.extensions.mapping

import org.springframework.web.multipart.MultipartFile
import ru.remsely.psyhosom.domain.file.UploadedFile

fun MultipartFile.toDomain(): UploadedFile = UploadedFile(
    originalName = this.originalFilename ?: "file",
    contentType = this.contentType ?: "application/octet-stream",
    size = this.size,
    streamProvider = { this.inputStream }
)
