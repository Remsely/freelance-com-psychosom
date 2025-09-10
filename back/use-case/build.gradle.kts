plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.monitoring)

    implementation(libs.bundles.spring.library.tx)

    implementation(libs.arrow.core)
}
