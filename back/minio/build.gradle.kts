plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.bundles.s3)

    implementation(libs.arrow.core)
    implementation(libs.spring.boot.starter)
}
