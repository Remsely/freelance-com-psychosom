plugins {
    id("spring.library.convention")
}

dependencies {
    implementation(libs.slf2j.api)
    implementation(libs.logback.classic)
}
