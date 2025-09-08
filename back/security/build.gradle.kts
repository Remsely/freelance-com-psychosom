plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.bundles.security)

    implementation(libs.arrow.core)
    implementation(libs.spring.tx)
}
