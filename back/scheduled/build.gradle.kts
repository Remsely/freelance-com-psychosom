plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.bundles.spring.library.base)

    implementation(libs.arrow.core)
}
