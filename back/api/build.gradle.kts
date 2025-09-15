plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.bundles.web)

    implementation(libs.arrow.core)
}
