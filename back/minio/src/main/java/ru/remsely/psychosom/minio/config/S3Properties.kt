package ru.remsely.psychosom.minio.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class S3Properties(
    @param:Value("\${s3.internal-endpoint:}")
    val internalEndpoint: String,

    @param:Value("\${s3.public-endpoint:}")
    val publicEndpoint: String,

    @param:Value("\${s3.region:}")
    val region: String,

    @param:Value("\${s3.bucket:}")
    val bucket: String,

    @param:Value("\${s3.access-key:}")
    val accessKey: String,

    @param:Value("\${s3.secret-key:}")
    val secretKey: String,

    @param:Value("\${s3.path-style-access:false}")
    val pathStyleAccess: Boolean
)
