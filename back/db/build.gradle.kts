plugins {
    alias(libs.plugins.kotlin.jpa)
    alias(libs.plugins.flyway)
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.bundles.db)

    implementation(libs.jetbrains.kotlin.reflect)
    implementation(libs.arrow.core)
}
