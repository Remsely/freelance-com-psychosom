plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(projects.domain)
    implementation(projects.monitoring)

    implementation(libs.spring.boot.starter)
    implementation(libs.spring.tx)
    implementation(libs.arrow.core)
}
