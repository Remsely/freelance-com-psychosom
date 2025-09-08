plugins {
    alias(libs.plugins.ksp)
    id("kotlin.library.convention")
}

dependencies {
    implementation(libs.arrow.core)
    implementation(libs.arrow.optics)
    ksp(libs.arrow.opticsKsp)
}
