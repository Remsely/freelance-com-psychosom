plugins {
    id("spring.application.convention")
    id("testing.commons.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.api)
    implementation(projects.db)
    implementation(projects.security)
    implementation(projects.telegram)
    implementation(projects.monitoring)
    implementation(projects.scheduled)
    implementation(projects.minio)

    implementation(libs.bundles.spring.boot.starters)
}
